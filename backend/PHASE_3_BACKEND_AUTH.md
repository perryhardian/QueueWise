# QueueWise - Phase 3 Backend Authentication

## Implemented

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/users/me`
- JWT access token strategy through Passport.
- Refresh token rotation with persisted `AuthSession` records.
- bcrypt password hashing.
- Customer and merchant registration.
- Role metadata and role guard foundation for protected merchant/customer APIs.

## Request Examples

Register customer:

```json
{
  "fullName": "QueueWise User",
  "email": "user@example.com",
  "phoneNumber": "+6281234567890",
  "password": "password123",
  "role": "CUSTOMER"
}
```

Register merchant:

```json
{
  "fullName": "Merchant Owner",
  "email": "owner@example.com",
  "password": "password123",
  "role": "MERCHANT",
  "merchantDisplayName": "ABC Barbershop"
}
```

Login:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Refresh/logout:

```json
{
  "refreshToken": "..."
}
```

## Database Note

Run the Prisma migration after PostgreSQL is available:

```text
npm run prisma:migrate -- --name phase_3_auth
```