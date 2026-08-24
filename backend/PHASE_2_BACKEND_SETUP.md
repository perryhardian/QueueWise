# QueueWise - Phase 2 Backend Setup

## Created

- NestJS backend scaffold in `backend/`.
- Prisma initialized with PostgreSQL datasource configuration.
- Environment configuration through `@nestjs/config`.
- Runtime validation for required environment variables.
- Global validation pipe, CORS, and `/api` prefix.
- Initial Prisma data model for QueueWise MVP entities.
- Placeholder NestJS modules for Phase 3 and later feature work.

## Dependencies Added

Runtime:

- `@nestjs/config`: environment variable loading and typed config access.
- `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`: JWT auth foundation for Phase 3.
- `bcrypt`: password hashing for Phase 3.
- `class-validator`, `class-transformer`: request DTO and env validation.
- `@prisma/client`: generated Prisma database client.
- `@nestjs/websockets`, `@nestjs/platform-socket.io`, `socket.io`: realtime queue events for Phase 8.
- `firebase-admin`: FCM push notification support for Phase 9.

Development:

- `prisma`: Prisma CLI.
- `@types/passport-jwt`, `@types/bcrypt`: TypeScript type definitions.

## Required Local Setup

Create a PostgreSQL database named `queuewise`, or update `DATABASE_URL` in `.env` to match your local database.

Default development URL:

```text
postgresql://postgres:postgres@localhost:5432/queuewise?schema=public
```

## Useful Commands

```text
npm run start:dev
npm run build
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Notes

- The backend is configured but business features are intentionally not implemented yet.
- Authentication implementation starts in Phase 3.
- Queue logic implementation starts in Phase 5.
- WebSocket implementation starts in Phase 8.
- Notification implementation starts in Phase 9.
