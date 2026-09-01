import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueueStatus, Role } from '../generated/prisma/enums';
import type { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

jest.mock('bcrypt', () => ({ compare: jest.fn() }));
jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('UsersService account deletion', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    queue: {
      updateMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.$transaction.mockImplementation(
      (operation: (client: typeof prisma) => unknown) =>
        Promise.resolve(operation(prisma)),
    );
    service = new UsersService(prisma as unknown as PrismaService);
  });

  it('rejects deletion when the account no longer exists', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.deleteMe('missing-user', 'password123'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('requires the current password', async () => {
    prisma.user.findUnique.mockResolvedValue({
      passwordHash: 'hash',
      role: Role.CUSTOMER,
    });
    jest.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await expect(
      service.deleteMe('user-1', 'wrong-password'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('deletes a customer account after password confirmation', async () => {
    prisma.user.findUnique.mockResolvedValue({
      passwordHash: 'hash',
      role: Role.CUSTOMER,
    });
    jest.mocked(bcrypt.compare).mockResolvedValue(true as never);

    await expect(service.deleteMe('user-1', 'password123')).resolves.toEqual({
      success: true,
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'user-1' },
    });
    expect(prisma.queue.updateMany).not.toHaveBeenCalled();
  });

  it('closes active queues before deleting a merchant account', async () => {
    prisma.user.findUnique.mockResolvedValue({
      passwordHash: 'hash',
      role: Role.MERCHANT,
    });
    jest.mocked(bcrypt.compare).mockResolvedValue(true as never);

    await service.deleteMe('merchant-1', 'password123');

    expect(prisma.queue.updateMany).toHaveBeenCalledWith({
      where: {
        business: { merchant: { userId: 'merchant-1' } },
        status: { in: [QueueStatus.OPEN, QueueStatus.PAUSED] },
      },
      data: {
        status: QueueStatus.CLOSED,
        closedAt: expect.any(Date) as Date,
      },
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'merchant-1' },
    });
  });

  it('uses the same public credential error when the email does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    jest.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await expect(
      service.deleteByCredentials('missing@example.com', 'password123'),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      expect.stringMatching(/^\$2b\$12\$/),
    );
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('deletes an account through verified public credentials', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'customer-2',
      passwordHash: 'hash',
      role: Role.CUSTOMER,
    });
    jest.mocked(bcrypt.compare).mockResolvedValue(true as never);

    await expect(
      service.deleteByCredentials(' USER@EXAMPLE.COM ', 'password123'),
    ).resolves.toEqual({ success: true });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com' },
      select: { id: true, passwordHash: true, role: true },
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'customer-2' },
    });
  });
});
