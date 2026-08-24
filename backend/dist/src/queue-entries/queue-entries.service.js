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
exports.QueueEntriesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
const queue_calculation_util_1 = require("../queues/queue-calculation.util");
const queues_service_1 = require("../queues/queues.service");
let QueueEntriesService = class QueueEntriesService {
    prisma;
    queuesService;
    constructor(prisma, queuesService) {
        this.prisma = prisma;
        this.queuesService = queuesService;
    }
    async joinQueue(userId, queueId, _dto) {
        return this.prisma.$transaction(async (tx) => {
            const queue = await tx.queue.findUnique({ where: { id: queueId }, include: { business: true } });
            if (!queue)
                throw new common_1.NotFoundException('Queue not found');
            if (queue.status !== enums_1.QueueStatus.OPEN)
                throw new common_1.BadRequestException('Queue is not open');
            const existingActiveEntry = await tx.queueEntry.findFirst({
                where: { queue: { businessId: queue.businessId, status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } }, userId, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } },
            });
            if (existingActiveEntry)
                throw new common_1.ConflictException('You already have an active queue for this business');
            const updatedQueue = await tx.queue.update({ where: { id: queue.id }, data: { nextSequence: { increment: 1 } } });
            const sequenceNumber = queue.nextSequence;
            const entry = await tx.queueEntry.create({
                data: { queueId: queue.id, userId, queueNumber: (0, queue_calculation_util_1.formatQueueNumber)(sequenceNumber), sequenceNumber, source: enums_1.QueueEntrySource.ONLINE, status: enums_1.QueueEntryStatus.WAITING },
            });
            const peopleAhead = await tx.queueEntry.count({ where: { queueId: queue.id, sequenceNumber: { lt: sequenceNumber }, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } } });
            return this.toActiveQueueEntry(entry, updatedQueue.currentNumber, peopleAhead, updatedQueue.averageServiceTimeMinutes);
        });
    }
    async addWalkIn(userId, queueId, _dto) {
        await this.queuesService.assertMerchantOwnsQueue(userId, queueId);
        return this.prisma.$transaction(async (tx) => {
            const queue = await tx.queue.findUnique({ where: { id: queueId } });
            if (!queue)
                throw new common_1.NotFoundException('Queue not found');
            if (queue.status !== enums_1.QueueStatus.OPEN)
                throw new common_1.BadRequestException('Queue is not open');
            const updatedQueue = await tx.queue.update({ where: { id: queue.id }, data: { nextSequence: { increment: 1 } } });
            const sequenceNumber = queue.nextSequence;
            const entry = await tx.queueEntry.create({
                data: { queueId: queue.id, queueNumber: (0, queue_calculation_util_1.formatQueueNumber)(sequenceNumber), sequenceNumber, source: enums_1.QueueEntrySource.WALK_IN, status: enums_1.QueueEntryStatus.WAITING },
            });
            const peopleAhead = await tx.queueEntry.count({ where: { queueId: queue.id, sequenceNumber: { lt: sequenceNumber }, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } } });
            return this.toActiveQueueEntry(entry, updatedQueue.currentNumber, peopleAhead, updatedQueue.averageServiceTimeMinutes);
        });
    }
    async getMyActiveQueue(userId) {
        const entry = await this.prisma.queueEntry.findFirst({
            where: { userId, status: { in: queue_calculation_util_1.activeQueueEntryStatuses }, queue: { status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } } },
            orderBy: { joinedAt: 'desc' },
            include: { queue: { include: { business: { include: { category: true } } } } },
        });
        if (!entry)
            return null;
        const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: entry.queueId, sequenceNumber: { lt: entry.sequenceNumber }, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } } });
        return this.toActiveQueueEntry(entry, entry.queue.currentNumber, peopleAhead, entry.queue.averageServiceTimeMinutes, entry.queue.business);
    }
    async getEntryStatus(userId, entryId) {
        const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId }, include: { queue: { include: { business: { include: { category: true } } } } } });
        if (!entry)
            throw new common_1.NotFoundException('Queue entry not found');
        if (entry.userId !== userId)
            throw new common_1.ForbiddenException('You do not own this queue entry');
        const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: entry.queueId, sequenceNumber: { lt: entry.sequenceNumber }, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } } });
        return this.toActiveQueueEntry(entry, entry.queue.currentNumber, peopleAhead, entry.queue.averageServiceTimeMinutes, entry.queue.business);
    }
    async cancelEntry(userId, entryId) {
        const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId } });
        if (!entry)
            throw new common_1.NotFoundException('Queue entry not found');
        if (entry.userId !== userId)
            throw new common_1.ForbiddenException('You do not own this queue entry');
        if (entry.status !== enums_1.QueueEntryStatus.WAITING && entry.status !== enums_1.QueueEntryStatus.CHECKED_IN)
            throw new common_1.BadRequestException('This queue entry cannot be cancelled');
        const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: enums_1.QueueEntryStatus.CANCELLED, cancelledAt: new Date() }, include: { queue: { include: { business: { include: { category: true } } } } } });
        const peopleAhead = await this.prisma.queueEntry.count({ where: { queueId: updated.queueId, sequenceNumber: { lt: updated.sequenceNumber }, status: { in: queue_calculation_util_1.activeQueueEntryStatuses } } });
        return this.toActiveQueueEntry(updated, updated.queue.currentNumber, peopleAhead, updated.queue.averageServiceTimeMinutes, updated.queue.business);
    }
    async callNext(userId, queueId) {
        await this.queuesService.assertMerchantOwnsQueue(userId, queueId);
        return this.prisma.$transaction(async (tx) => {
            const queue = await tx.queue.findUnique({ where: { id: queueId } });
            if (!queue)
                throw new common_1.NotFoundException('Queue not found');
            if (queue.status !== enums_1.QueueStatus.OPEN)
                throw new common_1.BadRequestException('Queue is not open');
            const activeCalled = await tx.queueEntry.findFirst({ where: { queueId, status: enums_1.QueueEntryStatus.CALLED }, orderBy: { sequenceNumber: 'asc' } });
            if (activeCalled)
                return this.toMerchantQueueEntry(activeCalled);
            const nextEntry = await tx.queueEntry.findFirst({ where: { queueId, status: { in: [enums_1.QueueEntryStatus.CHECKED_IN, enums_1.QueueEntryStatus.WAITING] } }, orderBy: [{ status: 'asc' }, { sequenceNumber: 'asc' }] });
            if (!nextEntry)
                throw new common_1.NotFoundException('No waiting customers available');
            const updated = await tx.queueEntry.update({ where: { id: nextEntry.id }, data: { status: enums_1.QueueEntryStatus.CALLED, calledAt: new Date() } });
            await tx.queue.update({ where: { id: queueId }, data: { currentNumber: updated.queueNumber } });
            return this.toMerchantQueueEntry(updated);
        });
    }
    async callEntry(userId, entryId) {
        const entry = await this.assertMerchantOwnsEntry(userId, entryId);
        if (entry.status !== enums_1.QueueEntryStatus.WAITING && entry.status !== enums_1.QueueEntryStatus.CHECKED_IN)
            throw new common_1.BadRequestException('Only waiting or checked-in customers can be called');
        const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: enums_1.QueueEntryStatus.CALLED, calledAt: new Date() } });
        await this.prisma.queue.update({ where: { id: entry.queueId }, data: { currentNumber: updated.queueNumber } });
        return this.toMerchantQueueEntry(updated);
    }
    async startService(userId, entryId) {
        const entry = await this.assertMerchantOwnsEntry(userId, entryId);
        if (entry.status !== enums_1.QueueEntryStatus.CALLED)
            throw new common_1.BadRequestException('Only called customers can start service');
        const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: enums_1.QueueEntryStatus.SERVING, serviceStartedAt: new Date() } });
        await this.prisma.queue.update({ where: { id: entry.queueId }, data: { currentNumber: updated.queueNumber } });
        return this.toMerchantQueueEntry(updated);
    }
    async completeService(userId, entryId) {
        const entry = await this.assertMerchantOwnsEntry(userId, entryId);
        if (entry.status !== enums_1.QueueEntryStatus.SERVING)
            throw new common_1.BadRequestException('Only serving customers can be completed');
        return this.prisma.$transaction(async (tx) => {
            const completed = await tx.queueEntry.update({ where: { id: entryId }, data: { status: enums_1.QueueEntryStatus.COMPLETED, completedAt: new Date() } });
            const completedDurations = await tx.queueEntry.findMany({ where: { queueId: entry.queueId, status: enums_1.QueueEntryStatus.COMPLETED, serviceStartedAt: { not: null }, completedAt: { not: null } }, select: { serviceStartedAt: true, completedAt: true } });
            const average = this.calculateAverageServiceMinutes(completedDurations, entry.queue.averageServiceTimeMinutes);
            await tx.queue.update({ where: { id: entry.queueId }, data: { averageServiceTimeMinutes: average } });
            return this.toMerchantQueueEntry(completed);
        });
    }
    async markNoShow(userId, entryId) {
        const entry = await this.assertMerchantOwnsEntry(userId, entryId);
        if (entry.status !== enums_1.QueueEntryStatus.CALLED && entry.status !== enums_1.QueueEntryStatus.WAITING && entry.status !== enums_1.QueueEntryStatus.CHECKED_IN)
            throw new common_1.BadRequestException('This customer cannot be marked no-show');
        const updated = await this.prisma.queueEntry.update({ where: { id: entryId }, data: { status: enums_1.QueueEntryStatus.NO_SHOW, noShowAt: new Date() } });
        return this.toMerchantQueueEntry(updated);
    }
    async skipEntry(userId, entryId) {
        return this.markNoShow(userId, entryId);
    }
    async assertMerchantOwnsEntry(userId, entryId) {
        const entry = await this.prisma.queueEntry.findUnique({ where: { id: entryId }, include: { queue: { include: { business: { include: { merchant: true } } } } } });
        if (!entry)
            throw new common_1.NotFoundException('Queue entry not found');
        if (entry.queue.business.merchant.userId !== userId)
            throw new common_1.ForbiddenException('You do not manage this queue entry');
        return entry;
    }
    calculateAverageServiceMinutes(entries, fallback) {
        const durations = entries.flatMap((entry) => {
            if (!entry.serviceStartedAt || !entry.completedAt)
                return [];
            return [Math.max(1, Math.round((entry.completedAt.getTime() - entry.serviceStartedAt.getTime()) / 60000))];
        });
        if (!durations.length)
            return fallback;
        return Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length);
    }
    toMerchantQueueEntry(entry) {
        return { id: entry.id, queueId: entry.queueId, queueNumber: entry.queueNumber, sequenceNumber: entry.sequenceNumber, source: entry.source, status: entry.status, joinedAt: entry.joinedAt };
    }
    toActiveQueueEntry(entry, currentNumber, peopleAhead, averageServiceTimeMinutes, business) {
        return {
            id: entry.id,
            queueId: entry.queueId,
            queueNumber: entry.queueNumber,
            sequenceNumber: entry.sequenceNumber,
            source: entry.source,
            status: entry.status,
            joinedAt: entry.joinedAt,
            nowServing: currentNumber,
            peopleAhead,
            estimatedWaitingTimeMinutes: (0, queue_calculation_util_1.estimateWaitMinutes)(peopleAhead, averageServiceTimeMinutes),
            business: business ? { id: business.id, name: business.name, address: business.address, category: business.category } : undefined,
        };
    }
};
exports.QueueEntriesService = QueueEntriesService;
exports.QueueEntriesService = QueueEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, queues_service_1.QueuesService])
], QueueEntriesService);
//# sourceMappingURL=queue-entries.service.js.map