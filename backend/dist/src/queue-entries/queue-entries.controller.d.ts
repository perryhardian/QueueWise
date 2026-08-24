import type { AuthenticatedUser } from '../auth/auth.types';
import { JoinQueueDto } from './dto/join-queue.dto';
import { WalkInDto } from './dto/walk-in.dto';
import { QueueEntriesService } from './queue-entries.service';
export declare class QueueEntriesController {
    private readonly queueEntriesService;
    constructor(queueEntriesService: QueueEntriesService);
    joinQueue(user: AuthenticatedUser, queueId: string, dto: JoinQueueDto): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
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
    myActiveQueue(user: AuthenticatedUser): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
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
    entryStatus(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
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
    cancel(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
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
    walkIn(user: AuthenticatedUser, queueId: string, dto: WalkInDto): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
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
    callNext(user: AuthenticatedUser, queueId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
    callEntry(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
    startService(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
    completeService(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
    markNoShow(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
    skipEntry(user: AuthenticatedUser, entryId: string): Promise<{
        id: string;
        queueId: string;
        queueNumber: string;
        sequenceNumber: number;
        source: import("../generated/prisma/enums").QueueEntrySource;
        status: import("../generated/prisma/enums").QueueEntryStatus;
        joinedAt: Date;
    }>;
}
