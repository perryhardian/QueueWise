# QueueWise Deployment Runbook

This runbook is provider-neutral. Use a managed PostgreSQL database and a
container host that supports HTTPS, WebSockets, environment variables, release
commands, and health checks.

The repository includes a production Render Blueprint in `render.yaml`. It is
the recommended first deployment for an Indonesia-focused MVP because it keeps
the API and PostgreSQL database together in Render's Singapore region. The
generic Docker instructions remain available for other providers.

## 1. Production inputs

Prepare these outside version control:

- PostgreSQL connection URL with TLS enabled by the selected provider.
- Two different random JWT secrets of at least 32 characters.
- Firebase Admin project ID, client email, and private key for the backend.
- Firebase Android and iOS application configuration.
- A platform-restricted Google Maps API key.
- Android upload keystore and passwords.
- Public HTTPS backend domain.
- Public privacy-policy and external account-deletion URLs.
- A monitored privacy contact email address.

## 2. Backend environment

Create `backend/.env.production` from `backend/.env.example` and set:

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
API_PREFIX=api
CORS_ORIGINS=https://your-web-client.example
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/queuewise?sslmode=require
JWT_ACCESS_SECRET=GENERATE_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS
JWT_REFRESH_SECRET=GENERATE_A_DIFFERENT_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FIREBASE_PROJECT_ID=your-firebase-project
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-firebase-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
PRIVACY_CONTACT_EMAIL=privacy-contact@your-domain.example
```

Native mobile apps do not require a CORS origin. Leave `CORS_ORIGINS` empty if
QueueWise has no web client.

The backend serves the public legal routes outside the API prefix:

- `GET /privacy`
- `GET /delete-account`

Set the mobile release values to those routes on the deployed HTTPS host. The
deletion form sends credentials only to the same host at
`POST /<API_PREFIX>/account-deletion`.

## 3. Database and backend deployment

Build and run the one-shot migration image before replacing the API service:

```bash
docker build --target migration -t queuewise-migration ./backend
docker run --rm --env-file backend/.env.production queuewise-migration
```

Then deploy the runtime image:

```bash
docker build --target runtime -t queuewise-backend ./backend
docker run --env-file backend/.env.production -p 3000:3000 queuewise-backend
```

Configure the host health check as `GET /api/health/ready`. Confirm that HTTPS
and Socket.IO connections reach the same service.

Do not run the demo seed against production.

After the runtime is reachable, verify liveness, database readiness, and the
Socket.IO polling handshake from `backend/`:

```powershell
$env:QUEUEWISE_API_URL = 'https://api.example.com/api'
$env:QUEUEWISE_SOCKET_URL = 'https://api.example.com'
npm run verify:deployment
```

The same check can be started from GitHub Actions with the `Production smoke
test` workflow. Its URL inputs are public deployment addresses, not secrets.

## 4. Firebase

From `mobile/`, authenticate the Firebase CLI and run:

```bash
flutterfire configure
```

Select the production Firebase project and the Android/iOS apps using the
application ID `com.queuewise.queuewise`. Enable Cloud Messaging. Store the
Firebase Admin service-account values only in the backend secret manager.

## 5. Android signing and Maps

Create the upload keystore once and keep redundant secure backups. Configure
the ignored `mobile/android/key.properties` file as documented in
`mobile/README.md`. Configure the `production` GitHub environment and its
release variables/secrets as documented in `PHASE_18_ANDROID_RELEASE_BUILD.md`.
The environment must include `PRIVACY_POLICY_URL` and `ACCOUNT_DELETION_URL` as
described in `PHASE_20_ACCOUNT_PRIVACY_CONTROLS.md`.

After the release workflow is merged to `main`, use **Actions > Android
release** to produce the signed App Bundle. Supply an Android build number that
is greater than every prior Play Console upload. The workflow artifact contains
the `.aab` and its SHA-256 checksum and is retained for 14 days.

For an emergency local build, restrict the Maps key to the Android application
ID and signing certificate, then run:

```powershell
Copy-Item .env.example .env.production
# Replace the example URLs with the deployed HTTPS URL.
$env:GOOGLE_MAPS_API_KEY = 'your-restricted-google-maps-key'
flutter build appbundle --release --dart-define-from-file=.env.production
```

## 6. Device acceptance

Install a release build on two physical devices and verify:

1. Customer and merchant authentication.
2. Business discovery and Maps rendering.
3. Join, cancel, and active-queue recovery after restarting the app.
4. Merchant walk-in, call, start, complete, skip, and no-show actions.
5. QR check-in using the customer camera.
6. Real-time queue changes between both devices.
7. Foreground and background push notifications.
8. Customer history and merchant analytics.

Only promote the build after the readiness endpoint, migrations, device flows,
and notification delivery all pass.

## 7. Render Blueprint deployment

The Blueprint provisions these billable resources only after you review and
approve them in Render:

- `queuewise-api`: minimum paid web-service compute in Singapore.
- `queuewise-postgres`: minimum paid PostgreSQL compute in Singapore, with
  public database access disabled.

To deploy:

1. Merge `render.yaml` into the repository's default branch.
2. In Render, create a new Blueprint and connect the QueueWise repository.
3. Review the selected plans before approving resource creation.
4. Enter `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and
   `FIREBASE_PRIVATE_KEY` when Render prompts for unsynced values.
5. Enter a monitored `PRIVACY_CONTACT_EMAIL`; production startup rejects a
   missing address so an incomplete policy cannot be published accidentally.
6. Keep the generated JWT secrets and database connection managed by Render.
7. Confirm the pre-deploy migration and `/api/health/ready` check both pass.
8. Open `/privacy` and `/delete-account` on the public host, then run the GitHub
   `Production smoke test` workflow with:
   - API URL: `https://<render-service-host>/api`
   - Socket URL: `https://<render-service-host>`

Do not use the demo seed in the Render production database. Render's free web
plan is not used because pre-deploy migrations require a paid web service.
