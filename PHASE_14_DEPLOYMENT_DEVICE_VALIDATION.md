# Phase 14 - Deployment and Device Validation

Prepared QueueWise for provider-neutral production deployment.

## Backend

- Added liveness and database-readiness endpoints.
- Added production validation for JWT and Firebase Admin credentials.
- Added configurable host binding and restricted production CORS behavior.
- Corrected the compiled production entry point.
- Added separate Docker migration and lean runtime targets.

## Mobile

- Replaced bundled `.env` loading with compile-time Dart definitions.
- Added release validation for public HTTPS API and Socket.IO URLs.
- Added Android Google Maps key injection.
- Added conditional Firebase Google Services configuration.
- Extended release checks for signing, Firebase, and Maps inputs.

## Documentation

- Added a provider-neutral deployment runbook.
- Documented Firebase, Android signing, Maps restrictions, and physical-device
  acceptance testing.

## External Gates

- Select and provision the production PostgreSQL/container provider.
- Supply production domains and secret-manager values.
- Run `flutterfire configure` with the production Firebase account.
- Create and back up the Android upload keystore.
- Run the final two-device acceptance checklist.
