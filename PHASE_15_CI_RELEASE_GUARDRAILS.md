# Phase 15 - CI Release Guardrails

Added automated pull-request and main-branch checks for the QueueWise release
path.

## Backend

- Installs dependencies reproducibly with `npm ci` on Node.js 22.
- Generates the Prisma client, builds the NestJS application, and runs Jest.
- Builds the production Docker runtime target to catch container regressions.

## Mobile

- Uses the project's Flutter 3.44.1 stable toolchain.
- Restores cached Flutter and Dart packages.
- Runs static analysis and the Flutter test suite.

## Workflow Safety

- Runs for pull requests, pushes to `main`, and manual dispatches.
- Grants the workflow read-only repository access.
- Pins actions to immutable release commits and checks weekly for updates with
  Dependabot.
- Cancels superseded runs for the same branch or pull request.
- Applies job timeouts so stalled tooling cannot consume runners indefinitely.
- Does not load production secrets or deploy application resources.

## Required Branch Protection

After this workflow has run once on GitHub, require these checks before merging
to `main`:

- `Backend checks`
- `Mobile checks`
- `Backend container`

Production deployment remains a separate, manually approved step using the
inputs and acceptance checklist in `DEPLOYMENT.md`.
