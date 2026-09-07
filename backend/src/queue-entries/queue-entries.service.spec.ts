import {
  QueueEntrySource,
  QueueEntryStatus,
  QueueStatus,
} from '../generated/prisma/enums';
import type { NotificationsService } from '../notifications/notifications.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { QueuesService } from '../queues/queues.service';
import type { QueueEventsService } from '../websocket/queue-events.service';
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
      upsert: jest.fn((input: HistoryUpsertInput) => {
        void input;
        return Promise.resolve();
      }),
    },
  };

  let service: QueueEntriesService;
  let historyWriter: HistoryWriter;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new QueueEntriesService(
      prisma as unknown as PrismaService,
      {} as QueuesService,
      {} as QueueEventsService,
      {} as NotificationsService,
    );
    historyWriter = service as unknown as HistoryWriter;
  });

  it('creates completed history with waiting and service durations', async () => {
    await historyWriter.createHistoryRecord({
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

    const input = prisma.queueHistory.upsert.mock.calls[0]?.[0];
    expect(input).toEqual({
      where: { queueEntryId: 'entry-1' },
      update: {
        finalStatus: QueueEntryStatus.COMPLETED,
        completedAt: new Date('2026-08-25T02:30:00.000Z'),
        waitingMinutes: 12,
        serviceMinutes: 15,
      },
      create: {
        userId: 'user-1',
        businessId: 'business-1',
        queueEntryId: 'entry-1',
        queueNumber: 'A001',
        finalStatus: QueueEntryStatus.COMPLETED,
        joinedAt: new Date('2026-08-25T02:00:00.000Z'),
        completedAt: new Date('2026-08-25T02:30:00.000Z'),
        waitingMinutes: 12,
        serviceMinutes: 15,
      },
    });
  });

  it('creates walk-in no-show history without a user id', async () => {
    await historyWriter.createHistoryRecord({
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

    const input = prisma.queueHistory.upsert.mock.calls[0]?.[0];
    expect(input?.create).toEqual({
      userId: null,
      businessId: 'business-1',
      queueEntryId: 'entry-2',
      queueNumber: 'A002',
      finalStatus: QueueEntryStatus.NO_SHOW,
      joinedAt: new Date('2026-08-25T02:00:00.000Z'),
      completedAt: new Date('2026-08-25T02:09:00.000Z'),
      waitingMinutes: 9,
      serviceMinutes: null,
    });
  });
});

describe('QueueEntriesService queue-number allocation', () => {
  const queueEventsService = {
    emitQueueEvent: jest.fn(),
  };
  const notificationsService = {
    notifyQueueProgress: jest.fn(),
  };
  const queuesService = {
    assertMerchantOwnsQueue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    notificationsService.notifyQueueProgress.mockResolvedValue(undefined);
    queuesService.assertMerchantOwnsQueue.mockResolvedValue(undefined);
  });

  it('uses the atomic increment result when an online join read a stale sequence', async () => {
    const tx = createJoinTransaction(8);
    const prisma = {
      $transaction: jest.fn(async (callback: JoinTransactionCallback) =>
        callback(tx),
      ),
    };
    const service = new QueueEntriesService(
      prisma as unknown as PrismaService,
      queuesService as unknown as QueuesService,
      queueEventsService as unknown as QueueEventsService,
      notificationsService as unknown as NotificationsService,
    );

    const result = await service.joinQueue('user-1', 'queue-1', {});

    expect(tx.queueEntry.create).toHaveBeenCalledWith({
      data: {
        queueId: 'queue-1',
        userId: 'user-1',
        queueNumber: 'A007',
        sequenceNumber: 7,
        source: QueueEntrySource.ONLINE,
        status: QueueEntryStatus.WAITING,
      },
    });
    expect(result).toEqual(
      expect.objectContaining({
        queueNumber: 'A007',
        sequenceNumber: 7,
      }),
    );
  });

  it('uses the atomic increment result for a walk-in join too', async () => {
    const tx = createJoinTransaction(12);
    const prisma = {
      $transaction: jest.fn(async (callback: JoinTransactionCallback) =>
        callback(tx),
      ),
    };
    const service = new QueueEntriesService(
      prisma as unknown as PrismaService,
      queuesService as unknown as QueuesService,
      queueEventsService as unknown as QueueEventsService,
      notificationsService as unknown as NotificationsService,
    );

    const result = await service.addWalkIn('merchant-1', 'queue-1', {
      customerName: 'Walk-in customer',
    });

    expect(tx.queueEntry.create).toHaveBeenCalledWith({
      data: {
        queueId: 'queue-1',
        queueNumber: 'A011',
        sequenceNumber: 11,
        source: QueueEntrySource.WALK_IN,
        status: QueueEntryStatus.WAITING,
      },
    });
    expect(result).toEqual(
      expect.objectContaining({
        queueNumber: 'A011',
        sequenceNumber: 11,
      }),
    );
  });
});

function createJoinTransaction(nextSequenceAfterIncrement: number) {
  const entry = {
    id: 'entry-1',
    queueId: 'queue-1',
    queueNumber: `A${String(nextSequenceAfterIncrement - 1).padStart(3, '0')}`,
    sequenceNumber: nextSequenceAfterIncrement - 1,
    source: QueueEntrySource.ONLINE,
    status: QueueEntryStatus.WAITING,
    joinedAt: new Date('2026-09-07T00:00:00.000Z'),
  };

  return {
    queue: {
      findUnique: jest.fn().mockResolvedValue({
        id: 'queue-1',
        businessId: 'business-1',
        status: QueueStatus.OPEN,
        nextSequence: 1,
      }),
      update: jest.fn().mockResolvedValue({
        currentNumber: 'A005',
        nextSequence: nextSequenceAfterIncrement,
        averageServiceTimeMinutes: 10,
      }),
    },
    queueEntry: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockImplementation(({ data }: { data: JoinEntryCreateData }) => ({
          ...entry,
          ...data,
        })),
      count: jest.fn().mockResolvedValue(2),
    },
  };
}

type HistoryEntryInput = {
  id: string;
  queueId: string;
  userId: string | null;
  queueNumber: string;
  sequenceNumber: number;
  source: QueueEntrySource;
  status: QueueEntryStatus;
  queue: { businessId: string };
  joinedAt: Date;
  calledAt?: Date;
  serviceStartedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  noShowAt?: Date;
};

type HistoryWriter = {
  createHistoryRecord(entry: HistoryEntryInput): Promise<void>;
};

type HistoryUpsertInput = {
  where: { queueEntryId: string };
  update: {
    finalStatus: QueueEntryStatus;
    completedAt: Date;
    waitingMinutes: number;
    serviceMinutes: number | null;
  };
  create: {
    userId: string | null;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: QueueEntryStatus;
    joinedAt: Date;
    completedAt: Date;
    waitingMinutes: number;
    serviceMinutes: number | null;
  };
};

type JoinEntryCreateData = {
  queueId: string;
  userId?: string;
  queueNumber: string;
  sequenceNumber: number;
  source: QueueEntrySource;
  status: QueueEntryStatus;
};

type JoinTransaction = ReturnType<typeof createJoinTransaction>;
type JoinTransactionCallback = (
  transaction: JoinTransaction,
) => Promise<unknown>;
