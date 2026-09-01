import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../../generated/prisma/enums';
import { JwtStrategy } from './jwt.strategy';

jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('JwtStrategy active sessions', () => {
  const prisma = {
    authSession: {
      findFirst: jest.fn(),
    },
  };
  const configService = {
    getOrThrow: jest.fn().mockReturnValue('test-access-secret'),
  };

  let strategy: JwtStrategy;

  beforeEach(() => {
    jest.clearAllMocks();
    strategy = new JwtStrategy(configService as any, prisma as any);
  });

  it('returns the current user from an active session', async () => {
    prisma.authSession.findFirst.mockResolvedValue({
      user: {
        id: 'user-1',
        email: 'user@example.com',
        role: Role.CUSTOMER,
      },
    });

    await expect(
      strategy.validate({
        sub: 'user-1',
        email: 'stale@example.com',
        role: Role.CUSTOMER,
        sessionId: 'session-1',
      }),
    ).resolves.toEqual({
      id: 'user-1',
      email: 'user@example.com',
      role: Role.CUSTOMER,
      sessionId: 'session-1',
    });
  });

  it('rejects a token without an active session', async () => {
    prisma.authSession.findFirst.mockResolvedValue(null);

    await expect(
      strategy.validate({
        sub: 'user-1',
        email: 'user@example.com',
        role: Role.CUSTOMER,
        sessionId: 'deleted-session',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
