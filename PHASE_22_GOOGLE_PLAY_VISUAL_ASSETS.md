# Phase 22 - Google Play Visual Assets

QueueWise now includes the remaining repository-owned graphics for its default
English Google Play listing:

- `mobile/store/google-play/graphics/app-icon.png` - 512 x 512, 32-bit PNG.
- `mobile/store/google-play/graphics/feature-graphic.png` - 1024 x 500,
  24-bit PNG without alpha.
- `mobile/store/google-play/graphics/phone-screenshots/` - four current
  1080 x 1920 customer-app captures.
- `mobile/store/google-play/graphics/alt-text-en-US.json` - concise descriptions
  ready to enter with the feature graphic and screenshots.

The feature graphic follows the locked QueueWise palette and status-first
hierarchy. It uses only factual queue information represented by the product and
does not include rankings, pricing, store badges, devices, or time-sensitive
claims.

## Validation

From `mobile/`, run:

```bash
flutter pub run tool/validate_google_play_assets.dart
```

The validator checks the listing character limits, launcher source, exact Play
icon and feature-graphic dimensions, PNG color formats, screenshot count and
dimensions, and matching alt text capped at 140 characters.

## Remaining owner actions

- Review every graphic at full resolution before upload.
- Enter the matching alt text in Play Console.
- Localize promotional graphics if QueueWise publishes localized store listings.
- Replace screenshots after material UI changes so the listing stays accurate.
- Complete the remaining policy declarations, reviewer access, signed-bundle
  upload, and two-device acceptance in the release checklist.
