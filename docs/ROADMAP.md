# Roadmap

## Completed

- TASK-001: Application foundation, placeholder role routes, shared shell, and project documentation.
- TASK-002 and TASK-002-CORRECTION: Identity, B2B2C tenant, authorization, security, and configuration-driven provisioning architecture documented; no production feature, provider, schema, or migration implemented.
- TASK-003: Prisma/Neon development foundation, initial multi-tenant schema/migration, server-only Prisma client, tenant-isolation constraint review, and database handoff documentation.

## Next candidate work

1. Review the TASK-003 schema, migration, provider/session decision, tenant-owner process, customer onboarding, domain, support, and retention decisions.
2. Define and implement authentication only through separately specified TASK-004, including provider selection, secure sessions, and server-side authorization integration.
3. Add scoped guards and cross-tenant/customer negative tests with the first protected data path after authentication work is reviewed.
4. Prioritize one validated business module at a time; do not infer marketplace behavior or per-RA source forks.

## Deferred modules

Customer management, KYC, service/subscription plans, payments, research calls, WhatsApp notifications, baskets, and past-performance/history views remain deferred.
