# Architecture

## Application structure

The application uses Next.js App Router with TypeScript strict mode.

- `src/app/`: routes, root layout, and global styles.
- `src/app/admin`, `src/app/analyst`, `src/app/customer`: role-experience route entry points.
- `src/components/`: reusable presentation components.
- `src/components/ui/`: reserved for future shadcn/ui components.
- `src/lib/`: shared utilities, including the shadcn-compatible `cn` class-name helper.
- `docs/`: living product and engineering documentation.

## Foundation decisions

The UI shell is shared and receives its active route explicitly. It is presentational only and contains no identity, role, tenant, or authorization logic.

PostgreSQL on Neon is the development persistence stack. TASK-003 configures Prisma 7 with a committed multi-tenant foundation schema/migration, an ignored generated client output, and a server-only `src/lib/prisma.ts` singleton. Runtime queries use the pooled `DATABASE_URL`; Prisma CLI/migrations use the direct `DIRECT_DATABASE_URL`. Both are local ignored environment configuration, never repository values.

## Identity, tenant, and B2B2C boundary

TASK-002 defines a B2B2C architecture without implementing authentication. A global identity is separate from a Research Analyst (RA) tenant, tenant membership, tenant-specific customer relationship, and global platform-role grant. One identity may technically participate in multiple tenant relationships, but the initial experience is tenant-context-first, not a marketplace or RA switching experience.

Each RA has a private tenant-branded environment. A shared dashboard and shared landing templates/components are resolved from trusted tenant context, controlled tenant branding/configuration, and tenant data. Onboarding RA #2, #50, or #500 must never require copying an application, coding RA-specific routes, source forks, or separate deployments. Future hostname mapping via unique subdomains and optional verified custom domains establishes tenant context, but never private-resource authorization.

Platform Admin is the future auditable control plane for tenant provisioning, activation, suspension, configuration, and carefully scoped support. `PLATFORM_ADMIN` remains separate from `ANALYST_OWNER`; membership cannot grant platform authority and platform authority is not blanket sensitive-data access.

Authentication, authorization, and tenant isolation must be enforced server-side before protected functionality. Server Components, Route Handlers, Server Actions, data access, object access, caches, exports, and background jobs all need scoped authorization. Middleware/proxy may be an early gate but never the sole control. Frontend visibility and client-supplied IDs/roles are not authorization.

Tenant-owned records need a direct `tenantId` or provable ownership. Tenant-specific calls must be server-authorized, tenant-owned, and distributed only to eligible customers of the same tenant. Secrets remain in local environment files or a managed secret store and must not be committed.

See `IDENTITY_AND_TENANCY.md`, `AUTHORIZATION_MATRIX.md`, `SECURITY_BOUNDARIES.md`, and `AUTH_PROVIDER_EVALUATION.md` for the detailed baseline.

See `DATABASE_FOUNDATION.md` for model scope, ownership, constraints, lifecycle/referential-action choices, migration workflow, and database security review.
