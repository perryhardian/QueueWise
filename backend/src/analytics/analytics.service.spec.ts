import { ForbiddenException } from '@nestjs/common';
import { QueueEntryStatus } from '../generated/prisma/enums';
import { AnalyticsService } from './analytics.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('AnalyticsService', () => {
  const prisma = {
    business: {
      findFirst: jest.fn(),
    },
    queueHistory: {
      findMany: jest.fn(),
    },
  };

  let service: AnalyticsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AnalyticsService(prisma as any);
  });

  it('returns customer history with business category details', async () => {
    prisma.queueHistory.findMany.mockResolvedValue([
      {
        id: 'history-1',
        queueEntryId: 'entry-1',
        queueNumber: 'A001',
        finalStatus: QueueEntryStatus.COMPLETED,
        joinedAt: new Date('2026-08-25T02:00:00.000Z'),
        completedAt: new Date('2026-08-25T02:20:00.000Z'),
        waitingMinutes: 10,
        serviceMinutes: 10,
        business: {
          id: 'business-1',
          name: 'Queue Cafe',
          address: 'Jl. Queue 1',
          category: { id: 'category-1', name: 'Cafe', slug: 'cafe' },
        },
      },
    ]);

    await expect(service.getMyHistory('user-1')).resolves.toEqual([
      {
        id: 'history-1',
        queueEntryId: 'entry-1',
        queueNumber: 'A001',
        finalStatus: QueueEntryStatus.COMPLETED,
        joinedAt: new Date('2026-08-25T02:00:00.000Z'),
        completedAt: new Date('2026-08-25T02:20:00.000Z'),
        waitingMinutes: 10,
        serviceMinutes: 10,
        business: {
          id: 'business-1',
          name: 'Queue Cafe',
          address: 'Jl. Queue 1',
          category: { id: 'category-1', name: 'Cafe', slug: 'cafe' },
        },
      },
    ]);
    expect(prisma.queueHistory.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user-1' }, take: 50 }),
    );
  });

  it('aggregates merchant analytics for owned businesses', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-08-25T10:00:00.000Z'));
    prisma.business.findFirst.mockResolvedValue({ id: 'business-1' });
    prisma.queueHistory.findMany.mockResolvedValue([
      {
        createdAt: new Date('2026-08-25T02:00:00.000Z'),
        finalStatus: QueueEntryStatus.COMPLETED,
        waitingMinutes: 8,
        serviceMinutes: 12,
      },
      {
        createdAt: new Date('2026-08-25T03:00:00.000Z'),
        finalStatus: QueueEntryStatus.NO_SHOW,
        waitingMinutes: 15,
        serviceMinutes: null,
      },
      {
        createdAt: new Date('2026-08-24T03:00:00.000Z'),
        finalStatus: QueueEntryStatus.CANCELLED,
        waitingMinutes: null,
        serviceMinutes: null,
      },
    ]);

    const result = await service.getMerchantBusinessAnalytics(
      'merchant-user-1',
      'business-1',
    );

    expect(result).toMatchObject({
      businessId: 'business-1',
      windowDays: 7,
      totalHistoryCount: 3,
      completedCount: 1,
      cancelledCount: 1,
      noShowCount: 1,
      averageWaitingMinutes: 12,
      averageServiceMinutes: 12,
    });
    expect(result.recentDays).toHaveLength(7);
    expect(result.recentDays.at(-1)).toEqual({
      date: '2026-08-25',
      completedCount: 1,
      cancelledCount: 0,
      noShowCount: 1,
    });
    jest.useRealTimers();
  });

  it('rejects analytics for businesses outside the merchant account', async () => {
    prisma.business.findFirst.mockResolvedValue(null);

    await expect(
      service.getMerchantBusinessAnalytics('merchant-user-1', 'business-2'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});
