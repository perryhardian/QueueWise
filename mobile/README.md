# QueueWise mobile

Flutter customer and merchant application for QueueWise.

## Local setup

Copy `.env.example` to `.env`, set the API and WebSocket URLs for the target
device, then run:

```bash
flutter pub get
flutter run
```

For an Android emulator, the host machine is normally available at
`10.0.2.2`. A physical device must use an address reachable from that device.

## Verification

```bash
flutter analyze
flutter test
flutter build apk --debug
```

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
the repository. Release builds intentionally fail when signing is not
configured:

```bash
flutter build appbundle --release
```
