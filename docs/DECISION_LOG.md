# Decision Log

## 2026-09-19 — Use Next.js App Router foundation

**Decision:** Use Next.js App Router, React, TypeScript strict mode, and Tailwind CSS.

**Reason:** This matches the requested stack and provides a well-supported route and component foundation.

## 2026-09-19 — Keep the role routes presentational

**Decision:** Add `/admin`, `/analyst`, and `/customer` as navigable placeholder routes without authentication or authorization.

**Reason:** The task requires visibly working routes while explicitly prohibiting production authentication and fake frontend-only security.

## 2026-09-19 — Select PostgreSQL and Prisma without data models

**Decision:** Record PostgreSQL/Prisma as the planned data stack but do not add schemas, migrations, or business models.

**Reason:** Tenant, identity, and product domains have not been specified. Inventing them now would create misleading implementation commitments.

## 2026-09-19 — Make shadcn/ui adoption ready, not mandatory

**Decision:** Add `components.json`, conventional aliases, a `components/ui` location, and the standard `cn` helper.

**Reason:** Future shadcn/ui components can be added without restructuring the project, while dependencies and UI surface remain minimal today.

## 2026-09-19 — Use B2B2C RA tenants, not an RA marketplace

**Decision:** Treat each individual RA or RA organization as a private tenant whose customers enter through that RA's tenant-branded context. Do not offer RA discovery, comparison, selection, switching, directory, recommendation, or marketplace checkout flows.

**Reason:** The platform sells software to RAs, not analyst discovery services to the public. This keeps customer data, onboarding, services, subscriptions, and eligible content tenant-scoped.

## 2026-09-19 — Separate identity, memberships, customer relationships, and platform authority

**Decision:** Use a global identity separate from tenant memberships, tenant customer relationships, and separately granted platform roles. Support multiple relationships technically, while keeping initial UX tenant-context-first.

**Reason:** This supports future legitimate overlap without authorizing cross-tenant/customer access or turning tenant membership into platform authority.

## 2026-09-19 — Provision tenants through a shared, configuration-driven control plane

**Decision:** Future Platform Admin operations provision, configure, activate, suspend, and audit RA tenants. One shared codebase/dashboard/landing engine uses trusted tenant context, controlled configuration, and tenant data.

**Reason:** Onboarding any number of RAs must not require per-RA source routes, copied dashboards/sites, source-condition branches, or new deployments.

## 2026-09-19 — Use controlled tenant branding and trusted domain context

**Decision:** Future tenant landing pages use shared templates plus controlled branding/configuration; unique subdomains and optional verified custom domains resolve tenant context but do not grant authorization.

**Reason:** This supports RA branding safely without a general executable page builder, host spoofing risk, or private-data exposure.

## 2026-09-19 — Preserve existing-customer onboarding and tenant-scoped distribution requirements

**Decision:** Design for approved invitation, manual onboarding, bulk import, activation, and account-claiming options for existing RA customers. Future calls are tenant-owned and distributed only to eligible customers of the same tenant.

**Reason:** RAs may join with established customers, and tenant boundaries must hold across onboarding, entitlements, notifications, and content delivery.

## 2026-09-19 — Establish a direct-ownership Prisma foundation

**Decision:** Use Prisma 7.10 with Neon PostgreSQL, direct tenant ownership on tenant-scoped models, opaque `cuid()` primary keys, lifecycle states, explicit constraints/indexes, and restrictive foreign keys. Select `CustomerRelationship` as the sole customer-relationship lifecycle model.

**Reason:** This creates the minimum reproducible foundation while making tenant scope and customer profile/identity consistency provable at the database level without introducing business workflows.

## 2026-09-19 — Separate pooled runtime and direct migration connections

**Decision:** Use a pooled `DATABASE_URL` for the server-side Prisma driver adapter and a direct `DIRECT_DATABASE_URL` for Prisma CLI/migrations.

**Reason:** This follows current Prisma guidance for serverless Neon PostgreSQL while keeping all connection values local, ignored, and out of schema/source documentation.

## 2026-09-19 — Preserve audit history through restrictive foreign keys

**Decision:** Do not use cascading deletion for core identity, tenant, profile, relationship, or audit references. Use lifecycle transitions and retain audit history; a grantor reference may be nulled without deleting the role grant.

**Reason:** Account disabling, tenant suspension, revocation, deletion, and retention are distinct. Cascades could silently erase security-relevant history before legal/retention policy is settled.
