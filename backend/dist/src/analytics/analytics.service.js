"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyHistory(userId) {
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
    async getMerchantBusinessAnalytics(userId, businessId) {
        const business = await this.prisma.business.findFirst({
            where: { id: businessId, merchant: { userId } },
            select: { id: true },
        });
        if (!business)
            throw new common_1.ForbiddenException('You do not manage this business');
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
            completedCount: histories.filter((history) => history.finalStatus === enums_1.QueueEntryStatus.COMPLETED).length,
            cancelledCount: histories.filter((history) => history.finalStatus === enums_1.QueueEntryStatus.CANCELLED).length,
            noShowCount: histories.filter((history) => history.finalStatus === enums_1.QueueEntryStatus.NO_SHOW).length,
            averageWaitingMinutes: this.average(histories.map((history) => history.waitingMinutes)),
            averageServiceMinutes: this.average(histories.map((history) => history.serviceMinutes)),
            recentDays: this.buildRecentDays(histories),
        };
    }
    buildRecentDays(histories) {
        const days = new Map();
        for (let offset = 6; offset >= 0; offset -= 1) {
            const date = new Date();
            date.setDate(date.getDate() - offset);
            const key = this.dateKey(date);
            days.set(key, { date: key, completedCount: 0, cancelledCount: 0, noShowCount: 0 });
        }
        for (const history of histories) {
            const day = days.get(this.dateKey(history.createdAt));
            if (!day)
                continue;
            if (history.finalStatus === enums_1.QueueEntryStatus.COMPLETED)
                day.completedCount += 1;
            if (history.finalStatus === enums_1.QueueEntryStatus.CANCELLED)
                day.cancelledCount += 1;
            if (history.finalStatus === enums_1.QueueEntryStatus.NO_SHOW)
                day.noShowCount += 1;
        }
        return Array.from(days.values());
    }
    average(values) {
        const validValues = values.filter((value) => typeof value === 'number');
        if (!validValues.length)
            return 0;
        return Math.round(validValues.reduce((sum, value) => sum + value, 0) / validValues.length);
    }
    dateKey(date) {
        return date.toISOString().slice(0, 10);
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map