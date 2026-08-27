import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';
export declare class NotificationsService {
    private readonly prisma;
    private readonly firebaseApp;
    constructor(prisma: PrismaService, configService: ConfigService);
    registerDeviceToken(userId: string, dto: RegisterDeviceTokenDto): Promise<{
        id: string;
        updatedAt: Date;
        platform: string;
    }>;
    notifyCustomerCalled(queueEntryId: string): Promise<void>;
    notifyQueueProgress(queueId: string): Promise<void>;
    private createAndSendOnce;
    private sendPush;
    private createFirebaseApp;
}
