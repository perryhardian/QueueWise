# QueueWise mobile

Flutter customer and merchant application for QueueWise.

## Local setup

Copy `.env.example` to `.env`, set the API and WebSocket URLs for the target
device, then pass it as compile-time configuration:

```bash
flutter pub get
flutter run --dart-define-from-file=.env
```

For an Android emulator, the host machine is normally available at
`10.0.2.2`. A physical device must use an address reachable from that device.

## Verification

```bash
flutter analyze
flutter test
flutter pub run tool/validate_google_play_assets.dart
flutter build apk --debug
```

Google Play listing copy, the engineering Data Safety draft, and the submission
checklist are under `store/google-play/`. The Android application ID is
`com.queuewise.queuewise`. Complete the submission checklist before publishing.

Production builds also require public HTTPS `PRIVACY_POLICY_URL` and
`ACCOUNT_DELETION_URL` values. The profile links to both pages and provides a
password-confirmed in-app deletion flow. Deletion removes the account, sessions,
push tokens, and notifications, de-identifies retained queue records, and closes
active merchant queues before detaching business ownership.
The backend serves `/privacy` and `/delete-account` outside the API prefix.
See `../DEPLOYMENT.md` for public URL and privacy-contact configuration.
Set `SUPPORT_EMAIL` to the inbox that should receive messages from the
in-app Help and support page.

## Android release signing

The application ID is `com.queuewise.queuewise`. Treat it as permanent after
the first store release.

Create an upload keystore at `android/app/upload-keystore.jks`, then create the
ignored file `android/key.properties`:

```properties
storePassword=your-store-password
keyPassword=your-key-password
keyAlias=upload
storeFile=app/upload-keystore.jks
```

Keystores and `key.properties` are ignored by Git. Keep secure backups outside
the repository.

## Firebase and Google Maps

Run `flutterfire configure` for the production Firebase project. Android
requires `android/app/google-services.json`; iOS requires
`ios/Runner/GoogleService-Info.plist`. Configure Firebase Cloud Messaging and
provide the matching Firebase Admin service account variables to the backend.

Set a platform-restricted Google Maps key as `GOOGLE_MAPS_API_KEY` in the shell
that performs the Android build.

## Android release build

Release builds require HTTPS API/WebSocket URLs, Android signing, Firebase
configuration, and the Maps key. The recommended path is the manual
`Android release` GitHub Actions workflow. Configure its `production` environment
as described in `../DEPLOYMENT.md`. It validates the production inputs,
builds a signed App Bundle from `main`, uploads the bundle with a checksum, and
removes temporary credentials from the runner.

For a local build:

```powershell
$env:GOOGLE_MAPS_API_KEY = 'your-restricted-google-maps-key'
flutter build appbundle --release --dart-define-from-file=.env.production
```

The output is `build/app/outputs/bundle/release/app-release.aab`.
