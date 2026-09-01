# Phase 16 - Production Rollout Tooling

Added provider-neutral automation for verifying a deployed QueueWise backend
before mobile release promotion.

## Deployment Verifier

- Requires explicit public HTTPS API and Socket.IO URLs.
- Checks backend liveness at `/health` relative to the API base URL.
- Confirms database readiness at `/health/ready`.
- Confirms that the public proxy supports an Engine.IO v4 polling handshake.
- Uses bounded request timeouts and fails on redirects or malformed responses.
- Does not require or print production credentials.

## Automation

- Added focused Node.js tests for configuration and endpoint failure modes.
- Added the verifier tests to the required backend CI job.
- Added a manually triggered `Production smoke test` GitHub Actions workflow.
- Documented local and GitHub-based verification in the deployment runbook.

## External Rollout Gates

- Provision the production PostgreSQL database and container runtime.
- Configure production domains, secrets, and Firebase applications.
- Run database migrations and deploy the backend runtime image.
- Run the production smoke workflow with the public deployment URLs.
- Build the signed mobile release and finish the two-device acceptance checklist.

These gates require the selected provider accounts, production credentials,
Android signing material, and physical devices; they are intentionally not
stored or automated in the repository.
