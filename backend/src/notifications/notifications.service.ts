import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { NotificationType, QueueEntryStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { activeQueueEntryStatuses } from '../queues/queue-calculation.util';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';

@Injectable()
export class NotificationsService {
  private readonly firebaseApp: App | null;

  constructor(private readonly prisma: PrismaService, configService: ConfigService) {
    this.firebaseApp = this.createFirebaseApp(configService);
  }

  async registerDeviceToken(userId: string, dto: RegisterDeviceTokenDto) {
    const token = dto.token.trim();
    const platform = dto.platform.trim() || 'unknown';

    return this.prisma.deviceToken.upsert({
      where: { token },
      update: { userId, platform },
      create: { userId, token, platform },
      select: { id: true, platform: true, updatedAt: true },
    });
  }

  async notifyCustomerCalled(queueEntryId: string) {
    const entry = await this.prisma.queueEntry.findUnique({
      where: { id: queueEntryId },
      include: { queue: { include: { business: true } } },
    });
    if (!entry?.userId) return;

    await this.createAndSendOnce({
      userId: entry.userId,
      queueEntryId: entry.id,
      type: NotificationType.CUSTOMER_CALLED,
      title: 'It is your turn',
      body: `${entry.queue.business.name} is calling ${entry.queueNumber}.`,
    });
  }

  async notifyQueueProgress(queueId: string) {
    const queue = await this.prisma.queue.findUnique({
      where: { id: queueId },
      include: {
        business: true,
        entries: {
          where: { status: { in: activeQueueEntryStatuses }, userId: { not: null } },
          orderBy: { sequenceNumber: 'asc' },
        },
      },
    });
    if (!queue) return;

    const activeEntries = queue.entries.filter((entry) => entry.status !== QueueEntryStatus.SERVING);
    await Promise.all(
      activeEntries.map(async (entry, index) => {
        if (!entry.userId) return;
        const peopleAhead = activeEntries.slice(0, index).length;
        if (![1, 2, 3].includes(peopleAhead)) return;

        await this.createAndSendOnce({
          userId: entry.userId,
          queueEntryId: entry.id,
          type: NotificationType.QUEUE_GETTING_CLOSE,
          title: 'Your turn is getting close',
          body: `${queue.business.name}: ${peopleAhead} ${peopleAhead === 1 ? 'person is' : 'people are'} ahead of ${entry.queueNumber}.`,
        });
      }),
    );
  }

  private async createAndSendOnce(input: { userId: string; queueEntryId: string; type: NotificationType; title: string; body: string }) {
    const existing = await this.prisma.notification.findFirst({
      where: {
        userId: input.userId,
        queueEntryId: input.queueEntryId,
        type: input.type,
        body: input.body,
      },
    });
    if (existing) return;

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

  private async sendPush(tokens: string[], title: string, body: string, queueEntryId: string) {
    if (!this.firebaseApp || tokens.length === 0) return;

    await getMessaging(this.firebaseApp).sendEachForMulticast({
      tokens,
      notification: { title, body },
      data: { queueEntryId },
    });
  }

  private createFirebaseApp(configService: ConfigService) {
    const projectId = configService.get<string>('FIREBASE_PROJECT_ID')?.trim();
    const clientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL')?.trim();
    const privateKey = configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n').trim();
    if (!projectId || !clientEmail || !privateKey) return null;

    const apps = getApps();
    if (apps.length > 0) return apps[0] ?? null;

    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
}
