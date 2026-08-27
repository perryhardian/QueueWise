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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const enums_1 = require("../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
const queue_calculation_util_1 = require("../queues/queue-calculation.util");
let NotificationsService = class NotificationsService {
    prisma;
    firebaseApp;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.firebaseApp = this.createFirebaseApp(configService);
    }
    async registerDeviceToken(userId, dto) {
        const token = dto.token.trim();
        const platform = dto.platform.trim() || 'unknown';
        return this.prisma.deviceToken.upsert({
            where: { token },
            update: { userId, platform },
            create: { userId, token, platform },
            select: { id: true, platform: true, updatedAt: true },
        });
    }
    async notifyCustomerCalled(queueEntryId) {
        const entry = await this.prisma.queueEntry.findUnique({
            where: { id: queueEntryId },
            include: { queue: { include: { business: true } } },
        });
        if (!entry?.userId)
            return;
        await this.createAndSendOnce({
            userId: entry.userId,
            queueEntryId: entry.id,
            type: enums_1.NotificationType.CUSTOMER_CALLED,
            title: 'It is your turn',
            body: `${entry.queue.business.name} is calling ${entry.queueNumber}.`,
        });
    }
    async notifyQueueProgress(queueId) {
        const queue = await this.prisma.queue.findUnique({
            where: { id: queueId },
            include: {
                business: true,
                entries: {
                    where: { status: { in: queue_calculation_util_1.activeQueueEntryStatuses }, userId: { not: null } },
                    orderBy: { sequenceNumber: 'asc' },
                },
            },
        });
        if (!queue)
            return;
        const activeEntries = queue.entries.filter((entry) => entry.status !== enums_1.QueueEntryStatus.SERVING);
        await Promise.all(activeEntries.map(async (entry, index) => {
            if (!entry.userId)
                return;
            const peopleAhead = activeEntries.slice(0, index).length;
            if (![1, 2, 3].includes(peopleAhead))
                return;
            await this.createAndSendOnce({
                userId: entry.userId,
                queueEntryId: entry.id,
                type: enums_1.NotificationType.QUEUE_GETTING_CLOSE,
                title: 'Your turn is getting close',
                body: `${queue.business.name}: ${peopleAhead} ${peopleAhead === 1 ? 'person is' : 'people are'} ahead of ${entry.queueNumber}.`,
            });
        }));
    }
    async createAndSendOnce(input) {
        const existing = await this.prisma.notification.findFirst({
            where: {
                userId: input.userId,
                queueEntryId: input.queueEntryId,
                type: input.type,
                body: input.body,
            },
        });
        if (existing)
            return;
        await this.prisma.notification.create({
            data: {
                userId: input.userId,
                queueEntryId: input.queueEntryId,
                type: input.type,
                title: input.title,
                body: input.body,
            },
        });
        const deviceTokens = await this.prisma.deviceToken.findMany({
            where: { userId: input.userId },
            select: { token: true },
        });
        await this.sendPush(deviceTokens.map((item) => item.token), input.title, input.body, input.queueEntryId);
    }
    async sendPush(tokens, title, body, queueEntryId) {
        if (!this.firebaseApp || tokens.length === 0)
            return;
        await (0, messaging_1.getMessaging)(this.firebaseApp).sendEachForMulticast({
            tokens,
            notification: { title, body },
            data: { queueEntryId },
        });
    }
    createFirebaseApp(configService) {
        const projectId = configService.get('FIREBASE_PROJECT_ID')?.trim();
        const clientEmail = configService.get('FIREBASE_CLIENT_EMAIL')?.trim();
        const privateKey = configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n').trim();
        if (!projectId || !clientEmail || !privateKey)
            return null;
        const apps = (0, app_1.getApps)();
        if (apps.length > 0)
            return apps[0] ?? null;
        return (0, app_1.initializeApp)({
            credential: (0, app_1.cert)({ projectId, clientEmail, privateKey }),
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map