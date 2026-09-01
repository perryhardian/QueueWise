import { ConfigService } from '@nestjs/config';
import { LegalPagesService } from './legal-pages.service';

describe('LegalPagesService', () => {
  const config = {
    get: jest.fn((key: string, fallback?: string) => {
      if (key === 'PRIVACY_CONTACT_EMAIL') return 'privacy@example.com';
      if (key === 'API_PREFIX') return 'api';
      return fallback;
    }),
  };

  const service = new LegalPagesService(config as unknown as ConfigService);

  it('renders an identifiable privacy policy with collection and deletion details', () => {
    const page = service.privacyPolicy();

    expect(page).toContain('<title>QueueWise privacy policy</title>');
    expect(page).toContain('privacy@example.com');
    expect(page).toContain('Queue activity:');
    expect(page).toContain('does not request device location');
    expect(page).toContain('external account-deletion page');
  });

  it('renders a deletion form against the configured API prefix', () => {
    const page = service.accountDeletion();

    expect(page).toContain('action="/api/account-deletion"');
    expect(page).toContain('autocomplete="current-password"');
    expect(page).toContain('pattern="DELETE"');
    expect(page).toContain('data-deletion-result hidden');
  });
});
