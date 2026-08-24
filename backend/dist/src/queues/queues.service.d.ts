import { QueueEntryStatus, QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { OpenQueueDto } from './dto/open-queue.dto';
export declare class QueuesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBusinessQueue(businessId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
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
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    getMerchantDashboard(userId: string, queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
            openedAt: Date | null;
            closedAt: Date | null;
        };
        business: {
            id: string;
            name: string;
            address: string;
        };
        nowServing: string | null;
        waitingCount: number;
        checkedInCount: number;
        completedCount: number;
        averageServiceTimeMinutes: number;
        estimatedWaitingTimeMinutes: number;
        entries: {
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
        }[];
    }>;
    getMerchantQueueEntries(userId: string, queueId: string): Promise<{
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
    }[]>;
    openQueue(userId: string, businessId: string, dto: OpenQueueDto): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    closeQueue(userId: string, queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    pauseQueue(userId: string, queueId: string): Promise<{
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
            joinedAt: Date;
        }[];
    }>;
    assertMerchantOwnsQueue(userId: string, queueId: string): Promise<{
        business: {
            merchant: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                displayName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            merchantId: string;
            categoryId: string;
            description: string | null;
            imageUrl: string | null;
            address: string;
            latitude: import("@prisma/client-runtime-utils").Decimal | null;
            longitude: import("@prisma/client-runtime-utils").Decimal | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue | null;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            qrCodeToken: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessId: string;
        status: QueueStatus;
        currentNumber: string | null;
        nextSequence: number;
        averageServiceTimeMinutes: number;
        openedAt: Date | null;
        closedAt: Date | null;
    }>;
    assertMerchantOwnsBusiness(userId: string, businessId: string): Promise<{
        merchant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        merchantId: string;
        categoryId: string;
        description: string | null;
        imageUrl: string | null;
        address: string;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
        openingHours: import("@prisma/client/runtime/client").JsonValue | null;
        rating: import("@prisma/client-runtime-utils").Decimal | null;
        qrCodeToken: string;
    }>;
    toQueueStatus(queue: QueueWithEntries): {
        queue: {
            id: string;
            businessId: string;
            status: QueueStatus;
        };
        status: QueueStatus;
        currentNumber: string | null;
        peopleWaiting: number;
        estimatedWaitingTimeMinutes: number;
        averageServiceTimeMinutes: number;
        entries: {
            id: string;
            queueNumber: string;
            sequenceNumber: number;
            source: string;
            status: QueueEntryStatus;
            joinedAt: Date;
        }[];
    };
    private findOwnedQueueWithEntries;
    private toMerchantQueueEntry;
}
type QueueWithEntries = {
    id: string;
    businessId: string;
    status: QueueStatus;
    currentNumber: string | null;
    averageServiceTimeMinutes: number;
    entries: Array<{
        id: string;
        queueNumber: string;
        sequenceNumber: number;
        source: string;
        status: QueueEntryStatus;
        joinedAt: Date;
    }>;
};
export {};
