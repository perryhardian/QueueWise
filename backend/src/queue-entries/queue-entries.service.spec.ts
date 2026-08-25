import { QueueEntrySource, QueueEntryStatus } from '../generated/prisma/enums';
import { QueueEntriesService } from './queue-entries.service';

jest.mock('../notifications/notifications.service', () => ({
  NotificationsService: class NotificationsService {},
}));
jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('QueueEntriesService history records', () => {
  const prisma = {
    queueHistory: {
      upsert: jest.fn(),
    },
  };

  let service: QueueEntriesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new QueueEntriesService(
      prisma as any,
      {} as any,
      {} as any,
      {} as any,
    );
  });

  it('creates completed history with waiting and service durations', async () => {
    await (service as any).createHistoryRecord({
      id: 'entry-1',
      queueId: 'queue-1',
      userId: 'user-1',
      queueNumber: 'A001',
      sequenceNumber: 1,
      source: QueueEntrySource.ONLINE,
      status: QueueEntryStatus.COMPLETED,
      queue: { businessId: 'business-1' },
      joinedAt: new Date('2026-08-25T02:00:00.000Z'),
      calledAt: new Date('2026-08-25T02:12:00.000Z'),
      serviceStartedAt: new Date('2026-08-25T02:15:00.000Z'),
      completedAt: new Date('2026-08-25T02:30:00.000Z'),
    });

    expect(prisma.queueHistory.upsert).toHaveBeenCalledWith({
      where: { queueEntryId: 'entry-1' },
      update: {
        finalStatus: QueueEntryStatus.COMPLETED,
        completedAt: new Date('2026-08-25T02:30:00.000Z'),
        waitingMinutes: 12,
        serviceMinutes: 15,
      },
      create: expect.objectContaining({
        userId: 'user-1',
        businessId: 'business-1',
        queueEntryId: 'entry-1',
        queueNumber: 'A001',
        finalStatus: QueueEntryStatus.COMPLETED,
        waitingMinutes: 12,
        serviceMinutes: 15,
      }),
    });
  });

  it('creates walk-in no-show history without a user id', async () => {
    await (service as any).createHistoryRecord({
      id: 'entry-2',
      queueId: 'queue-1',
      userId: null,
      queueNumber: 'A002',
      sequenceNumber: 2,
      source: QueueEntrySource.WALK_IN,
      status: QueueEntryStatus.NO_SHOW,
      queue: { businessId: 'business-1' },
      joinedAt: new Date('2026-08-25T02:00:00.000Z'),
      noShowAt: new Date('2026-08-25T02:09:00.000Z'),
    });

    expect(prisma.queueHistory.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          userId: null,
          queueEntryId: 'entry-2',
          finalStatus: QueueEntryStatus.NO_SHOW,
          waitingMinutes: 9,
          serviceMinutes: null,
        }),
      }),
    );
  });
});
