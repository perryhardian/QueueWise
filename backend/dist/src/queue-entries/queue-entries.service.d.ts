import { QueueEntrySource, QueueEntryStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { QueuesService } from '../queues/queues.service';
import { JoinQueueDto } from './dto/join-queue.dto';
import { WalkInDto } from './dto/walk-in.dto';
export declare class QueueEntriesService {
    private readonly prisma;
    private readonly queuesService;
    constructor(prisma: PrismaService, queuesService: QueuesService);
    joinQueue(userId: string, queueId: string, _dto: JoinQueueDto): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
        nowServing: string | null;
        peopleAhead: number;
        estimatedWaitingTimeMinutes: number;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
        } | undefined;
    }>;
    addWalkIn(userId: string, queueId: string, _dto: WalkInDto): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
        nowServing: string | null;
        peopleAhead: number;
        estimatedWaitingTimeMinutes: number;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
        } | undefined;
    }>;
    getMyActiveQueue(userId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
        nowServing: string | null;
        peopleAhead: number;
        estimatedWaitingTimeMinutes: number;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
        } | undefined;
    } | null>;
    getEntryStatus(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
        nowServing: string | null;
        peopleAhead: number;
        estimatedWaitingTimeMinutes: number;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
        } | undefined;
    }>;
    cancelEntry(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
        nowServing: string | null;
        peopleAhead: number;
        estimatedWaitingTimeMinutes: number;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
        } | undefined;
    }>;
    callNext(userId: string, queueId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    callEntry(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    startService(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    completeService(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    markNoShow(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    skipEntry(userId: string, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: QueueEntrySource;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
    private assertMerchantOwnsEntry;
    private calculateAverageServiceMinutes;
    private toMerchantQueueEntry;
    private toActiveQueueEntry;
}
