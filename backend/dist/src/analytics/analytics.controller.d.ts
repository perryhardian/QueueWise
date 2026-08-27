import type { AuthenticatedUser } from '../auth/auth.types';
import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getMyHistory(user: AuthenticatedUser): Promise<{
        id: string;
        queueEntryId: string;
        queueNumber: string;
        finalStatus: import("../generated/prisma/enums").QueueEntryStatus;
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
    getMerchantBusinessAnalytics(user: AuthenticatedUser, businessId: string): Promise<{
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
}
