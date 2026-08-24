import type { AuthenticatedUser } from '../auth/auth.types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: AuthenticatedUser): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string | null;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
        merchant: {
            id: string;
            displayName: string;
        } | null;
    }>;
}
