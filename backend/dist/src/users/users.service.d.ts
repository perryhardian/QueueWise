import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: string): Promise<{
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
