# QueueWise Deployment Runbook

This runbook is provider-neutral. Use a managed PostgreSQL database and a
container host that supports HTTPS, WebSockets, environment variables, release
commands, and health checks.

## 1. Production inputs

Prepare these outside version control:

- PostgreSQL connection URL with TLS enabled by the selected provider.
- Two different random JWT secrets of at least 32 characters.
- Firebase Admin project ID, client email, and private key for the backend.
- Firebase Android and iOS application configuration.
- A platform-restricted Google Maps API key.
- Android upload keystore and passwords.
- Public HTTPS backend domain.

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
```

Native mobile apps do not require a CORS origin. Leave `CORS_ORIGINS` empty if
QueueWise has no web client.

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
`mobile/README.md`.

Restrict the Maps key to the Android application ID and signing certificate,
then build:

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
