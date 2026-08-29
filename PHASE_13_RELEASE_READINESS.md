# Phase 13 - Release Readiness

Prepared the QueueWise MVP for reproducible database deployment and safe
Android release packaging.

## Backend

- Added the initial PostgreSQL migration for the complete MVP schema.
- Added `prisma:deploy` and `prisma:status` scripts.
- Documented development and production migration commands.
- Verified migration deployment and idempotent seeding on an isolated schema.
- Baselined the existing local database without changing its tables or data.

## Mobile

- Kept the permanent Android application ID as `com.queuewise.queuewise`.
- Replaced debug signing for release builds with ignored keystore properties.
- Made unsigned release builds fail with a clear configuration message.
- Documented local setup, verification, and Android upload-key configuration.

## Acceptance Verification

- Backend build passed.
- Backend tests passed: 4 suites, 8 tests.
- Flutter analysis passed.
- Flutter tests passed: 12 tests.
- Android debug APK built successfully.
- Customer and merchant API flows passed for authentication, discovery, join,
  QR check-in, call/start/complete, cancellation, history, analytics, token
  refresh, and logout.

## External Release Gates

- Create and securely back up the Android upload keystore.
- Add the ignored `android/key.properties` file and build the release app bundle.
- Configure production environment variables and Firebase credentials.
- Complete a final smoke test on physical customer and merchant devices.
