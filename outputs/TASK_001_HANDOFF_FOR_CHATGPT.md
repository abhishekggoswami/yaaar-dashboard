# TASK-001 Handoff for ChatGPT

## Purpose

Use this document to continue development from the completed TASK-001 foundation. Read it together with the repository documentation in `docs/` before starting TASK-002.

## Product context

This repository is for one multi-tenant FinTech SaaS platform with three future role-based experiences:

1. Platform Admin Dashboard for the internal platform team.
2. Research Analyst Dashboard for research-analyst tenants.
3. Customer Dashboard for end customers of research analysts.

Potential future modules include customer management, KYC, plans/subscriptions, payments, research calls, WhatsApp notifications, baskets, and past-performance/history views. They were not implemented in TASK-001.

## What TASK-001 implemented

- Next.js 16 App Router project using React and strict TypeScript.
- Tailwind CSS configuration.
- shadcn/ui-compatible structure:
  - `components.json`
  - `src/components/ui/` reserved for future UI primitives
  - `src/lib/utils.ts` with the standard `cn` helper
- Shared, presentational navigation shell.
- Working placeholder routes:
  - `/admin`
  - `/analyst`
  - `/customer`
- Documentation files:
  - `README.md`
  - `docs/PROJECT_CONTEXT.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CURRENT_STATE.md`
  - `docs/ROADMAP.md`
  - `docs/DECISION_LOG.md`
- `.env.example` with non-secret placeholders for `DATABASE_URL` and `NEXT_PUBLIC_APP_URL`.
- `package-lock.json` for npm dependency reproducibility.

## Current code map

| Area | Location | Responsibility |
| --- | --- | --- |
| Root layout and styles | `src/app/layout.tsx`, `src/app/globals.css` | Shared document metadata and Tailwind styles |
| Landing page | `src/app/page.tsx` | Links to the three placeholder dashboards |
| Role routes | `src/app/admin/page.tsx`, `src/app/analyst/page.tsx`, `src/app/customer/page.tsx` | Minimal role-specific placeholders |
| Shared shell | `src/components/app-shell.tsx` | Navigation and active-route presentation |
| Placeholder content | `src/components/dashboard-placeholder.tsx` | Reusable empty-state content |
| Shared utility | `src/lib/utils.ts` | shadcn-compatible Tailwind class merging |

## Important boundaries to preserve

- Do not treat frontend route visibility as authentication or authorization.
- Do not add production authentication until server-side identity, authorization, tenant-isolation, session, and audit requirements are defined.
- Do not create Prisma business models or migrations from assumptions. PostgreSQL and Prisma are selected for the future data layer only.
- Do not add KYC, payments, WhatsApp, market-data integrations, research calls, subscription logic, baskets, or performance/history features unless TASK-002 explicitly authorizes one of them.
- Keep secrets out of the repository. Use `.env` locally and keep only placeholders in `.env.example`.
- Keep dependencies minimal. Add a package only when the current task uses it.
- Preserve TypeScript strict mode and do not disable linting or type checking to obtain a passing build.

## Verification completed for TASK-001

- Type checking passed.
- ESLint passed.
- Next.js production build passed.
- The generated production output contains `/admin`, `/analyst`, and `/customer`.
- No test script or test files are configured yet.
- No real-secret patterns were found in source or documentation.

### Local environment note

In the implementation environment, npm stalled at the final Windows command-shim linking step after package extraction. The project-local TypeScript, ESLint, and Next.js executables were used directly to complete verification successfully. A normal clean `npm install` should recreate npm command shims on a developer machine.

## Recommended TASK-002 direction

Before implementing any business module, create a requirements-driven identity and tenancy design. The task should explicitly decide:

1. Identity provider and authentication approach.
2. Tenant ownership and membership model.
3. Platform-admin versus analyst-tenant versus customer authorization rules.
4. Server-side enforcement points and redirect/error behavior.
5. Session, audit, data-retention, and compliance expectations.
6. The minimum validated Prisma schema and migration strategy, if database work is authorized.

## Suggested prompt to begin TASK-002

> Implement TASK-002 only after reading `outputs/TASK_001_HANDOFF_FOR_CHATGPT.md` and all `docs/` files. Preserve TASK-001 constraints. First implement the explicitly approved identity and tenancy foundation; do not infer or implement business modules, KYC, payments, subscriptions, notifications, market data, research calls, baskets, or performance history.
