---
name: nextjs-wallet-flow
description: Next.js App Router boundaries for wallet, tx lifecycle, and wallet-signature auth.
---

# Skill: nextjs-wallet-flow

## When to use

- Any **apps/web** change touching wallet adapter, transactions, or `/api/auth/*` routes.

## Why it exists

Splitting server/client wrong leaks expectations; **tx state** must be explicit for user trust.

## Required inputs

- RPC/cluster config; indexer base URL
- SDK instruction builders for flows being wired

## Exact procedure

1. Keep wallet and signing in **client components**; pass results to server only as **signed payloads** for auth verify.
2. Tx flow: build → sign → send → **confirm** (polling or websocket) → **refresh indexer** (and optional account fetch).
3. Surface errors: simulation failure, user reject, timeout, confirmation dropped.
4. Auth: nonce issue → sign message → verify → httpOnly session per product spec.
5. Never send **private keys**; never “server finalize” user funds.

## Guardrails

- No using wallet balance polling for **eligibility** in protocol UX

## Failure conditions

- Stale UI after successful tx because indexer refresh missing
- Session cookie accessible from JS (must be httpOnly design)

## Done criteria

- Documented tx states in PR; manual smoke path listed

## Output template

`Routes touched | Client components | Tx states | Auth steps`.
