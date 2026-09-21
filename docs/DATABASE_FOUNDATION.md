# PostgreSQL and Prisma multi-tenant foundation

**Status:** TASK-003 development-database foundation. This document describes the committed schema and migration workflow; it does not implement authentication, authorization enforcement, or business modules.

## Stack and connection strategy

- **Database:** Neon PostgreSQL development project only. It is not a production or final compliance/data-residency decision.
- **ORM:** Prisma ORM `7.10.0`, selected because its stable Node requirement (`^20.19 || ^22.12 || >=24`) supports the project’s Node `22.17.1`. Prisma 8 was not selected because the currently published release candidate requires Node `22.18+`.
- **Runtime connection:** `DATABASE_URL` is the Neon pooled URL consumed only by the server-side `PrismaPg` driver adapter.
- **CLI/migrations:** `DIRECT_DATABASE_URL` is the Neon direct/unpooled URL consumed by `prisma.config.ts`. Neon/Prisma’s current serverless guidance uses the direct endpoint for migration/CLI work and the pooled endpoint for application runtime connections.

Both variables are local environment values only. `.env.local` is ignored; `.env.example` contains empty placeholders only. Never put a connection string, credential, token, or real data into source, migration SQL, documentation, logs, or Git.

`prisma.config.ts` loads ignored `.env.local` for Prisma CLI. Next.js loads `.env.local` at runtime. The Prisma schema deliberately does not contain a URL, which is the Prisma 7 configuration pattern.

## Prisma layout and client

- `prisma/schema.prisma`: schema source of truth.
- `prisma/migrations/`: committed, reproducible migration history.
- `prisma.config.ts`: Prisma 7 schema/migration path and direct CLI connection configuration.
- `src/lib/prisma.ts`: server-only Prisma singleton. It uses `@prisma/adapter-pg` with `pg`, reads only `DATABASE_URL`, and caches the client on `globalThis` outside production to avoid Next.js development hot-reload connection churn.
- `src/generated/prisma/`: generated client output, ignored and recreated by `prisma generate` (also configured as `postinstall`). Database code must never be imported into client components.

## Model responsibilities and scope

| Model | Scope and responsibility |
| --- | --- |
| `Identity` | Global, application-owned human identity lifecycle; no passwords, sessions, tokens, provider credentials, or email/account-merge policy. |
| `PlatformRoleGrant` | Global authority grant containing `PLATFORM_ADMIN`, explicitly separate from tenant roles. |
| `Tenant` | One individual RA or RA organization; the private B2B2C ownership boundary. |
| `TenantMembership` | RA-side identity-to-tenant relationship and tenant-local role/status. |
| `CustomerProfile` | Tenant-owned customer profile linked to one global identity. |
| `CustomerRelationship` | The single chosen name for customer relationship/access lifecycle. It extends a profile with invitation/activation/revocation and future onboarding-source context. |
| `TenantBranding` | Optional one-to-one controlled branding boundary; no arbitrary CSS/HTML/JS or upload implementation. |
| `TenantConfiguration` | Optional one-to-one configuration/version boundary; no speculative feature flags. |
| `LandingPageConfiguration` | Optional one-to-one shared-template selection boundary; no page-builder/script content. |
| `TenantDomain` | Tenant-owned normalized hostname mapping and verification/lifecycle metadata; no DNS/TLS/routing implementation and no authorization effect. |
| `AuditEvent` | Append-oriented security/business audit foundation with safe JSON metadata only. |

The schema does not encode RA discovery, marketplace behavior, per-tenant applications, custom dashboard source forks, authentication provider dependencies, KYC, subscriptions, payments, calls, messaging, or market data.

## Tenant ownership and isolation design

`TenantMembership`, `CustomerProfile`, `CustomerRelationship`, `TenantBranding`, `TenantConfiguration`, `LandingPageConfiguration`, and `TenantDomain` all hold direct `tenantId` ownership where applicable. `AuditEvent.tenantId` is nullable only for global platform events; it is direct whenever the event is tenant-scoped.

`CustomerRelationship` intentionally denormalizes `tenantId` and `identityId` alongside `customerProfileId`. Its composite foreign key references the same `CustomerProfile(id, tenantId, identityId)`, preventing a relationship from naming a profile belonging to another tenant or identity. This is security-motivated denormalization, not client authorization: all future server queries must still scope data by trusted actor/tenant context.

`PlatformRoleGrant` has no tenant ID. `TenantMembershipRole` contains analyst roles only and cannot represent `PLATFORM_ADMIN`.

## IDs, timestamps, normalization, constraints, and indexes

- IDs are application-generated opaque Prisma `cuid()` strings. They are stable and are not authorization credentials.
- Core models use `createdAt`; mutable records use `updatedAt`. Audit events have no `updatedAt` and are intended to be append-oriented.
- Tenant `slug` is globally unique. Future write paths must normalize to a documented machine-safe lowercase slug before persistence; no tenant-name source branching is permitted.
- `TenantDomain.hostname` is globally unique. Future write paths must lowercase, trim, remove any trailing dot, validate hostname syntax, and verify custom-domain ownership before treating it as active. Hostname resolution establishes tenant context only.
- Email is intentionally not stored yet. This avoids preselecting authentication provider/merge behavior. When email is added, the application must define canonical normalization and uniqueness/merge rules before migration.
- Important uniqueness: platform role `[identityId, role]`; membership `[tenantId, identityId]`; customer profile `[tenantId, identityId]`; one customer relationship per profile and per `[tenantId, identityId]`; one branding/configuration/landing configuration per tenant; globally unique tenant slug and domain hostname.
- Important access-path indexes: identity→tenant memberships, tenant/status memberships, tenant/status customer profiles and relationships, tenant/status domains, tenant/actor/target/outcome audit queries, plus tenant status/type indexes.

## Lifecycle and referential actions

Core records use lifecycle/status transitions rather than ordinary hard deletion. Disabling an identity, suspending/closing a tenant, revoking membership/relationship access, revoking sessions (future), and data deletion are distinct operations.

Foreign keys deliberately use `Restrict` for tenant, identity, profile, and audit references. A `PlatformRoleGrant` may keep a historical grant while its optional grantor reference becomes `NULL` via `SetNull`. No relation cascades deletion. In particular, audit events cannot be silently erased through identity or tenant deletion. Retention, deletion, legal hold, and regulatory obligations remain unresolved human decisions.

## Migration and development workflow

The initial migration is named `init_multi_tenant_foundation`. It must be reviewed as SQL before acceptance and is the reproducible development database change; do not use Neon’s SQL editor for ordinary schema changes.

Typical local workflow, with local secrets configured but never printed:

```text
prisma format
prisma validate
prisma migrate dev --name <descriptive_name>
prisma generate
prisma migrate status
```

Use the project-local Prisma CLI when normal npm command shims are available. This repository’s Windows environment has an existing npm shim issue; see `CURRENT_STATE.md` for the exact verification workaround. No seed script is included and no real customer, analyst, KYC, payment, or production data may be inserted.

## Schema-level security review

- `PLATFORM_ADMIN` is a global role grant and cannot be represented by tenant membership.
- Tenant membership, customer profile, customer relationship, tenant configuration/branding/domain, and tenant audit events have explicit tenant scope.
- Customer relationship composite foreign-key scope prevents mismatched tenant/profile/identity links.
- Tenant domain hostname uniqueness prevents ambiguous hostname mapping; verification/status means unverified custom domains must not be trusted.
- The schema cannot authorize a client request by itself. Client IDs, roles, and hostnames remain untrusted; TASK-004+ server-side guards must enforce the TASK-002 matrix.
- Safe audit metadata is JSON only for non-sensitive structured context; no credentials, tokens, session material, raw KYC, or raw request payloads belong there.

## Deferred decisions and non-goals

Still unresolved: initial tenant-owner verification/transfer; email/provider identity mapping and account merge; customer import/claiming workflow; domain verification/DNS/TLS; branding/content validation; platform support approval/retention; final retention/deletion policy; provider/session strategy; and exact authorization guard implementation.

Not implemented: authentication, login/signup, sessions, RBAC guards, UI, tenant provisioning, invitations/imports, KYC, storage, plans, subscriptions, payments, research calls, WhatsApp, email provider, market data, custom-domain routing, landing-page UI/editor, or production infrastructure.
