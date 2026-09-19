# Project Context

## Product

This product is a **B2B2C multi-tenant FinTech SaaS for SEBI-registered Research Analysts (RAs)**. The platform sells software to RAs; each RA (individual or organization) operates a private, tenant-branded environment for its own customers. It will ultimately provide three role-based experiences:

1. Platform Admin Dashboard for the internal platform team.
2. Research Analyst Dashboard for customer tenants who publish research.
3. Customer Dashboard for the end customers of those research analysts.

This is not an RA marketplace. Customers must not browse, discover, compare, select, or switch RAs through the product. Customer entry is tenant-context-first: a specific RA-branded entry point leads to that RA's invitation/activation or login/signup, onboarding/KYC, services/plans, subscription, dashboard, and eligible content.

Each RA may bring an existing customer base. Future onboarding must support controlled invitation, manual onboarding, approved bulk import, activation, and account-claiming/verification options without assuming all customers self-register publicly.

## Future modules

Future work may introduce customer management, KYC, service and subscription plans, payments, research calls, WhatsApp notifications, baskets, and past-performance/history views.

## Current boundary

TASK-001 establishes the application foundation; TASK-002 documents identity, tenant, control-plane, and security architecture only. No future business module is implemented or inferred here. Route visibility is a navigation demonstration, not authorization or tenant isolation. One shared application/codebase must serve all RAs through trusted tenant context, controlled configuration, and tenant data—never per-RA dashboard/site source duplication.
