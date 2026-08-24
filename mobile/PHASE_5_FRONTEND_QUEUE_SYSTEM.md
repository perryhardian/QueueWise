# QueueWise - Phase 5 Frontend Queue System

## Implemented

- Queue API data source for join, active queue, entry status, and cancel.
- Queue repository and Riverpod `ActiveQueueController`.
- Business Detail `Join Queue` button now opens confirmation.
- Queue Confirmation screen with current waiting count and estimated wait.
- My Queue screen connected to backend active queue data.
- Active Queue display with large queue number, status, now serving, people ahead, and estimated time.
- Pull-to-refresh for active queue status.
- Cancel queue confirmation dialog and API integration.

## Backend Endpoints Used

- `POST /queues/:queueId/join`
- `GET /queue-entries/me/active`
- `GET /queue-entries/:entryId/status`
- `POST /queue-entries/:entryId/cancel`

## Notes

- Check-in is visible as a disabled action because QR check-in is Phase 7.
- Realtime updates are Phase 8; this phase uses manual refresh.