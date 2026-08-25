import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { QueueEntryStatus, QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { OpenQueueDto } from './dto/open-queue.dto';
import { activeQueueEntryStatuses, estimateWaitMinutes } from './queue-calculation.util';

@Injectable()
export class QueuesService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinessQueue(businessId: string) {
    const queue = await this.prisma.queue.findFirst({
      where: { businessId, status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } },
      orderBy: { openedAt: 'desc' },
      include: { business: true, entries: { where: { status: { in: activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
    });

    if (!queue) {
      return { queue: null, status: QueueStatus.CLOSED, currentNumber: null, peopleWaiting: 0, estimatedWaitingTimeMinutes: 0, averageServiceTimeMinutes: 10 };
    }

    return this.toQueueStatus(queue);
  }

  async getQueueStatus(queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
      include: { business: true, entries: { where: { status: { in: activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
    });
    if (!queue) throw new NotFoundException('Queue not found');
    return this.toQueueStatus(queue);
  }

  async getMerchantDashboard(userId: string, queueId: string) {
    const queue = await this.findOwnedQueueWithEntries(userId, queueId);
    const entries = queue.entries.map((entry) => this.toMerchantQueueEntry(entry));
    const waitingStatuses: QueueEntryStatus[] = [QueueEntryStatus.WAITING, QueueEntryStatus.CHECKED_IN, QueueEntryStatus.CALLED];
    const serving = queue.entries.find((entry) => entry.status === QueueEntryStatus.SERVING) ?? null;
    const waitingCount = queue.entries.filter((entry) => waitingStatuses.includes(entry.status)).length;
    const checkedInCount = queue.entries.filter((entry) => entry.status === QueueEntryStatus.CHECKED_IN).length;
    const completedCount = queue.entries.filter((entry) => entry.status === QueueEntryStatus.COMPLETED).length;

    return {
      queue: { id: queue.id, businessId: queue.businessId, status: queue.status, openedAt: queue.openedAt, closedAt: queue.closedAt },
      business: { id: queue.business.id, name: queue.business.name, address: queue.business.address },
      nowServing: serving?.queueNumber ?? queue.currentNumber,
      waitingCount,
      checkedInCount,
      completedCount,
      averageServiceTimeMinutes: queue.averageServiceTimeMinutes,
      estimatedWaitingTimeMinutes: estimateWaitMinutes(waitingCount, queue.averageServiceTimeMinutes),
      entries,
    };
  }

  async getMerchantQueueEntries(userId: string, queueId: string) {
    const queue = await this.findOwnedQueueWithEntries(userId, queueId);
    return queue.entries.map((entry) => this.toMerchantQueueEntry(entry));
  }

  async getMerchantQueues(userId: string) {
    const queues = await this.prisma.queue.findMany({
      where: { business: { merchant: { userId } }, status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } },
      orderBy: { openedAt: 'desc' },
      include: {
        business: true,
        entries: { where: { status: { in: activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } },
      },
    });

    return queues.map((queue) => ({
      ...this.toQueueStatus(queue),
      business: { id: queue.business.id, name: queue.business.name, address: queue.business.address },
    }));
  }

  async getBusinessCheckInQr(userId: string, businessId: string) {
    const business = await this.assertMerchantOwnsBusiness(userId, businessId);
    const qrCodeToken = business.qrCodeToken;
    return {
      businessId: business.id,
      businessName: business.name,
      qrCodeToken,
      qrPayload: `queuewise://check-in?qrCodeToken=${encodeURIComponent(qrCodeToken)}`,
    };
  }

  async openQueue(userId: string, businessId: string, dto: OpenQueueDto) {
    await this.assertMerchantOwnsBusiness(userId, businessId);
    return this.prisma.$transaction(async (tx) => {
      await tx.queue.updateMany({
        where: { businessId, status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] } },
        data: { status: QueueStatus.CLOSED, closedAt: new Date() },
      });
      const queue = await tx.queue.create({
        data: { businessId, status: QueueStatus.OPEN, nextSequence: 1, averageServiceTimeMinutes: dto.averageServiceTimeMinutes ?? 10, openedAt: new Date() },
        include: { business: true, entries: true },
      });
      return this.toQueueStatus(queue);
    });
  }

  async closeQueue(userId: string, queueId: string) {
    await this.assertMerchantOwnsQueue(userId, queueId);
    const queue = await this.prisma.queue.update({
      where: { id: queueId },
      data: { status: QueueStatus.CLOSED, closedAt: new Date() },
      include: { business: true, entries: { where: { status: { in: activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
    });
    return this.toQueueStatus(queue);
  }

  async pauseQueue(userId: string, queueId: string) {
    await this.assertMerchantOwnsQueue(userId, queueId);
    const queue = await this.prisma.queue.update({
      where: { id: queueId },
      data: { status: QueueStatus.PAUSED },
      include: { business: true, entries: { where: { status: { in: activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
    });
    return this.toQueueStatus(queue);
  }

  async assertMerchantOwnsQueue(userId: string, queueId: string) {
    const queue = await this.prisma.queue.findUnique({ where: { id: queueId }, include: { business: { include: { merchant: true } } } });
    if (!queue) throw new NotFoundException('Queue not found');
    if (queue.business.merchant.userId !== userId) throw new ForbiddenException('You do not manage this queue');
    return queue;
  }

  async assertMerchantOwnsBusiness(userId: string, businessId: string) {
    const business = await this.prisma.business.findUnique({ where: { id: businessId }, include: { merchant: true } });
    if (!business) throw new NotFoundException('Business not found');
    if (business.merchant.userId !== userId) throw new ForbiddenException('You do not manage this business');
    return business;
  }

  toQueueStatus(queue: QueueWithEntries) {
    const peopleWaiting = queue.entries.filter((entry) => entry.status !== QueueEntryStatus.SERVING).length;
    return {
      queue: { id: queue.id, businessId: queue.businessId, status: queue.status },
      status: queue.status,
      currentNumber: queue.currentNumber,
      peopleWaiting,
      estimatedWaitingTimeMinutes: estimateWaitMinutes(peopleWaiting, queue.averageServiceTimeMinutes),
      averageServiceTimeMinutes: queue.averageServiceTimeMinutes,
      entries: queue.entries.map((entry) => ({ id: entry.id, queueNumber: entry.queueNumber, sequenceNumber: entry.sequenceNumber, source: entry.source, status: entry.status, joinedAt: entry.joinedAt })),
    };
  }

  private async findOwnedQueueWithEntries(userId: string, queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
      include: {
        business: { include: { merchant: true } },
        entries: { orderBy: { sequenceNumber: 'asc' } },
      },
    });
    if (!queue) throw new NotFoundException('Queue not found');
    if (queue.business.merchant.userId !== userId) throw new ForbiddenException('You do not manage this queue');
    return queue;
  }

  private toMerchantQueueEntry(entry: MerchantQueueEntryShape) {
    return {
      id: entry.id,
      queueId: entry.queueId,
      queueNumber: entry.queueNumber,
      sequenceNumber: entry.sequenceNumber,
      source: entry.source,
      status: entry.status,
      joinedAt: entry.joinedAt,
      checkedInAt: entry.checkedInAt,
      calledAt: entry.calledAt,
      serviceStartedAt: entry.serviceStartedAt,
      completedAt: entry.completedAt,
      cancelledAt: entry.cancelledAt,
      noShowAt: entry.noShowAt,
    };
  }
}

type QueueWithEntries = {
  id: string;
  businessId: string;
  status: QueueStatus;
  currentNumber: string | null;
  averageServiceTimeMinutes: number;
  entries: Array<{ id: string; queueNumber: string; sequenceNumber: number; source: string; status: QueueEntryStatus; joinedAt: Date }>;
};

type MerchantQueueEntryShape = {
  id: string;
  queueId: string;
  queueNumber: string;
  sequenceNumber: number;
  source: string;
  status: QueueEntryStatus;
  joinedAt: Date;
  checkedInAt: Date | null;
  calledAt: Date | null;
  serviceStartedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  noShowAt: Date | null;
};
