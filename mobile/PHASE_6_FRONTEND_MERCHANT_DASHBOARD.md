# Phase 6 Frontend - Merchant Queue Dashboard

## Added

- Real merchant dashboard screen replacing the Phase 3 placeholder.
- Merchant queue data layer using the protected backend API.
- Riverpod controller for loading, refreshing, selecting, and updating merchant queues.
- Active queue discovery for merchants.
- Dashboard summary UI:
  - Business and queue status.
  - Now serving number.
  - Waiting count.
  - Checked-in count.
  - Completed count.
  - Average service time.
- Queue list UI with customer queue number, source, status, and join time.
- Merchant action buttons:
  - Call next customer.
  - Call specific customer.
  - Start service.
  - Complete service.
  - Mark no-show.
  - Skip customer.
- Confirmation dialogs for skip and no-show actions.
- Refresh support from app bar and pull-to-refresh.

## UX Notes

- Actions are only enabled when valid for the queue entry status.
- Buttons use Material components with clear disabled/loading states.
- Layout uses safe area, scrollable content, and 8dp spacing rhythm for mobile usability.

## Verification

- `flutter analyze`
- `flutter test`