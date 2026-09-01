import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueueStatus, Role } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private static readonly invalidCredentialHash =
    '$2b$12$dIyXOVACQsMXHfhp7nc60.lwSA9LrNnVOkBf39nzdRGnBdLiKWzTu';

  constructor(private readonly prisma: PrismaService) {}

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        merchant: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteMe(userId: string, password: string): Promise<{ success: true }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true, role: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    await this.deleteUser(userId, user.role);
    return { success: true };
  }

  async deleteByCredentials(
    email: string,
    password: string,
  ): Promise<{ success: true }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: { id: true, passwordHash: true, role: true },
    });
    const passwordMatches = await bcrypt.compare(
      password,
      user?.passwordHash ?? UsersService.invalidCredentialHash,
    );

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    await this.deleteUser(user.id, user.role);
    return { success: true };
  }

  private async deleteUser(userId: string, role: Role): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      if (role === Role.MERCHANT) {
        await tx.queue.updateMany({
          where: {
            business: { merchant: { userId } },
            status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] },
          },
          data: { status: QueueStatus.CLOSED, closedAt: new Date() },
        });
      }

      await tx.user.delete({ where: { id: userId } });
    });
  }
}
