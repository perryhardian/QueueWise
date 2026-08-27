import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMe(userId: string): Promise<{
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
