import { QueueEntryStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMyHistory(userId: string): Promise<{
        id: string;
        queueEntryId: string;
        queueNumber: string;
        finalStatus: QueueEntryStatus;
        joinedAt: Date;
        completedAt: Date | null;
        waitingMinutes: number | null;
        serviceMinutes: number | null;
        business: {
            id: string;
            name: string;
            address: string;
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
            };
        };
    }[]>;
    getMerchantBusinessAnalytics(userId: string, businessId: string): Promise<{
        businessId: string;
        windowDays: number;
        totalHistoryCount: number;
        completedCount: number;
        cancelledCount: number;
        noShowCount: number;
        averageWaitingMinutes: number;
        averageServiceMinutes: number;
        recentDays: {
            date: string;
            completedCount: number;
            cancelledCount: number;
            noShowCount: number;
        }[];
    }>;
    private buildRecentDays;
    private average;
    private dateKey;
}
