import 'reflect-metadata';

import { validateEnvironment } from './environment.validation';

describe('validateEnvironment', () => {
  const validEnvironment = {
    NODE_ENV: 'development',
    PORT: '3000',
    API_PREFIX: 'api',
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/queuewise',
    JWT_ACCESS_SECRET: 'access-secret',
    JWT_REFRESH_SECRET: 'refresh-secret',
    JWT_ACCESS_EXPIRES_IN: '15m',
    JWT_REFRESH_EXPIRES_IN: '7d',
  };

  it('converts a string port from .env to a number', () => {
    expect(validateEnvironment(validEnvironment).PORT).toBe(3000);
  });

  it('rejects a port outside the valid range', () => {
    expect(() => validateEnvironment({ ...validEnvironment, PORT: '70000' })).toThrow();
  });
});
