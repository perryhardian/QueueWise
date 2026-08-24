import { Role } from '../generated/prisma/enums';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  sessionId?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    role: Role;
  };
}