# Phase 19 - Android Store Readiness

Prepared the Android app identity and version-controlled Google Play submission
materials.

## Android identity

- Replaced Flutter's default launcher icon with a generated QueueWise clock mark
  using the existing dark-green, emerald, and off-white product palette.
- Generated the legacy icon densities and added crisp native vectors for
  adaptive and Android 13 themed icons.
- Corrected the launcher label to `QueueWise` through a string resource.
- Kept the permanent application ID `com.queuewise.queuewise` unchanged.

The source images are stored under `mobile/assets/icons/launcher/`. Generated
Android resource variants remain committed so release builds do not require the
icon generator.

## Store metadata

`mobile/store/google-play/listing-en-US.json` contains the default English app
name, short description, and full description. The Dart validator enforces the
Google Play character limits and verifies that the launcher source is a square
PNG at least 512 pixels wide.

Run it from `mobile/` with:

```bash
flutter pub run tool/validate_google_play_assets.dart
```

The metadata is deliberately factual and limited to features already represented
in the repository.

## Policy preparation

The Data Safety file inventories personal information, queue activity, device
tokens, camera use, and authentication handling visible in the current code. It
is a review draft, not a legal conclusion. The release checklist separates
repository-complete work from items requiring the app owner, production services,
public policy URLs, store graphics, and Play Console access.

## Remaining external gates

- Merge Phase 18 and Phase 19 into `main` in order.
- Publish and expose an active privacy policy and deletion-request process.
- Export the 512 x 512 Play icon, capture phone screenshots, and create the
  feature graphic.
- Complete Play Console policy declarations and reviewer access instructions.
- Upload the signed bundle to an internal test track and complete acceptance.
