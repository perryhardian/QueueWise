# QueueWise Google Play Data Safety Draft

This is an engineering inventory, not a final legal declaration. The account
owner must compare it with the deployed app, backend, Firebase configuration,
analytics/crash tooling, retention rules, subprocessors, and privacy policy
before submitting the Play Console form.

## Data observed in the current repository

| Data category | Current use | Handling indicated by the code |
| --- | --- | --- |
| Name | Account identity and merchant display | Sent to the QueueWise API and stored with the account. |
| Email address | Registration, login, and account identity | Sent to the QueueWise API and stored with the account. |
| Phone number | Optional account information | Sent only when supplied and stored with the account. |
| User IDs | Account, authentication, and queue ownership | Generated and stored by the QueueWise backend. |
| App interactions | Queue joins, check-ins, state changes, and history | Stored to provide queue operation, history, and merchant analytics. |
| Device or other IDs | Firebase Cloud Messaging registration token | Sent to the QueueWise API to deliver queue notifications. |
| Camera access | QR check-in | Processed on device by the scanner; the repository does not upload camera images. |
| Authentication data | Password and session credentials | Password is transmitted over the configured HTTPS API and stored as a hash; tokens are stored in platform secure storage. |

The mobile app does not currently request device location. Business coordinates
and addresses come from the QueueWise service; proximity query support exists in
the backend but is not currently connected to a mobile location permission.

## Declarations requiring owner confirmation

- Confirm whether each category is **collected**, **shared**, or both under the
  current Google Play definitions.
- Confirm that all production traffic is encrypted in transit.
- Define account deletion, data deletion request, and retention procedures.
- Review Firebase Cloud Messaging collection and subprocessors against the
  production Firebase setup.
- Review whether hosting, database, email, support, analytics, or crash-reporting
  providers add data practices not visible in this repository.
- Confirm whether data collection is required or optional for each feature.
- Confirm the target audience, ads declaration, content rating, and any account
  access instructions required for Play review.
- Have the final answers and privacy policy reviewed by the responsible owner or
  qualified counsel before submission.
