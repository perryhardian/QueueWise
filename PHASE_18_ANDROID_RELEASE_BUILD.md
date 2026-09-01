# Phase 18 - Android Release Build

Added a reproducible, protected build path for the signed QueueWise Android App
Bundle.

## Release workflow

The manual `Android release` GitHub Actions workflow:

- Builds only from `main` and uses the protected `production` environment.
- Validates the requested semantic version and increasing Android build number.
- Runs analysis and the complete Flutter test suite before accessing release
  material.
- Validates HTTPS production URLs and checks that Firebase targets
  `com.queuewise.queuewise`.
- Reconstructs the ignored upload keystore, Firebase configuration, signing
  properties, and compile-time environment only inside the hosted runner.
- Produces a signed `.aab` and SHA-256 checksum as a 14-day workflow artifact.
- Removes all reconstructed release configuration even when the job fails.

The workflow deliberately does not publish to Google Play. Promotion remains a
separate human-controlled step after physical-device acceptance testing.

## GitHub production environment

Create an environment named `production`, restrict it to the `main` branch,
and configure these environment variables:

- `PRODUCTION_API_BASE_URL`, for example `https://api.example.com/api`
- `PRODUCTION_SOCKET_URL`, for example `https://api.example.com`
- `PRIVACY_POLICY_URL`, the active public QueueWise privacy policy
- `ACCOUNT_DELETION_URL`, the external deletion-request page required by Play

Configure these environment secrets:

- `ANDROID_UPLOAD_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `FIREBASE_ANDROID_CONFIG_BASE64`
- `GOOGLE_MAPS_API_KEY`

Use environment approval protection when the repository plan supports it. The
job cannot read environment secrets until the configured protection rules pass.

Generate the two base64 values locally in PowerShell without printing them:

```powershell
[Convert]::ToBase64String(
  [IO.File]::ReadAllBytes('mobile/android/app/upload-keystore.jks')
) | Set-Clipboard

[Convert]::ToBase64String(
  [IO.File]::ReadAllBytes('mobile/android/app/google-services.json')
) | Set-Clipboard
```

Paste each clipboard value into its matching GitHub environment secret. Never
commit the decoded files or `mobile/android/key.properties`.

## Producing a bundle

After this branch is merged and the production environment is configured:

1. Open **Actions > Android release > Run workflow**.
2. Select `main`.
3. Enter a version such as `1.0.0` and a build number greater than every prior
   Play Console upload.
4. Approve the production environment when prompted.
5. Download the `queuewise-android-<version>-<build>` artifact and verify the
   included checksum before installing or uploading the `.aab`.

## Reproducibility fix

The standard Gradle wrapper scripts and JAR are now versioned. A clean GitHub
checkout therefore has the same Gradle entry point as a developer workstation.

## Remaining external gates

- Provision and smoke-test the Render production environment.
- Configure the GitHub production environment values and secrets.
- Run the signed build from `main`.
- Complete two-device acceptance testing.
- Upload the approved bundle to a Play Console test track.
