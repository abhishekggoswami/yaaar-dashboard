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

PostgreSQL with Prisma is the intended persistence stack. The database is not initialized in TASK-001 because no validated domain model, tenancy policy, or migration requirement exists. `DATABASE_URL` is documented as an example configuration value only.

## Future security boundary

Authentication, authorization, and tenant isolation must be enforced server-side before protected product functionality is introduced. Frontend route visibility is never a security control. Secrets must remain in local environment files or a managed secret store and must not be committed.
