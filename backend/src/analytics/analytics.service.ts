import { ForbiddenException, Injectable } from '@nestjs/common';
import { QueueEntryStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyHistory(userId: string) {
    const histories = await this.prisma.queueHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { business: { include: { category: true } } },
    });

    return histories.map((history) => ({
      id: history.id,
      queueEntryId: history.queueEntryId,
      queueNumber: history.queueNumber,
      finalStatus: history.finalStatus,
      joinedAt: history.joinedAt,
      completedAt: history.completedAt,
      waitingMinutes: history.waitingMinutes,
      serviceMinutes: history.serviceMinutes,
      business: {
        id: history.business.id,
        name: history.business.name,
        address: history.business.address,
        category: history.business.category,
      },
    }));
  }

  async getMerchantBusinessAnalytics(userId: string, businessId: string) {
    const business = await this.prisma.business.findFirst({
      where: { id: businessId, merchant: { userId } },
      select: { id: true },
    });
    if (!business) throw new ForbiddenException('You do not manage this business');

    const since = new Date();
    since.setDate(since.getDate() - 6);
    since.setHours(0, 0, 0, 0);

    const histories = await this.prisma.queueHistory.findMany({
      where: { businessId, createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
    });

    return {
      businessId,
      windowDays: 7,
      totalHistoryCount: histories.length,
      completedCount: histories.filter((history) => history.finalStatus === QueueEntryStatus.COMPLETED).length,
      cancelledCount: histories.filter((history) => history.finalStatus === QueueEntryStatus.CANCELLED).length,
      noShowCount: histories.filter((history) => history.finalStatus === QueueEntryStatus.NO_SHOW).length,
      averageWaitingMinutes: this.average(histories.map((history) => history.waitingMinutes)),
      averageServiceMinutes: this.average(histories.map((history) => history.serviceMinutes)),
      recentDays: this.buildRecentDays(histories),
    };
  }

  private buildRecentDays(histories: Array<{ createdAt: Date; finalStatus: QueueEntryStatus }>) {
    const days = new Map<string, { date: string; completedCount: number; cancelledCount: number; noShowCount: number }>();
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      const key = this.dateKey(date);
      days.set(key, { date: key, completedCount: 0, cancelledCount: 0, noShowCount: 0 });
    }

    for (const history of histories) {
      const day = days.get(this.dateKey(history.createdAt));
      if (!day) continue;
      if (history.finalStatus === QueueEntryStatus.COMPLETED) day.completedCount += 1;
      if (history.finalStatus === QueueEntryStatus.CANCELLED) day.cancelledCount += 1;
      if (history.finalStatus === QueueEntryStatus.NO_SHOW) day.noShowCount += 1;
    }

    return Array.from(days.values());
  }

  private average(values: Array<number | null>) {
    const validValues = values.filter((value): value is number => typeof value === 'number');
    if (!validValues.length) return 0;
    return Math.round(validValues.reduce((sum, value) => sum + value, 0) / validValues.length);
  }

  private dateKey(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
