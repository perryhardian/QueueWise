import { Role } from '../../generated/prisma/enums';
export declare class RegisterDto {
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    role?: Role;
    merchantDisplayName?: string;
}
