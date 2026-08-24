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
exports.QueuesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
const queue_calculation_util_1 = require("./queue-calculation.util");
let QueuesService = class QueuesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBusinessQueue(businessId) {
        const queue = await this.prisma.queue.findFirst({
            where: { businessId, status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } },
            orderBy: { openedAt: 'desc' },
            include: { business: true, entries: { where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
        });
        if (!queue) {
            return { queue: null, status: enums_1.QueueStatus.CLOSED, currentNumber: null, peopleWaiting: 0, estimatedWaitingTimeMinutes: 0, averageServiceTimeMinutes: 10 };
        }
        return this.toQueueStatus(queue);
    }
    async getQueueStatus(queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
            include: { business: true, entries: { where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        return this.toQueueStatus(queue);
    }
    async getMerchantDashboard(userId, queueId) {
        const queue = await this.findOwnedQueueWithEntries(userId, queueId);
        const entries = queue.entries.map((entry) => this.toMerchantQueueEntry(entry));
        const waitingStatuses = [enums_1.QueueEntryStatus.WAITING, enums_1.QueueEntryStatus.CHECKED_IN, enums_1.QueueEntryStatus.CALLED];
        const serving = queue.entries.find((entry) => entry.status === enums_1.QueueEntryStatus.SERVING) ?? null;
        const waitingCount = queue.entries.filter((entry) => waitingStatuses.includes(entry.status)).length;
        const checkedInCount = queue.entries.filter((entry) => entry.status === enums_1.QueueEntryStatus.CHECKED_IN).length;
        const completedCount = queue.entries.filter((entry) => entry.status === enums_1.QueueEntryStatus.COMPLETED).length;
        return {
            queue: { id: queue.id, businessId: queue.businessId, status: queue.status, openedAt: queue.openedAt, closedAt: queue.closedAt },
            business: { id: queue.business.id, name: queue.business.name, address: queue.business.address },
            nowServing: serving?.queueNumber ?? queue.currentNumber,
            waitingCount,
            checkedInCount,
            completedCount,
            averageServiceTimeMinutes: queue.averageServiceTimeMinutes,
            estimatedWaitingTimeMinutes: (0, queue_calculation_util_1.estimateWaitMinutes)(waitingCount, queue.averageServiceTimeMinutes),
            entries,
        };
    }
    async getMerchantQueueEntries(userId, queueId) {
        const queue = await this.findOwnedQueueWithEntries(userId, queueId);
        return queue.entries.map((entry) => this.toMerchantQueueEntry(entry));
    }
    async getMerchantQueues(userId) {
        const queues = await this.prisma.queue.findMany({
            where: { business: { merchant: { userId } }, status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } },
            orderBy: { openedAt: 'desc' },
            include: {
                business: true,
                entries: { where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } },
            },
        });
        return queues.map((queue) => ({
            ...this.toQueueStatus(queue),
            business: { id: queue.business.id, name: queue.business.name, address: queue.business.address },
        }));
    }
    async openQueue(userId, businessId, dto) {
        await this.assertMerchantOwnsBusiness(userId, businessId);
        return this.prisma.$transaction(async (tx) => {
            await tx.queue.updateMany({
                where: { businessId, status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } },
                data: { status: enums_1.QueueStatus.CLOSED, closedAt: new Date() },
            });
            const queue = await tx.queue.create({
                data: { businessId, status: enums_1.QueueStatus.OPEN, nextSequence: 1, averageServiceTimeMinutes: dto.averageServiceTimeMinutes ?? 10, openedAt: new Date() },
                include: { business: true, entries: true },
            });
            return this.toQueueStatus(queue);
        });
    }
    async closeQueue(userId, queueId) {
        await this.assertMerchantOwnsQueue(userId, queueId);
        const queue = await this.prisma.queue.update({
            where: { id: queueId },
            data: { status: enums_1.QueueStatus.CLOSED, closedAt: new Date() },
            include: { business: true, entries: { where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
        });
        return this.toQueueStatus(queue);
    }
    async pauseQueue(userId, queueId) {
        await this.assertMerchantOwnsQueue(userId, queueId);
        const queue = await this.prisma.queue.update({
            where: { id: queueId },
            data: { status: enums_1.QueueStatus.PAUSED },
            include: { business: true, entries: { where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses } }, orderBy: { sequenceNumber: 'asc' } } },
        });
        return this.toQueueStatus(queue);
    }
    async assertMerchantOwnsQueue(userId, queueId) {
        const queue = await this.prisma.queue.findUnique({ where: { id: queueId }, include: { business: { include: { merchant: true } } } });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        if (queue.business.merchant.userId !== userId)
            throw new common_1.ForbiddenException('You do not manage this queue');
        return queue;
    }
    async assertMerchantOwnsBusiness(userId, businessId) {
        const business = await this.prisma.business.findUnique({ where: { id: businessId }, include: { merchant: true } });
        if (!business)
            throw new common_1.NotFoundException('Business not found');
        if (business.merchant.userId !== userId)
            throw new common_1.ForbiddenException('You do not manage this business');
        return business;
    }
    toQueueStatus(queue) {
        const peopleWaiting = queue.entries.filter((entry) => entry.status !== enums_1.QueueEntryStatus.SERVING).length;
        return {
            queue: { id: queue.id, businessId: queue.businessId, status: queue.status },
            status: queue.status,
            currentNumber: queue.currentNumber,
            peopleWaiting,
            estimatedWaitingTimeMinutes: (0, queue_calculation_util_1.estimateWaitMinutes)(peopleWaiting, queue.averageServiceTimeMinutes),
            averageServiceTimeMinutes: queue.averageServiceTimeMinutes,
            entries: queue.entries.map((entry) => ({ id: entry.id, queueNumber: entry.queueNumber, sequenceNumber: entry.sequenceNumber, source: entry.source, status: entry.status, joinedAt: entry.joinedAt })),
        };
    }
    async findOwnedQueueWithEntries(userId, queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
            include: {
                business: { include: { merchant: true } },
                entries: { orderBy: { sequenceNumber: 'asc' } },
            },
        });
        if (!queue)
            throw new common_1.NotFoundException('Queue not found');
        if (queue.business.merchant.userId !== userId)
            throw new common_1.ForbiddenException('You do not manage this queue');
        return queue;
    }
    toMerchantQueueEntry(entry) {
        return {
            id: entry.id,
            queueId: entry.queueId,
            queueNumber: entry.queueNumber,
            sequenceNumber: entry.sequenceNumber,
            source: entry.source,
            status: entry.status,
            joinedAt: entry.joinedAt,
            checkedInAt: entry.checkedInAt,
            calledAt: entry.calledAt,
            serviceStartedAt: entry.serviceStartedAt,
            completedAt: entry.completedAt,
            cancelledAt: entry.cancelledAt,
            noShowAt: entry.noShowAt,
        };
    }
};
exports.QueuesService = QueuesService;
exports.QueuesService = QueuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QueuesService);
//# sourceMappingURL=queues.service.js.map