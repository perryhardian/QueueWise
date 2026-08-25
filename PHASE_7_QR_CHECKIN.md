# Phase 7 - QR Check-in

## Added

- Customer QR check-in endpoint.
- Merchant-owned endpoint for retrieving a business check-in QR payload.
- Business QR token validation against the customer's active queue entry.
- Waiting-to-checked-in status transition with `checkedInAt`.
- Flutter QR scanner screen using `mobile_scanner`.
- Manual QR token fallback for emulator and local testing.
- My Queue check-in button and checked-in state feedback.

## Backend Route

- `POST /api/queue-entries/:entryId/check-in`
- `GET /api/merchant/businesses/:businessId/check-in-qr`

Body:

```json
{
  "qrCodeToken": "demo-fresh-cuts"
}
```

## Validation

- Customer must own the queue entry.
- Queue must be open.
- Entry must be `WAITING`.
- QR token must match the entry business `qrCodeToken`.

## Notes

- Existing seeded businesses already have stable demo QR tokens.
- Scanner accepts either a raw token or a URL containing `qrCodeToken` or `token`.
- The merchant endpoint returns a `queuewise://check-in?qrCodeToken=...` payload suitable for QR rendering.
