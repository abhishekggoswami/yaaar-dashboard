# Current State

Last updated: 2026-09-19

## Implemented in TASK-001

- Next.js 16 App Router application with React and strict TypeScript configuration.
- Tailwind CSS setup and shadcn/ui-compatible conventions.
- Shared navigation shell and working placeholder pages at `/admin`, `/analyst`, and `/customer`.
- Environment template with non-secret placeholder values.
- Foundational product, architecture, roadmap, and decision documentation.

## Completed in TASK-002 / correction

- Documentation-only B2B2C identity, tenant, membership, customer relationship, platform-control-plane, lifecycle, authorization, session, audit, and security baseline.
- Explicit non-marketplace and tenant-context-first customer experience rules.
- Configuration-driven, one-shared-codebase RA environments; shared branded landing templates; future subdomain/custom-domain tenant-context direction.
- Existing-customer onboarding and tenant-scoped research-call distribution requirements.
- Auth.js, Clerk, and Supabase Auth evaluation with provisional direction and human verification requirements.
- Conceptual TASK-003 entities only: Identity/User, PlatformRole, Tenant, TenantMembership, CustomerProfile/CustomerRelationship, TenantBranding, TenantDomain, TenantConfiguration, LandingPageConfiguration, and AuditEvent.

## Explicitly not implemented

- Authentication/login/signup, auth provider SDKs, OAuth, OTP, MFA, password storage, production RBAC/audit, and real authorization guards.
- Prisma business schema, migrations, hosted PostgreSQL, tenant provisioning UI, page builder, domain infrastructure, customer imports, or real customer data.
- Customer management, KYC, subscriptions, payments, research calls, WhatsApp, market-data integrations, baskets, and history/performance views.

## Verification

Completed on 2026-09-19:

- Dependency installation: `npm install` followed by `npm ci` to recover from an interrupted local installer.
- Type check: passed with `node node_modules/typescript/bin/tsc --noEmit`.
- Lint: passed with `node node_modules/eslint/bin/eslint.js .`.
- Production build: passed with `node node_modules/next/dist/bin/next build`.
- Tests: no test command or test files are configured for this foundation.

TASK-002/correction verification completed on 2026-09-19 after documentation changes:

- Lint: `npm run lint` cannot use the pre-existing missing Windows ESLint shim; `node node_modules/eslint/bin/eslint.js .` passed.
- Production build: `node node_modules/next/dist/bin/next build` passed, including compilation, TypeScript, and static route generation.
- `git diff --check` passed. No source or dependency changes are needed for this architecture-only task.

The local npm installer stalled while creating Windows command shims after package extraction. The installed project-local TypeScript, ESLint, and Next.js executables were used directly for final verification; all required checks completed successfully. A normal clean `npm install` on a development machine recreates the standard npm script shims.
