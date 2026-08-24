# Phase 6 Backend - Merchant Queue Dashboard

## Added

- Merchant dashboard endpoint for a queue.
- Merchant queue entry list endpoint.
- Merchant queue control actions:
  - Call next customer.
  - Call a specific customer.
  - Start service.
  - Complete service.
  - Mark no-show.
  - Skip customer, mapped to no-show because the database status enum has no separate skipped state.
- Queue statistics for merchant operations:
  - Waiting customer count.
  - Checked-in customer count.
  - Completed customer count.
  - Current serving queue number.
  - Average service time.
  - Estimated waiting time.
- Average service time recalculation after completed service entries.
- Merchant ownership checks for all queue control operations.

## Backend Routes

- `GET /api/merchant/queues/:queueId/dashboard`
- `GET /api/merchant/queues/:queueId/entries`
- `POST /api/merchant/queues/:queueId/call-next`
- `POST /api/merchant/queue-entries/:entryId/call`
- `POST /api/merchant/queue-entries/:entryId/start`
- `POST /api/merchant/queue-entries/:entryId/complete`
- `POST /api/merchant/queue-entries/:entryId/no-show`
- `POST /api/merchant/queue-entries/:entryId/skip`

## Verification

- `npm run build`
- `npm test`