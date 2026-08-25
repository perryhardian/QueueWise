# Phase 12 - MVP Polish QA

Focused pass on customer-facing queue flow polish and stale MVP artifacts.

## Mobile

- Home now reflects the real active queue state instead of always showing "No active queue yet".
- My Queue disables cancellation once an entry reaches a backend non-cancellable status.
- QR Check-in now shows loading, retry, and no-active-queue states instead of opening the scanner with no queue context.
- Customer shell routing file was formatted for maintainability.
- Removed the obsolete merchant dashboard placeholder screen from earlier phases.

## Verification

- `flutter analyze` passed.
- `flutter test` passed: 3 tests.
- `npm.cmd run build` passed.
- `npm.cmd test` passed: 4 suites, 8 tests.
