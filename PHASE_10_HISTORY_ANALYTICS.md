# Phase 10 - History and Analytics

Implemented customer queue history and merchant analytics.

## Backend

- Creates one `QueueHistory` record when a queue entry becomes `COMPLETED`, `CANCELLED`, or `NO_SHOW`.
- Supports nullable `userId` for walk-in entries.
- Records terminal timestamp in `completedAt`, plus waiting and service duration metrics.
- Adds `GET /api/queue-history/me` for customer history.
- Adds `GET /api/merchant/businesses/:businessId/analytics` for merchant-owned 7-day analytics.

## Mobile

- Replaced the placeholder History screen with a typed Riverpod-backed history list.
- Added empty, loading, retry, status chip, and duration states for history.
- Added merchant dashboard analytics summary with served, no-show, average wait, average service, and 7-day bars.

## Notes

- The existing Prisma schema already included `QueueHistory`, so no migration was required.
- Analytics are scoped to the last 7 calendar days and protected by merchant business ownership.
