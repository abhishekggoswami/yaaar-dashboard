# Authorization matrix

**Status:** conceptual server-side policy for TASK-002. It is not implemented RBAC and frontend visibility is never authorization.

## Rules for every protected request

1. Authenticate the identity and confirm account/session state.
2. Resolve candidate tenant context from a trusted host mapping or server-side resource lookup; request IDs and hostnames are inputs, not authority.
3. Resolve platform role, tenant membership, customer relationship, target resource, tenant state, and entitlement server-side.
4. Allow only an explicit action; deny ambiguity and record material/security-relevant actions.

Legend: **Manage** means permitted scoped create/read/update/lifecycle work; **Own** means only the actor's linked customer data; **Scoped** means an explicit future least-privilege capability; **—** means deny.

| Resource/action | Visitor | `PLATFORM_ADMIN` | `ANALYST_OWNER` | Future analyst staff | `CUSTOMER` |
| --- | --- | --- | --- | --- | --- |
| Tenant-branded public landing content | Read only resolved active tenant template | Read | Read | Read | Read |
| Platform control plane / tenant provisioning | — | Manage delegated provisioning/lifecycle functions | — | — | — |
| Tenant branding, domain, templates, configuration | — | Scoped, audited control-plane/support action | Manage own active tenant configuration within policy | Scoped own-tenant permission | — |
| Tenant memberships | — | Scoped, audited intervention | Manage own tenant; cannot grant platform role | Scoped own-tenant permission | — |
| Existing-customer invite/manual/import workflow | — | Scoped approval/support action | Initiate/approve own-tenant workflow as future policy permits | Scoped own-tenant permission | Activate/claim only own eligible relationship |
| Customer records | — | Scoped, purpose-limited, audited | Manage own-tenant records | Scoped own-tenant permission | Own linked profile only |
| Services/plans and subscriptions | — | Scoped platform operation | Manage own tenant as policy permits | Scoped own-tenant permission | Read/use only own tenant's available/entitled records |
| Research calls, baskets, performance/history | — | Scoped, audited exceptional access | Manage own tenant | Scoped own-tenant permission | Only own-tenant eligible content |
| KYC metadata | — | Explicit approval-gated, audited scope only | Authorized own-tenant workflow only | Explicit own-tenant workflow only | Own allowed fields only |
| Audit information | — | Platform audit scope with sensitive detail filtering | Own-tenant audit scope | Only explicit future permission | — |

## Explicit denies and invariants

- Customer A cannot read/mutate Customer B's private profile, KYC, subscription, call entitlement, or history—even with a known ID.
- Tenant A cannot read/mutate Tenant B's private data, branding configuration, domain mapping, customer records, plans, calls, or audit scope—even if one identity is related to both tenants.
- Customers cannot browse/discover/compare/select/switch RAs, access a public analyst directory, or receive marketplace checkout/recommendation behavior.
- Tenant membership cannot create `PLATFORM_ADMIN`; platform-admin status does not silently grant broad sensitive-data access.
- A hostname establishes tenant context only; it cannot authorize a private resource.
- Frontend routes, menus, client role claims, and request-provided tenant/customer/role fields do not grant access.
- Suspended/closed tenants and disabled/suspended accounts must be denied according to lifecycle policy.
- Cross-tenant bulk search, exports, imports, files, cached responses, jobs, and call distribution are denied absent explicit server-proven scope.
- Mass-assigned fields such as tenant/owner/role/status/domain/entitlement must be ignored or rejected unless the server authorizes the transition.

## Server enforcement model

```text
requireAuthenticatedUser()
requirePlatformAdmin(capability)
requireTenantMembership(tenantId)
requireTenantRole(tenantId, allowedRoles)
requireCustomerAccess(tenantId, customerProfileId)
requireTenantContextFromHost(hostname)
```

| Boundary | Required behavior |
| --- | --- |
| Server Components | Authorize before fetching/rendering protected data; do not rely on a client/layout guard. |
| Route Handlers | Validate inputs, resolve scoped resource, authorize every HTTP method, then read/mutate. |
| Server Actions | Treat arguments as untrusted and reauthorize before access and mutation. |
| Data-access layer | Require trusted tenant/actor context; apply tenant predicates to reads, counts, relation traversal, updates, deletes, exports, and imports. |
| Middleware/proxy | May provide a coarse early gate/tenant resolution but is never the sole authorization decision. |
| Jobs, notifications, files, caches | Carry tenant/actor/system-actor/correlation context, revalidate in workers, use tenant/audience cache keys and server-authorized storage access. |

Every tenant-owned record needs direct `tenantId` ownership or a constrained relationship whose tenant ownership is provable server-side. Direct tenancy is preferred for high-value and frequently queried records.
