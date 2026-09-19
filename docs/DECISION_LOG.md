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
