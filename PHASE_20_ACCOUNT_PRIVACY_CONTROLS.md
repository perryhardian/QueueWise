# Phase 20 - Account Privacy Controls

Added the in-app and API foundations required for QueueWise account deletion and
public legal-policy access.

## Account deletion

Authenticated users can delete their account from **Profile > Privacy & data**
after confirming their current password. A successful request:

- Permanently deletes the `User` row.
- Cascades deletion of authentication sessions, push tokens, and notifications.
- Detaches customer queue entries and history through their existing nullable
  user relationships, leaving operational records de-identified.
- Closes active merchant queues before deletion.
- Deletes the merchant identity while preserving businesses and shared queue
  records with no merchant owner.
- Clears mobile access and refresh tokens and returns the app to login.

HTTP and new WebSocket authentication now require an active persisted session,
so deleted or revoked sessions cannot reconnect with an otherwise unexpired JWT.

## Privacy and external deletion pages

The profile exposes both the public privacy policy and the external
account-deletion page. Production builds require these compile-time values:

```dotenv
PRIVACY_POLICY_URL=https://example.com/queuewise/privacy
ACCOUNT_DELETION_URL=https://example.com/queuewise/delete-account
```

Both values must be public HTTPS URLs and should be configured as GitHub
`production` environment variables. The external deletion page must let a user
request deletion without reinstalling the app.

## Database migration

The migration makes `Business.merchantId` nullable and changes merchant deletion
from cascading business deletion to `SET NULL`. Apply it with the normal
production `prisma migrate deploy` pre-deploy step before releasing the mobile
build.

## Remaining external gates

- Publish the privacy policy with developer/contact, collection, sharing,
  security, retention, and deletion details reviewed by the responsible owner.
- Publish a functional QueueWise deletion-request page and configure both URLs.
- Decide how orphaned merchant businesses are transferred, archived, or removed.
- Reconcile any production service-provider deletion duties.
- Update the Play Console Data Safety and account-deletion answers.
