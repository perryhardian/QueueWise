import { PublicAccountDeletionController } from './legal.controller';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('PublicAccountDeletionController', () => {
  it('forwards verified credentials without returning them', async () => {
    const usersService = {
      deleteByCredentials: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new PublicAccountDeletionController(
      usersService as never,
    );

    await expect(
      controller.deleteAccount({
        email: 'user@example.com',
        password: 'password123',
        confirmation: 'DELETE',
      }),
    ).resolves.toEqual({ success: true });
    expect(usersService.deleteByCredentials).toHaveBeenCalledWith(
      'user@example.com',
      'password123',
    );
  });
});
