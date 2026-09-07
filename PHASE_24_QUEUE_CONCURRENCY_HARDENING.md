# Phase 24 - Queue Concurrency Hardening

This post-MVP hardening phase closes a queue-number allocation race discovered
during the production-readiness audit.

## Problem

Online and walk-in joins incremented `Queue.nextSequence` atomically, but built
the new queue number from the value read before that increment. Two concurrent
transactions could therefore read the same old value. PostgreSQL would safely
serialize their increments, yet the later transaction could still attempt the
same `sequenceNumber` and fail the queue's unique constraint.

## Implementation

- Derive the assigned sequence from the value returned by the atomic database
  increment (`updatedQueue.nextSequence - 1`).
- Apply the same allocation rule to online and walk-in entries so both sources
  share one strictly increasing sequence.
- Keep the existing unique constraints on `(queueId, queueNumber)` and
  `(queueId, sequenceNumber)` as database-level safety rails.
- Add regression tests that simulate a stale pre-increment read and a newer
  post-increment value for both join paths.

## Verification

Run from `backend/`:

```powershell
npm test -- --runInBand
npm run build
```

Validated on 2026-09-07:

- Targeted ESLint check passed for the modified service and regression tests.
- Backend: 10 suites and 29 tests passed.
- NestJS production build passed.
- Flutter: analysis passed with no issues; 33 tests passed.

The production deployment and Play acceptance gates in
`PHASE_23_PRODUCTION_RELEASE.md` remain owner-controlled and unchanged.
