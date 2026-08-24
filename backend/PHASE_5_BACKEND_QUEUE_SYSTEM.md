# QueueWise - Phase 5 Backend Queue System

## Implemented

- `GET /api/businesses/:businessId/queue`
- `GET /api/queues/:queueId/status`
- `POST /api/merchant/businesses/:businessId/queues/open`
- `POST /api/merchant/queues/:queueId/close`
- `POST /api/merchant/queues/:queueId/pause`
- `POST /api/queues/:queueId/join`
- `GET /api/queue-entries/me/active`
- `GET /api/queue-entries/:entryId/status`
- `POST /api/queue-entries/:entryId/cancel`
- `POST /api/merchant/queues/:queueId/walk-in`

## Business Rules Covered

- Queue must be open before customer or walk-in join.
- Online customer cannot have more than one active queue entry for the same business queue session.
- Queue number generation increments `Queue.nextSequence` inside a Prisma transaction.
- Queue number and sequence uniqueness are protected by database unique constraints.
- Customer can only cancel their own queue entry.
- Customer can cancel only `WAITING` or `CHECKED_IN` entries.
- Merchant queue actions require merchant role and ownership of the queue/business.
- People ahead and estimated waiting time are calculated from active queue entries.

## Notes

- Real-time event emission comes in Phase 8.
- Merchant call/start/complete/no-show controls come in Phase 6.
- QR check-in comes in Phase 7.