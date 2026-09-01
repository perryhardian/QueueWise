import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LegalPagesService {
  constructor(private readonly configService: ConfigService) {}

  privacyPolicy(): string {
    const contactEmail = this.contactEmail();
    return this.document(
      'QueueWise privacy policy',
      'privacy',
      `<article class="document">
        <p class="document__meta">Effective 1 September 2026</p>
        <h1>Privacy, plainly stated.</h1>
        <p class="lede">QueueWise uses account and queue information to authenticate people, operate live queues, preserve service history, and send requested queue notifications.</p>

        <section>
          <h2>Who is responsible</h2>
          <p>The QueueWise project owner operates this service. Send privacy questions or requests to <a class="plain-link" href="mailto:${contactEmail}">${contactEmail}</a>.</p>
        </section>

        <section>
          <h2>Information QueueWise handles</h2>
          <ul>
            <li><strong>Account information:</strong> name, email address, optional phone number, account role, password hash, and authentication-session records.</li>
            <li><strong>Queue activity:</strong> queue joins, check-ins, queue numbers, status changes, timestamps, and service history.</li>
            <li><strong>Merchant information:</strong> merchant display name and the business, service, opening-hour, address, and queue information a merchant manages.</li>
            <li><strong>Notifications:</strong> device messaging tokens and records needed to prevent duplicate queue alerts.</li>
            <li><strong>Camera use:</strong> the mobile app reads QueueWise QR codes on the device. QueueWise does not upload or store camera images.</li>
          </ul>
          <p>The current mobile app does not request device location. Business coordinates belong to business listings, not to a customer’s device-location history.</p>
        </section>

        <section>
          <h2>Why it is used</h2>
          <p>QueueWise uses this information to create and secure accounts, show businesses and queue status, manage customer and walk-in entries, calculate waiting-time estimates, provide merchant operational analytics, and deliver queue notifications.</p>
        </section>

        <section>
          <h2>Service providers and disclosure</h2>
          <p>QueueWise relies on infrastructure and database hosting for the API and on Firebase Cloud Messaging for push delivery. Those providers process only the information needed to provide their service. QueueWise does not include advertising SDKs and does not sell personal information. Information may be disclosed when required by law or needed to protect the service and its users.</p>
        </section>

        <section>
          <h2>Security and retention</h2>
          <p>Production traffic must use HTTPS. Passwords are stored as bcrypt hashes, and mobile session credentials are stored using platform secure storage. Access is limited to the service functions that need the information.</p>
          <p>Account information remains while the account is active. Deleting an account removes its profile, sessions, device tokens, and notifications. Queue and service-history records may remain with the user link removed so shared operational records stay consistent. Provider backups and security logs may persist for their normal retention windows or where law requires retention.</p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>You may delete your account in the QueueWise app under <strong>Profile → Privacy &amp; data</strong>, or use the <a class="plain-link" href="/delete-account">external account-deletion page</a>. Contact <a class="plain-link" href="mailto:${contactEmail}">${contactEmail}</a> for another privacy request.</p>
        </section>

        <section>
          <h2>Policy changes</h2>
          <p>Material changes will be reflected on this page with a new effective date. Review this page before relying on an earlier version of the policy.</p>
        </section>
      </article>`,
    );
  }

  accountDeletion(): string {
    const apiPrefix = this.escapeAttribute(
      this.configService
        .get<string>('API_PREFIX', 'api')
        .replace(/^\/+|\/+$/g, ''),
    );
    return this.document(
      'Delete your QueueWise account',
      'delete-account',
      `<div class="deletion-layout">
        <section class="deletion-copy">
          <p class="document__meta">Permanent account deletion</p>
          <h1>Delete your QueueWise account.</h1>
          <p class="lede">Use the email address and current password for the account. This works without the mobile app.</p>
          <p>Deletion removes your profile, active sessions, device tokens, and notifications. Your name and account ID are detached from queue history. If you are a merchant, open queues close and the business record remains without an account owner.</p>
          <p>This action cannot be undone. You may also delete the account inside QueueWise under <strong>Profile → Privacy &amp; data</strong>.</p>
        </section>

        <form class="deletion-form" method="post" action="/${apiPrefix}/account-deletion" data-account-deletion-form aria-busy="false">
          <div class="field">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="254" required aria-required="true" aria-describedby="email-help">
            <span class="field__help" id="email-help">Use the address registered to QueueWise.</span>
          </div>

          <div class="field">
            <label for="password">Current password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" minlength="8" maxlength="128" required aria-required="true" aria-describedby="password-help">
            <span class="field__help" id="password-help">QueueWise verifies the password before deleting anything.</span>
          </div>

          <div class="field">
            <label for="confirmation">Type DELETE to confirm</label>
            <input id="confirmation" name="confirmation" type="text" autocomplete="off" pattern="DELETE" maxlength="6" required aria-required="true" aria-describedby="confirmation-help">
            <span class="field__help" id="confirmation-help">Use capital letters exactly as shown.</span>
          </div>

          <p class="form-status" data-form-status role="alert" aria-live="polite"></p>
          <button class="button" type="submit" data-state="default"><span data-button-label>Delete account</span></button>
        </form>

        <section class="result" data-deletion-result hidden>
          <h2 tabindex="-1">Account deleted</h2>
          <p>Your QueueWise account and directly associated personal data were deleted. You may close this page.</p>
        </section>
      </div>`,
      true,
    );
  }

  private document(
    title: string,
    currentPage: 'privacy' | 'delete-account',
    content: string,
    includeScript = false,
  ): string {
    const privacyCurrent =
      currentPage === 'privacy' ? ' aria-current="page"' : '';
    const deletionCurrent =
      currentPage === 'delete-account' ? ' aria-current="page"' : '';
    const script = includeScript
      ? '<script src="/legal.js" defer></script>'
      : '';
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="description" content="QueueWise privacy and account deletion information.">
  <title>${this.escapeHtml(title)}</title>
  <link rel="stylesheet" href="/legal.css">
  ${script}
</head>
<body>
  <header class="shell">
    <nav class="nav-min" aria-label="Legal pages">
      <a class="wordmark" href="/privacy">QueueWise</a>
      <ul>
        <li><a href="/privacy"${privacyCurrent}>Privacy</a></li>
        <li><a href="/delete-account"${deletionCurrent}>Delete account</a></li>
      </ul>
    </nav>
  </header>
  <main class="shell">${content}</main>
  <footer class="shell foot-line">
    <p><strong>QueueWise</strong> · clear queues, clear choices</p>
    <p><a href="/privacy">Privacy</a> · <a href="/delete-account">Delete account</a></p>
  </footer>
</body>
</html>`;
  }

  private contactEmail(): string {
    return this.escapeHtml(
      this.configService.get<string>(
        'PRIVACY_CONTACT_EMAIL',
        'privacy-contact@example.invalid',
      ),
    );
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entities[character];
    });
  }

  private escapeAttribute(value: string): string {
    return this.escapeHtml(value);
  }
}
