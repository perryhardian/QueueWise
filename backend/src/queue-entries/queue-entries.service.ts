import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { QueueEntrySource, QueueEntryStatus, QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { activeQueueEntryStatuses, estimateWaitMinutes, formatQueueNumber } from '../queues/queue-calculation.util';
import { QueuesService } from '../queues/queues.service';
import { JoinQueueDto } from './dto/join-queue.dto';
import { WalkInDto } from './dto/walk-in.dto';

@Injectable()
export class QueueEntriesService {
  constructor(private readonly prisma: PrismaService, private readonly queuesService: QueuesService) {}

  async joinQueue(userId: string, queueId: string, _dto: JoinQueueDto) {
    return this.prisma.$transaction(async (tx) => {
      const queue = await tx.queue.findUnique({ where: { id: queueId }, include: { business: true } });
      if (!queue) throw new NotFoundException('Queue not found');
      if (queue.status !== QueueStatus.OPEN) throw new BadRequestException('Queue is not open');

      const existingActiveEntry = await tx.queueEntry.findFirst({
        where: { queue: { businessId: queue.businessId, status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } }, userId, status: { in: activeQueueEntryStatuses } },
      });
      if (existingActiveEntry) throw new ConflictException('You already have an active queue for this business');

      const updatedQueue = await tx.queue.update({ where: { id: queue.id }, data: { nextSequence: { increment: 1 } } });
      const sequenceNumber = queue.nextSequence;
      const entry = await tx.queueEntry.create({
        data: { queueId: queue.id, userId, queueNumber: formatQueueNumber(sequenceNumber), sequenceNumber, source: QueueEntrySource.ONLINE, status: QueueEntryStatus.WAITING },
      });

      const peopleAhead = await tx.queueEntry.count({ where: { queueId: queue.id, sequenceNumber: { lt: sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
      return this.toActiveQueueEntry(entry, updatedQueue.currentNumber, peopleAhead, updatedQueue.averageServiceTimeMinutes);
    });
  }

  async addWalkIn(userId: string, queueId: string, _dto: WalkInDto) {
    await this.queuesService.assertMerchantOwnsQueue(userId, queueId);
    return this.prisma.$transaction(async (tx) => {
      const queue = await tx.queue.findUnique({ where: { id: queueId } });
      if (!queue) throw new NotFoundException('Queue not found');
      if (queue.status !== QueueStatus.OPEN) throw new BadRequestException('Queue is not open');

      const updatedQueue = await tx.queue.update({ where: { id: queue.id }, data: { nextSequence: { increment: 1 } } });
      const sequenceNumber = queue.nextSequence;
      const entry = await tx.queueEntry.create({
        data: { queueId: queue.id, queueNumber: formatQueueNumber(sequenceNumber), sequenceNumber, source: QueueEntrySource.WALK_IN, status: QueueEntryStatus.WAITING },
      });
      const peopleAhead = await tx.queueEntry.count({ where: { queueId: queue.id, sequenceNumber: { lt: sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
      return this.toActiveQueueEntry(entry, updatedQueue.currentNumber, peopleAhead, updatedQueue.averageServiceTimeMinutes);
    });
  }

  async getMyActiveQueue(userId: string) {
    const entry = await this.prisma.queueEntry.findFirst({
      where: { userId, status: { in: activeQueueEntryStatuses }, queue: { status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } } },
      orderBy: { joinedAt: 'desc' },
      include: { queue: { include: { business: { include: { category: true } } } } },
    });
    if (!entry) return null;
    const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: entry.queueId, sequenceNumber: { lt: entry.sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
    return this.toActiveQueueEntry(entry, entry.queue.currentNumber, peopleAhead, entry.queue.averageServiceTimeMinutes, entry.queue.business);
  }

  async getEntryStatus(userId: string, entryId: string) {
    const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId }, include: { queue: { include: { business: { include: { category: true } } } } } });
    if (!entry) throw new NotFoundException('Queue entry not found');
    if (entry.userId !== userId) throw new ForbiddenException('You do not own this queue entry');
    const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: entry.queueId, sequenceNumber: { lt: entry.sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
    return this.toActiveQueueEntry(entry, entry.queue.currentNumber, peopleAhead, entry.queue.averageServiceTimeMinutes, entry.queue.business);
  }

  async cancelEntry(userId: string, entryId: string) {
    const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId } });
    if (!entry) throw new NotFoundException('Queue entry not found');
    if (entry.userId !== userId) throw new ForbiddenException('You do not own this queue entry');
    if (entry.status !== QueueEntryStatus.WAITING && entry.status !== QueueEntryStatus.CHECKED_IN) throw new BadRequestException('This queue entry cannot be cancelled');

    const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: QueueEntryStatus.CANCELLED, cancelledAt: new Date() }, include: { queue: { include: { business: { include: { category: true } } } } } });
    const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: updated.queueId, sequenceNumber: { lt: updated.sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
    return this.toActiveQueueEntry(updated, updated.queue.currentNumber, peopleAhead, updated.queue.averageServiceTimeMinutes, updated.queue.business);
  }

  private toActiveQueueEntry(entry: EntryShape, currentNumber: string | null, peopleAhead: number, averageServiceTimeMinutes: number, business?: BusinessShape) {
    return {
      id: entry.id,
      queueId: entry.queueId,
      queueNumber: entry.queueNumber,
      sequenceNumber: entry.sequenceNumber,
      source: entry.source,
      status: entry.status,
      joinedAt: entry.joinedAt,
      nowServing: currentNumber,
      peopleAhead,
      estimatedWaitingTimeMinutes: estimateWaitMinutes(peopleAhead, averageServiceTimeMinutes),
      business: business
        ? { id: business.id, name: business.name, address: business.address, category: business.category }
        : undefined,
    };
  }
}

type EntryShape = { id: string; queueId: string; queueNumber: string; sequenceNumber: number; source: QueueEntrySource; status: QueueEntryStatus; joinedAt: Date };
type BusinessShape = { id: string; name: string; address: string; category: { id: string; name: string; slug: string } };