jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { HealthController } from './health.controller';

describe('HealthController', () => {
  const queryRaw = jest.fn();
  const controller = new HealthController({ $queryRaw: queryRaw } as never);

  beforeEach(() => {
    queryRaw.mockReset();
  });

  it('reports process liveness', () => {
    expect(controller.getLiveness()).toMatchObject({ status: 'ok' });
  });

  it('reports readiness after the database responds', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await expect(controller.getReadiness()).resolves.toMatchObject({
      status: 'ready',
      database: 'connected',
    });
    expect(queryRaw).toHaveBeenCalledTimes(1);
  });

  it('does not report readiness when the database fails', async () => {
    queryRaw.mockRejectedValue(new Error('database unavailable'));

    await expect(controller.getReadiness()).rejects.toThrow(
      'database unavailable',
    );
  });
});
