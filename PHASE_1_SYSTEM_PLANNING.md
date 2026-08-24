# QueueWise - Phase 1 System Planning

This document captures the initial architecture and planning for QueueWise before implementation. No application source code is included in Phase 1.

## 1. Overall System Architecture

QueueWise is a mobile-first queue management platform with three main actors:

- Customer: discovers businesses, joins queues, checks in with QR, receives live updates and notifications.
- Merchant: manages business profile, queue sessions, walk-in entries, service progress, and queue statistics.
- Admin: future operational role for oversight and support.

High-level architecture:

```text
Flutter Mobile App
  | REST API over HTTPS
  | WebSocket / Socket.IO
  | Firebase Cloud Messaging
  v
NestJS Backend API
  | Prisma ORM
  | PostgreSQL
  | Firebase Admin SDK
  v
PostgreSQL Database
```

Core responsibilities:

- Flutter handles presentation, local auth state, secure token storage, QR scanning, and live queue UI.
- NestJS owns authentication, authorization, business data, queue operations, check-in validation, WebSocket events, and notification triggers.
- PostgreSQL is the single source of truth for all queue state.
- Prisma provides typed database access and transactions for critical queue operations.
- Socket.IO synchronizes queue changes between merchant and customer clients.
- FCM delivers push notifications when users are near their turn or called.

## 2. Flutter Architecture

Frontend architecture uses feature-first structure with Clean Architecture principles.

Layers per feature:

```text
presentation
  Screens, widgets, controllers/providers, UI state.

domain
  Entities, repository contracts, use cases, domain validation.

data
  DTOs, API clients, repository implementations, local data sources.
```

State management:

- Riverpod for dependency injection, async state, and feature controllers.
- `AsyncValue` for loading, data, and error states.
- Feature-level providers to keep dependencies scoped.

Routing:

- GoRouter for declarative navigation.
- Auth-aware route redirects based on token/session state.
- Role-aware routing for customer and merchant flows.

Networking:

- Dio for REST API calls.
- Interceptors attach access tokens, handle common errors, and refresh tokens when needed.
- API base URL comes from environment configuration.

Storage:

- Flutter Secure Storage for access and refresh tokens.
- SharedPreferences only for non-sensitive preferences such as onboarding completion.

Realtime:

- Socket.IO client connects after authentication.
- Customer subscribes to active queue entry and business queue room.
- Merchant subscribes to owned business queue rooms.

## 3. NestJS Architecture

Backend uses modular NestJS architecture.

Primary modules:

- `auth`: register, login, refresh, logout, JWT strategies, password hashing.
- `users`: user profile and account data.
- `merchants`: merchant account and merchant-specific operations.
- `businesses`: business discovery, business detail, categories, services.
- `queues`: queue sessions, open/close/pause status, queue overview.
- `queue-entries`: join, cancel, check-in, call, start, complete, no-show.
- `notifications`: device tokens and FCM dispatch.
- `analytics`: MVP statistics and history summaries.
- `websocket`: Socket.IO gateway and room/event handling.
- `prisma`: Prisma service and database access.
- `common`: guards, decorators, filters, pipes, utilities.

Backend principles:

- Controllers expose REST endpoints.
- Services contain business logic.
- Prisma is accessed through services, not controllers.
- Critical queue mutations run inside Prisma transactions.
- Guards enforce authentication and role-based access control.
- WebSocket events are emitted only after database commits succeed.

## 4. Database ERD

Core entity relationship overview:

```text
User
  | 1..many
  v
QueueEntry

User
  | 1..many
  v
DeviceToken

User
  | 0..1
  v
Merchant

Merchant
  | 1..many
  v
Business

BusinessCategory
  | 1..many
  v
Business

Business
  | 1..many
  v
Service

Business
  | 1..many
  v
Queue

Queue
  | 1..many
  v
QueueEntry

QueueEntry
  | 0..many
  v
Notification

QueueEntry
  | 0..1
  v
QueueHistory
```

Main table responsibilities:

- `User`: authentication identity and profile.
- `Merchant`: merchant profile linked to a user account.
- `Business`: public business profile and location.
- `BusinessCategory`: categories such as Barbershop, Salon, Clinic.
- `Service`: services offered by a business and optional average duration.
- `Queue`: queue session for a business, usually per day or active operating session.
- `QueueEntry`: one customer or walk-in entry inside a queue session.
- `DeviceToken`: FCM tokens for push notifications.
- `Notification`: notification records for audit and spam prevention.
- `QueueHistory`: completed/cancelled/no-show queue summary for customer history and analytics.

## 5. Prisma Data Model Proposal

Proposed enums:

```text
Role: CUSTOMER, MERCHANT, ADMIN
QueueStatus: OPEN, PAUSED, CLOSED
QueueEntrySource: ONLINE, WALK_IN
QueueEntryStatus: WAITING, CHECKED_IN, CALLED, SERVING, COMPLETED, CANCELLED, NO_SHOW
NotificationType: QUEUE_GETTING_CLOSE, CUSTOMER_CALLED, QUEUE_UPDATED
```

Important model fields:

```text
User
- id
- fullName
- email
- phoneNumber
- passwordHash
- role
- createdAt
- updatedAt

Merchant
- id
- userId
- displayName
- createdAt
- updatedAt

BusinessCategory
- id
- name
- slug

Business
- id
- merchantId
- categoryId
- name
- description
- imageUrl
- address
- latitude
- longitude
- openingHours
- rating
- qrCodeToken
- createdAt
- updatedAt

Service
- id
- businessId
- name
- estimatedDurationMinutes
- price

Queue
- id
- businessId
- status
- currentNumber
- nextSequence
- averageServiceTimeMinutes
- openedAt
- closedAt
- createdAt
- updatedAt

QueueEntry
- id
- queueId
- userId nullable for walk-in
- queueNumber
- sequenceNumber
- source
- status
- joinedAt
- checkedInAt
- calledAt
- serviceStartedAt
- completedAt
- cancelledAt
- noShowAt

DeviceToken
- id
- userId
- token
- platform
- createdAt
- updatedAt

Notification
- id
- userId
- queueEntryId
- type
- title
- body
- sentAt

QueueHistory
- id
- userId nullable for walk-in
- businessId
- queueEntryId
- queueNumber
- finalStatus
- joinedAt
- completedAt
- waitingMinutes
- serviceMinutes
```

Critical constraints:

- Unique user email.
- Unique business QR token.
- Unique queue number per queue session: `(queueId, queueNumber)`.
- Unique sequence number per queue session: `(queueId, sequenceNumber)`.
- One active online queue entry per user per queue session where status is active.

Because PostgreSQL partial unique indexes are useful for active-entry enforcement, this may require a Prisma migration SQL addition after schema generation.

## 6. Queue Lifecycle

Normal flow:

```text
WAITING -> CHECKED_IN -> CALLED -> SERVING -> COMPLETED
```

Cancel flow:

```text
WAITING -> CANCELLED
CHECKED_IN -> CANCELLED
```

No-show flow:

```text
CALLED -> NO_SHOW
```

Merchant-controlled flow:

- `Call Next` chooses the next eligible checked-in customer first, then waiting customer depending on business rules.
- `Start Service` changes `CALLED` to `SERVING`.
- `Complete Service` changes `SERVING` to `COMPLETED` and updates average service time.
- `Skip` can move an entry out of the immediate call order without deleting history. MVP can implement skip as `NO_SHOW` or add a later `SKIPPED` status if product rules require it.

## 7. Queue Algorithm

Join queue algorithm:

1. Validate queue is open.
2. Validate online customer does not already have an active entry in the same queue.
3. Start database transaction.
4. Lock or atomically update the queue row.
5. Read and increment `nextSequence`.
6. Generate queue number from prefix and sequence, for example `A016`.
7. Create `QueueEntry` with `WAITING` status and source `ONLINE` or `WALK_IN`.
8. Commit transaction.
9. Emit `queue.joined` and `queue.updated` events.
10. Recalculate people ahead and estimated waiting time for affected customers.

People ahead calculation:

```text
People Ahead = active entries before this entry by sequence number
```

Active statuses for count:

```text
WAITING, CHECKED_IN, CALLED, SERVING
```

Estimated waiting time:

```text
Estimated Waiting Time = People Ahead * Queue.averageServiceTimeMinutes
```

Average service time:

```text
Average = completed service durations for the business or queue session
```

MVP fallback:

```text
Use default 10 minutes when there is not enough history.
```

Concurrency rule:

- Queue number generation must happen in a transaction.
- `nextSequence` is incremented atomically.
- Database unique constraints protect against duplicate numbers even under race conditions.

## 8. Authentication Flow

Register:

1. User submits full name, email, phone number, password, role.
2. Backend validates input.
3. Backend hashes password with bcrypt.
4. Backend creates user.
5. Backend returns access token and refresh token.
6. Flutter stores tokens in secure storage.

Login:

1. User submits email and password.
2. Backend verifies password.
3. Backend issues JWT access token and refresh token.
4. Flutter stores tokens securely.
5. App routes user based on role.

Refresh:

1. Dio receives 401 from protected API.
2. Flutter calls `/auth/refresh` with refresh token.
3. Backend validates refresh token.
4. Backend returns new access token.
5. Original API request retries once.

Logout:

1. Flutter calls `/auth/logout`.
2. Backend invalidates refresh token or token session.
3. Flutter clears secure storage.
4. Socket disconnects.
5. User returns to login.

Authorization:

- `CUSTOMER` routes access customer APIs.
- `MERCHANT` routes access merchant APIs for owned businesses only.
- `ADMIN` reserved for future platform-level management.

## 9. Real-Time WebSocket Flow

Connection:

1. Flutter authenticates through REST.
2. Flutter opens Socket.IO connection with access token.
3. Backend validates JWT during socket handshake.
4. Backend joins socket to user room and role-specific rooms.

Rooms:

```text
user:{userId}
business:{businessId}
queue:{queueId}
merchant:{merchantId}
```

Events:

```text
queue.joined
queue.updated
queue.called
queue.serving
queue.completed
queue.cancelled
queue.no_show
```

Merchant action example:

```text
Merchant completes A012
-> Backend transaction marks A012 COMPLETED
-> Backend recalculates queue status
-> Backend emits queue.completed and queue.updated to queue room
-> Customer apps update Now Serving, People Ahead, Estimated Time
```

Reliability:

- WebSocket updates are for fast synchronization.
- REST remains the recovery path after reconnect.
- On socket reconnect, Flutter fetches latest queue status from REST.

## 10. Notification Flow

Notification triggers:

- 3 customers ahead.
- 2 customers ahead.
- 1 customer ahead.
- Customer called.
- Estimated time materially changes.

Flow:

1. Queue state changes after a transaction.
2. Backend calculates affected active queue entries.
3. Backend checks notification history to avoid duplicate spam.
4. Backend loads device tokens for target users.
5. Backend sends FCM message through Firebase Admin SDK.
6. Backend stores notification record.
7. Flutter displays notification and routes user to Active Queue screen when tapped.

Spam prevention:

- Only one notification per threshold per queue entry.
- Do not resend the same threshold notification unless business rules later require reminders.

## 11. Complete Project Folder Structure

Target monorepo layout:

```text
Project/
  docs/
    phase-1-system-planning.md
    database-erd.md
    api-and-realtime.md
    development-roadmap.md

  mobile/
    lib/
      core/
        constants/
        network/
        routing/
        theme/
        utils/
      features/
        auth/
          data/
          domain/
          presentation/
        home/
          data/
          domain/
          presentation/
        business/
          data/
          domain/
          presentation/
        queue/
          data/
          domain/
          presentation/
        scanner/
          data/
          domain/
          presentation/
        history/
          data/
          domain/
          presentation/
        notification/
          data/
          domain/
          presentation/
        profile/
          data/
          domain/
          presentation/
        merchant/
          data/
          domain/
          presentation/
      shared/
        widgets/
        models/
        extensions/
      main.dart
    test/

  backend/
    src/
      auth/
      users/
      businesses/
      queues/
      queue-entries/
      merchants/
      notifications/
      analytics/
      websocket/
      common/
        decorators/
        filters/
        guards/
        pipes/
      prisma/
      app.module.ts
      main.ts
    prisma/
      schema.prisma
      migrations/
      seed.ts
    test/
```

During Phase 2, the actual Flutter and NestJS projects will be generated inside `mobile/` and `backend/`.

## 12. Development Roadmap

Phase 1 - System Planning:

- Complete architecture documentation.
- Define ERD and data model proposal.
- Define queue algorithm and flows.
- Define folder structure and roadmap.

Phase 2 - Project Setup:

- Create Flutter project in `mobile/`.
- Create NestJS project in `backend/`.
- Configure Prisma, PostgreSQL env, base modules, linting, formatting.
- Add Firebase configuration placeholders.

Phase 3 - Authentication:

- Implement backend auth with JWT, refresh token, bcrypt, RBAC.
- Implement Flutter login/register flows and secure token storage.

Phase 4 - Business Discovery:

- Implement customer Home, Explore, Business Detail.
- Add business APIs and mock/seed data.

Phase 5 - Queue System:

- Implement queue open/join/cancel/walk-in.
- Add concurrency-safe queue number generation.
- Add people ahead and estimated waiting time.

Phase 6 - Merchant Dashboard:

- Implement merchant queue dashboard and queue management actions.

Phase 7 - QR Check-in:

- Generate merchant QR code token.
- Implement scanner and check-in validation.

Phase 8 - Real-Time Queue:

- Implement Socket.IO gateway and mobile socket client.
- Synchronize queue state without manual refresh.

Phase 9 - Notifications:

- Implement FCM device tokens and queue-triggered push notifications.

Phase 10 - History and Analytics:

- Implement customer queue history.
- Implement merchant MVP analytics.

Phase 11 - Testing:

- Add backend API and queue algorithm tests.
- Add Flutter unit and widget tests.
- Cover required edge cases.
```
