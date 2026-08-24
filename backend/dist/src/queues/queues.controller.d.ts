import type { AuthenticatedUser } from '../auth/auth.types';
import { OpenQueueDto } from './dto/open-queue.dto';
import { QueuesService } from './queues.service';
export declare class QueuesController {
    private readonly queuesService;
    constructor(queuesService: QueuesService);
    getBusinessQueue(businessId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: import("../generated/prisma/enums").QueueStatus;
        };
        status: import("../generated/prisma/enums").QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: import("../generated/prisma/enums").QueueEntryStatus;
            joinedAt: Date;
        }[];
    } | {
        queue: null;
        status: "CLOSED";
        currentNumber: null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
    }>;
    getQueueStatus(queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: import("../generated/prisma/enums").QueueStatus;
        };
        status: import("../generated/prisma/enums").QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: import("../generated/prisma/enums").QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    openQueue(user: AuthenticatedUser, businessId: string, dto: OpenQueueDto): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: import("../generated/prisma/enums").QueueStatus;
        };
        status: import("../generated/prisma/enums").QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: import("../generated/prisma/enums").QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    closeQueue(user: AuthenticatedUser, queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: import("../generated/prisma/enums").QueueStatus;
        };
        status: import("../generated/prisma/enums").QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: import("../generated/prisma/enums").QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    pauseQueue(user: AuthenticatedUser, queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: import("../generated/prisma/enums").QueueStatus;
        };
        status: import("../generated/prisma/enums").QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: import("../generated/prisma/enums").QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
}
