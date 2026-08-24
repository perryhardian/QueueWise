# QueueWise - Phase 3 Frontend Authentication

## Implemented

- Login screen.
- Register screen with Customer/Merchant role selection.
- Auth API data source for register, login, logout, and `/users/me`.
- Secure token persistence using Flutter Secure Storage.
- Dio bearer-token interceptor.
- Refresh-token retry flow for `401` API responses.
- Riverpod `AuthController` for restore, login, register, and logout.
- GoRouter auth redirects.
- Customer and merchant post-login placeholder screens.

## API Endpoints Used

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /users/me`

## Notes

- Business discovery screens start in Phase 4.
- Queue joining and active queue screens start in Phase 5.
- Merchant dashboard implementation starts in Phase 6.