import type { AuthenticatedUser } from '../auth/auth.types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: AuthenticatedUser): Promise<{
        merchant: {
            id: string;
            displayName: string;
        } | null;
        id: string;
        email: string;
        fullName: string;
        phoneNumber: string | null;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
