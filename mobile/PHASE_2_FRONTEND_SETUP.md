# QueueWise - Phase 2 Frontend Setup

## Created

- Flutter mobile project in `mobile/`.
- Android and iOS platform targets retained.
- Desktop/web generated platform folders removed because QueueWise MVP is mobile-first and Windows desktop plugin symlink creation requires extra OS permission.
- Feature-first folder structure under `lib/features`.
- Core folders for constants, networking, routing, theme, and utilities.
- Minimal QueueWise app shell with Riverpod, GoRouter, Dio config, and Material Design 3 theme.
- `.env` and `.env.example` for mobile runtime configuration.

## Dependencies Added

- `flutter_riverpod`: app state management and dependency injection.
- `go_router`: declarative navigation.
- `dio`: REST API client.
- `shared_preferences`: non-sensitive local preferences.
- `flutter_secure_storage`: sensitive token storage for Phase 3.
- `mobile_scanner`: QR check-in scanner for Phase 7.
- `google_maps_flutter`: nearby business maps for later discovery features.
- `firebase_core`, `firebase_messaging`: push notification setup for Phase 9.
- `socket_io_client`: realtime queue updates for Phase 8.
- `flutter_dotenv`: environment variable loading.
- `intl`: formatting dates, times, and numbers.

## Useful Commands

```text
flutter pub get
flutter analyze
flutter test
flutter run
```

If `flutter` is not on PATH, use the local Puro SDK:

```text
C:\Users\LOQ\.puro\envs\stable\flutter\bin\flutter.bat
```

## Notes

- This phase only prepares the frontend project foundation.
- Authentication UI and API integration start in Phase 3.
- Business discovery screens start in Phase 4.
- Queue screens start in Phase 5.