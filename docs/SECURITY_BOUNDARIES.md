# Security boundaries

**Status:** TASK-002 architecture baseline, not a claim of regulatory compliance or deployed controls.

## Trust boundaries and tenant context

| Boundary | Required future control |
| --- | --- |
| Browser/client | Treat route state, hostname, IDs, roles, cookies exposed to scripts, and form/query/body inputs as untrusted authorization inputs. |
| Tenant entry/domain | Resolve only through validated hostname-to-tenant mapping; prevent host-header spoofing; unique slug/domain verification; safe inactive/suspended responses. Domain context does not authorize private data. |
| Server | Establish trusted actor/session/tenant context and authorize action, tenant, customer, lifecycle, and resource before data access. |
| Database/data access | Tenant-scoped reads/writes and least-privilege credentials. Future RLS may add defense in depth, never replace application review. |
| Storage/caches/search | Tenant-bound object ownership and signed access; tenant/audience cache and index partitioning; no shared private response keys. |
| Webhooks/external APIs | Authenticate origin/signature, validate schema/timestamp/replay, process idempotently, reconcile tenant context server-side. |
| Background jobs | Preserve tenant, enqueue actor/system actor, authorized operation, and correlation ID; revalidate worker scope and tenant state. |

## Authorization, sessions, sensitive data, and audit

Authorization is required in Server Components, Route Handlers, Server Actions, data access, storage/downloads, exports, jobs, and research-call distribution. Middleware/proxy is an optional early gate only. Fetch resources inside authorized tenant/customer scope, allowlist mutation fields, and authorize state transitions immediately before change.

Future session requirements: HTTPS; secure/httpOnly cookies where applicable; appropriate `SameSite`; server-side expiry/refresh/rotation/revocation; disabled-account enforcement; no tokens in URLs/logs; MFA/step-up assessment for ownership, platform administration, recovery, KYC/export and high-risk actions; CSRF protection for cookie-authenticated mutations; no GET mutations; and future rate limits for login, recovery, onboarding/import, export, and destructive actions.

Minimize sensitive/KYC data, restrict it by purpose/field, protect secrets in managed stores or local uncommitted environment files, use separate environments and least privilege, and never expose server/provider/database secrets to client bundles. Redact passwords, tokens, cookies, authorization headers, webhook signatures, secrets, and unnecessary KYC/personally identifying content from logs and telemetry.

Future material/security-relevant activity needs an append-oriented `AuditEvent`: actor or system actor, tenant context where applicable, action, target, timestamp, outcome, correlation/request context, and safe purpose metadata. Audit access is itself scoped. Never store passwords, raw auth tokens, secrets, or unnecessary KYC content in audit records.

## Threat baseline

| Threat | Baseline mitigation |
| --- | --- |
| IDOR/BOLA and cross-tenant access | Server-proven tenant/customer scope on every resource path, tenant predicates, negative tests, tenant-aware cache/file/job context. |
| Privilege escalation / mass assignment | Separate platform and tenant roles, server-only grants, allowlisted fields, authorized state transitions, audited role/ownership changes. |
| Session theft / CSRF / XSS | Secure sessions, expiry/revocation, CSRF controls, safe rendering/output encoding, CSP assessment, no token leakage. |
| Injection | Input schemas, parameterized data access, least-privilege accounts, review dynamic query paths. |
| Secret/sensitive-log leakage | Secret management, redaction/minimization, repository review, restricted observability access. |
| Webhook spoofing | Signature/timestamp/replay checks, validation, idempotency, reconciliation. |
| Host/domain spoofing | Trusted host validation and verified domain mapping; hostname alone never authorizes access. |
| Cross-tenant call distribution | Tenant-owned calls, server-calculated same-tenant eligibility, scoped notification jobs and audit events. |

Before production features, select and test auth/session, database access, secrets, audit retention, rate limiting, storage, domain verification, onboarding/import, and incident/recovery controls—including negative cross-tenant/customer cases.
