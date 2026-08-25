# Phase 8 - Real-Time Queue

## Added

- Authenticated Socket.IO gateway using the existing JWT access token.
- Socket rooms for `user:{userId}`, `queue:{queueId}`, `business:{businessId}`, and `role:{role}`.
- Queue subscription messages:
  - `queue.subscribe`
  - `queue.unsubscribe`
  - `business.subscribe`
- Queue event publisher service for backend queue mutations.
- Realtime invalidation in Flutter for My Queue and Merchant Dashboard.

## Backend Events

- `queue.joined`
- `queue.checked_in`
- `queue.called`
- `queue.serving`
- `queue.completed`
- `queue.cancelled`
- `queue.no_show`
- `queue.updated`

## Mobile Behavior

- Mobile connects to `SOCKET_URL` with the saved access token.
- My Queue subscribes to the active queue and refreshes its REST snapshot after queue events.
- Merchant Dashboard subscribes to the selected queue and refreshes its REST snapshot after queue events.

## Notes

- Socket events intentionally carry only lightweight identifiers.
- REST remains the source of truth after reconnect or missed events.
