# Phase 9 - Notifications

## Added

- Device token registration endpoint.
- Firebase Admin push sender with safe no-op behavior when credentials are absent.
- Notification records for queue audit and spam prevention.
- Queue progress notifications when a customer has 3, 2, or 1 people ahead.
- Customer-called notification when a merchant calls a queue entry.
- Flutter device-token registration after restore, login, and register.

## Backend Route

- `POST /api/notifications/device-token`

Body:

```json
{
  "token": "fcm-device-token",
  "platform": "android"
}
```

## Trigger Rules

- `QUEUE_GETTING_CLOSE`: sent once per queue entry and threshold message.
- `CUSTOMER_CALLED`: sent once per queue entry when called.

## Notes

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` are optional in local development.
- If Firebase credentials are missing, notification rows are still stored but push sending is skipped.
- Flutter registration skips silently when native Firebase config is not present.
