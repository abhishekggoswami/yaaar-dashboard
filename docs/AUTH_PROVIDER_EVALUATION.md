# Authentication provider evaluation

**Status:** preliminary TASK-002 evaluation. No provider is integrated or selected contractually. Current pricing, plan limits, certifications, residency, terms, and feature availability require fresh verification before adoption.

The provider must support Next.js App Router securely while the application remains the authority for B2B2C tenant membership, customer relationships, tenant-context-first authorization, entitlements, and audit events.

| Option | Next.js / PostgreSQL fit | Tenant/RBAC posture | Sessions/MFA/audit | Operations and suitability |
| --- | --- | --- | --- | --- |
| Auth.js / application-managed | Strong Next.js alignment; app owns PostgreSQL mapping and data model. | Maximum flexibility; all tenancy/resource policy remains app responsibility. | Team selects/builds session hardening, recovery, MFA, logging/auditing, abuse controls. | Lowest vendor lock-in, highest engineering/security operation burden. |
| Clerk or comparable managed identity | Evaluate exact Next.js version/server helpers; app still owns PostgreSQL tenant data. | Organization features may assist invitation/membership but must not replace tenant/resource checks. | Managed account/session/MFA capabilities can reduce implementation work; validate audit/admin/export controls. | More vendor dependence, lower identity operations burden; verify India/legal/support fit. |
| Supabase Auth | Relevant PostgreSQL alignment; evaluate SSR/session handling for target version. | JWT/custom claims and RLS may help as defense in depth; application still owns complex B2B2C authorization. | Verify MFA, revocation, lifecycle, audit/admin controls; protect service credentials. | Moderate coupling if Auth/DB/storage are combined; verify region, portability, and operational posture. |

## Provisional recommendation

Evaluate a managed identity proof of concept first, led by Clerk and Supabase Auth, while retaining application-owned global identity mapping, tenant memberships, customer relationships, authorization guards, tenant-domain mapping, and audit events. Auth.js/application-managed identity remains viable when deployment control and portability justify the additional security and operational responsibilities.

Before adoption, humans must verify: current pricing/limits/taxes; DPA, sub-processors, support/SLA, breach and export/offboarding terms; regional/data-processing requirements for an India-focused SEBI research-analyst SaaS; identity/MFA/recovery/revocation/audit behavior; Next.js SSR/Server Component/Route Handler compatibility; signed webhook/retry/outage behavior; and independent legal/security review. This document asserts no current certification or pricing.
