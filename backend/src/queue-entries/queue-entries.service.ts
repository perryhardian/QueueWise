import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { QueueEntrySource, QueueEntryStatus, QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { activeQueueEntryStatuses, estimateWaitMinutes, formatQueueNumber } from '../queues/queue-calculation.util';
import { QueuesService } from '../queues/queues.service';
import { CheckInDto } from './dto/check-in.dto';
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

  async checkIn(userId: string, entryId: string, dto: CheckInDto) {
    const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId }, include: { queue: { include: { business: { include: { category: true } } } } } });
    if (!entry) throw new NotFoundException('Queue entry not found');
    if (entry.userId !== userId) throw new ForbiddenException('You do not own this queue entry');
    if (entry.queue.status !== QueueStatus.OPEN) throw new BadRequestException('Queue is not open for check-in');
    if (entry.status === QueueEntryStatus.CHECKED_IN) throw new BadRequestException('You are already checked in');
    if (entry.status !== QueueEntryStatus.WAITING) throw new BadRequestException('Only waiting queue entries can check in');
    if (entry.queue.business.qrCodeToken !== dto.qrCodeToken.trim()) throw new BadRequestException('This QR code is not valid for your queue');

    const updated = await this.prisma.queueEntry.update({
      where: { id: entryId },
      data: { status: QueueEntryStatus.CHECKED_IN, checkedInAt: new Date() },
      include: { queue: { include: { business: { include: { category: true } } } } },
    });
    const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: updated.queueId, sequenceNumber: { lt: updated.sequenceNumber }, status: { in: activeQueueEntryStatuses } } });
    return this.toActiveQueueEntry(updated, updated.queue.currentNumber, peopleAhead, updated.queue.averageServiceTimeMinutes, updated.queue.business);
  }

  async callNext(userId: string, queueId: string) {
    await this.queuesService.assertMerchantOwnsQueue(userId, queueId);
    return this.prisma.$transaction(async (tx) => {
      const queue = await tx.queue.findUnique({ where: { id: queueId } });
      if (!queue) throw new NotFoundException('Queue not found');
      if (queue.status !== QueueStatus.OPEN) throw new BadRequestException('Queue is not open');

      const activeCalled = await tx.queueEntry.findFirst({ where: { queueId, status: QueueEntryStatus.CALLED }, orderBy: { sequenceNumber: 'asc' } });
      if (activeCalled) return this.toMerchantQueueEntry(activeCalled);

      const nextEntry = await tx.queueEntry.findFirst({ where: { queueId, status: { in: [QueueEntryStatus.CHECKED_IN, QueueEntryStatus.WAITING] } }, orderBy: [{ status: 'asc' }, { sequenceNumber: 'asc' }] });
      if (!nextEntry) throw new NotFoundException('No waiting customers available');

      const updated = await tx.queueEntry.update({ where: { id: nextEntry.id }, data: { status: QueueEntryStatus.CALLED, calledAt: new Date() } });
      await tx.queue.update({ where: { id: queueId }, data: { currentNumber: updated.queueNumber } });
      return this.toMerchantQueueEntry(updated);
    });
  }

  async callEntry(userId: string, entryId: string) {
    const entry = await this.assertMerchantOwnsEntry(userId, entryId);
    if (entry.status !== QueueEntryStatus.WAITING && entry.status !== QueueEntryStatus.CHECKED_IN) throw new BadRequestException('Only waiting or checked-in customers can be called');
    const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: QueueEntryStatus.CALLED, calledAt: new Date() } });
    await this.prisma.queue.update({ where: { id: entry.queueId }, data: { currentNumber: updated.queueNumber } });
    return this.toMerchantQueueEntry(updated);
  }

  async startService(userId: string, entryId: string) {
    const entry = await this.assertMerchantOwnsEntry(userId, entryId);
    if (entry.status !== QueueEntryStatus.CALLED) throw new BadRequestException('Only called customers can start service');
    const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: QueueEntryStatus.SERVING, serviceStartedAt: new Date() } });
    await this.prisma.queue.update({ where: { id: entry.queueId }, data: { currentNumber: updated.queueNumber } });
    return this.toMerchantQueueEntry(updated);
  }

  async completeService(userId: string, entryId: string) {
    const entry = await this.assertMerchantOwnsEntry(userId, entryId);
    if (entry.status !== QueueEntryStatus.SERVING) throw new BadRequestException('Only serving customers can be completed');

    return this.prisma.$transaction(async (tx) => {
      const completed = await tx.queueEntry.update({ where: { id: entryId }, data: { status: QueueEntryStatus.COMPLETED, completedAt: new Date() } });
      const completedDurations = await tx.queueEntry.findMany({ where: { queueId: entry.queueId, status: QueueEntryStatus.COMPLETED, serviceStartedAt: { not: null }, completedAt: { not: null } }, select: { serviceStartedAt: true, completedAt: true } });
      const average = this.calculateAverageServiceMinutes(completedDurations, entry.queue.averageServiceTimeMinutes);
      await tx.queue.update({ where: { id: entry.queueId }, data: { averageServiceTimeMinutes: average } });
      return this.toMerchantQueueEntry(completed);
    });
  }

  async markNoShow(userId: string, entryId: string) {
    const entry = await this.assertMerchantOwnsEntry(userId, entryId);
    if (entry.status !== QueueEntryStatus.CALLED && entry.status !== QueueEntryStatus.WAITING && entry.status !== QueueEntryStatus.CHECKED_IN) throw new BadRequestException('This customer cannot be marked no-show');
    const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: QueueEntryStatus.NO_SHOW, noShowAt: new Date() } });
    return this.toMerchantQueueEntry(updated);
  }

  async skipEntry(userId: string, entryId: string) {
    return this.markNoShow(userId, entryId);
  }

  private async assertMerchantOwnsEntry(userId: string, entryId: string) {
    const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId }, include: { queue: { include: { business: { include: { merchant: true } } } } } });
    if (!entry) throw new NotFoundException('Queue entry not found');
    if (entry.queue.business.merchant.userId !== userId) throw new ForbiddenException('You do not manage this queue entry');
    return entry;
  }

  private calculateAverageServiceMinutes(entries: Array<{ serviceStartedAt: Date | null; completedAt: Date | null }>, fallback: number) {
    const durations = entries.flatMap((entry) => {
      if (!entry.serviceStartedAt || !entry.completedAt) return [];
      return [Math.max(1, Math.round((entry.completedAt.getTime() - entry.serviceStartedAt.getTime()) / 60000))];
    });
    if (!durations.length) return fallback;
    return Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length);
  }

  private toMerchantQueueEntry(entry: EntryShape) {
    return { id: entry.id, queueId: entry.queueId, queueNumber: entry.queueNumber, sequenceNumber: entry.sequenceNumber, source: entry.source, status: entry.status, joinedAt: entry.joinedAt };
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
      checkedInAt: 'checkedInAt' in entry ? entry.checkedInAt : undefined,
      nowServing: currentNumber,
      peopleAhead,
      estimatedWaitingTimeMinutes: estimateWaitMinutes(peopleAhead, averageServiceTimeMinutes),
      business: business ? { id: business.id, name: business.name, address: business.address, category: business.category } : undefined,
    };
  }
}

type EntryShape = { id: string; queueId: string; queueNumber: string; sequenceNumber: number; source: QueueEntrySource; status: QueueEntryStatus; joinedAt: Date; checkedInAt?: Date | null };
type BusinessShape = { id: string; name: string; address: string; category: { id: string; name: string; slug: string } };
