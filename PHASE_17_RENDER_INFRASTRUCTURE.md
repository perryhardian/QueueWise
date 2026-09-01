# Phase 17 - Render Production Infrastructure

Added deployable infrastructure-as-code for the first QueueWise production
environment.

## Provider Decision

Render is the default production provider for the MVP because it supports:

- A Singapore region close to the initial Indonesia user base.
- Managed PostgreSQL and private service-to-database networking.
- Public HTTPS and WebSocket traffic on the same web service.
- Pre-deploy database migrations and HTTP readiness checks.
- Blueprint-based infrastructure configuration from the repository.
- Automatic deployment only after repository checks pass.

## Blueprint

The root `render.yaml` defines:

- A Node.js 22 QueueWise API using the minimum paid web-service plan.
- A PostgreSQL 16 database using the minimum paid database plan.
- Singapore placement for both resources.
- Private-only database access through a Blueprint connection reference.
- Prisma migrations before each release and readiness checks before promotion.
- Generated access and refresh secrets that remain inside Render.
- Prompted Firebase Admin values that are never committed to Git.

## Safety Boundaries

The Blueprint does not create resources by itself. A Render account owner must
connect the repository, review the billable plans, provide the Firebase values,
and approve resource creation. Android signing keys, Maps keys, Firebase client
files, and production secrets remain outside version control.

## Remaining External Gates

- Approve and provision the Blueprint in Render.
- Confirm the initial migration, readiness check, and production smoke test.
- Configure the deployed HTTPS URLs in the mobile release environment.
- Configure Firebase client files, Google Maps restrictions, and Android
  signing.
- Build the signed app bundle and complete two-device acceptance testing.
