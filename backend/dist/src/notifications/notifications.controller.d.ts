import type { AuthenticatedUser } from '../auth/auth.types';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    registerDeviceToken(user: AuthenticatedUser, dto: RegisterDeviceTokenDto): Promise<{
        id: string;
        updatedAt: Date;
        platform: string;
    }>;
}
