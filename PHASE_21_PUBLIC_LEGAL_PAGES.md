# Phase 21 - Public Legal Pages

QueueWise now serves its privacy policy and external account-deletion flow from
the existing backend deployment:

- `GET /privacy`
- `GET /delete-account`
- `POST /<API_PREFIX>/account-deletion`

The pages use the locked QueueWise design system, work at mobile widths, and
ship restrictive content-security, framing, referrer, and permissions headers.
They do not load third-party page assets. Bricolage Grotesque and IBM Plex Sans
are self-hosted from `backend/src/legal/assets/fonts/` with their SIL Open Font
License texts.

## External account deletion

The deletion page accepts the account email, current password, and an explicit
`DELETE` confirmation. The public API normalizes the email, compares a password
hash even for an unknown email to reduce timing-based account enumeration, and
returns the same authentication error for a missing account or wrong password.

Successful deletion uses the Phase 20 deletion service. It removes the account,
sessions, device tokens, and notifications; de-identifies retained queue
records; and closes active merchant queues before detaching business ownership.

## Production configuration

Set a monitored contact address before deployment:

```dotenv
PRIVACY_CONTACT_EMAIL=privacy-contact@your-domain.example
```

Production environment validation rejects a missing address. Render exposes it
as an unsynced value so the real contact is not committed to the repository.

After deployment, configure the mobile release and Play Console with:

```dotenv
PRIVACY_POLICY_URL=https://<public-host>/privacy
ACCOUNT_DELETION_URL=https://<public-host>/delete-account
```

## Release checks still owned outside the repository

- Have the policy wording, retention statement, and provider list reviewed by
  the responsible owner or qualified counsel.
- Confirm the deployed provider set still matches the policy.
- Exercise deletion with dedicated customer and merchant test accounts.
- Enter the final URLs and matching Data Safety answers in Play Console.
