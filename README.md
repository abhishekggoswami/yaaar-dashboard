# FinTech SaaS Foundation

This repository is the initial foundation for a multi-tenant FinTech SaaS platform with separate platform-admin, research-analyst, and customer experiences.

## Stack

- Next.js App Router, React, and TypeScript with strict mode
- Tailwind CSS
- shadcn/ui-compatible project conventions (`components.json`, `src/components/ui`, and `src/lib/utils.ts`)
- PostgreSQL and Prisma selected for a future data layer

## Getting started

1. Copy `.env.example` to `.env` and set only local, non-production values.
2. Install dependencies with `npm install`.
3. Start development with `npm run dev`.
4. Open `http://localhost:3000`, then visit `/admin`, `/analyst`, or `/customer`.

## Quality checks

Run these before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
```

## Scope status

TASK-001 provides route and UI-shell wiring only. It intentionally does not include authentication, authorization, tenant data models, KYC, payments, notifications, market data, subscriptions, research calls, or real data.

See `docs/` for product context, architecture, current state, roadmap, and decisions.
