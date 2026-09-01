import 'reflect-metadata';
import { validateEnvironment } from './environment.validation';

const validProductionEnvironment = {
  NODE_ENV: 'production',
  DATABASE_URL: 'postgresql://queuewise:password@database:5432/queuewise',
  JWT_ACCESS_SECRET: 'access-secret-with-more-than-32-characters',
  JWT_REFRESH_SECRET: 'refresh-secret-with-more-than-32-characters',
  FIREBASE_PROJECT_ID: 'queuewise-production',
  FIREBASE_CLIENT_EMAIL:
    'firebase-admin@queuewise-production.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY:
    '-----BEGIN PRIVATE KEY-----\\nprivate-key\\n-----END PRIVATE KEY-----',
  PRIVACY_CONTACT_EMAIL: 'privacy@queuewise.example',
};

describe('validateEnvironment', () => {
  it('accepts complete production configuration', () => {
    expect(validateEnvironment(validProductionEnvironment)).toMatchObject({
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 3000,
    });
  });

  it('rejects placeholder production secrets', () => {
    expect(() =>
      validateEnvironment({
        ...validProductionEnvironment,
        JWT_ACCESS_SECRET: 'replace-with-at-least-32-random-characters',
      }),
    ).toThrow('JWT_ACCESS_SECRET');
  });

  it('requires complete Firebase Admin credentials in production', () => {
    expect(() =>
      validateEnvironment({
        ...validProductionEnvironment,
        FIREBASE_PRIVATE_KEY: '',
      }),
    ).toThrow('Firebase Admin credentials');
  });

  it('requires a privacy contact in production', () => {
    expect(() =>
      validateEnvironment({
        ...validProductionEnvironment,
        PRIVACY_CONTACT_EMAIL: '',
      }),
    ).toThrow('PRIVACY_CONTACT_EMAIL');
  });

  it('keeps Firebase optional during development', () => {
    expect(
      validateEnvironment({
        NODE_ENV: 'development',
        DATABASE_URL: 'postgresql://localhost:5432/queuewise',
        JWT_ACCESS_SECRET: 'local-access-secret',
        JWT_REFRESH_SECRET: 'local-refresh-secret',
      }),
    ).toMatchObject({ NODE_ENV: 'development' });
  });
});
