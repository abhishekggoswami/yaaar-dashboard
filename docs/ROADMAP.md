# Roadmap

## Completed

- TASK-001: Application foundation, placeholder role routes, shared shell, and project documentation.
- TASK-002 and TASK-002-CORRECTION: Identity, B2B2C tenant, authorization, security, and configuration-driven provisioning architecture documented; no production feature, provider, schema, or migration implemented.

## Next candidate work

1. Review and approve TASK-002 decisions: provider due diligence, tenant provisioning/owner verification, customer onboarding/import/claiming, branding/content, domains, support access, and retention.
2. In TASK-003 only after review, model the minimum approved identity, tenant, membership, customer relationship, configuration/domain, and audit concepts in PostgreSQL/Prisma.
3. Select and implement authentication/session and server authorization only after the provider/session/security decisions are approved.
4. Add scoped guards and cross-tenant/customer negative tests with the first protected data path.
5. Prioritize one validated business module at a time; do not infer marketplace behavior or per-RA source forks.

## Deferred modules

Customer management, KYC, service/subscription plans, payments, research calls, WhatsApp notifications, baskets, and past-performance/history views remain deferred.
