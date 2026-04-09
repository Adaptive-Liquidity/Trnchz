# Public Shell Deploy

This runbook is for shipping the **frontend-first public shell** of Holder v. Holder. It is **not** the runbook for enabling public money-path transactions.

## Goal

Ship `apps/web` so users can:

- view the homepage
- browse arenas
- connect a wallet
- inspect positions and arena state
- understand the protocol shape

Keep real protocol actions disabled in production until the release gates for the onchain lane are complete.

## Scope

This runbook covers:

- Vercel deployment for `apps/web`
- production env for the public shell
- launch-mode validation

This runbook does **not** cover:

- program deployment
- indexer persistence
- IDL release syncing
- verified build flow
- legal/geofence signoff

## Production mode

For the public shell, set:

```bash
NEXT_PUBLIC_ENABLE_ARENA_TX=false
```

That keeps the arena command panel visible but non-operational. Users can inspect the lifecycle and connect wallets, but they cannot send public join / surrender / finalize / claim transactions from the live site.

## Vercel setup

1. Create a Vercel project from this repo.
2. Set the **Root Directory** to `apps/web`.
3. Vercel should read [`apps/web/vercel.json`](../../apps/web/vercel.json) for install/build behavior.

Expected commands:

- install: `cd ../.. && npm install`
- build: `cd ../.. && npm run build:packages && npm run build:web`

This preserves the monorepo package build step before Next.js builds the app.

## Required env vars

Set these in Vercel:

```bash
NEXT_PUBLIC_INDEXER_URL=https://your-indexer-host.example.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_ENABLE_ARENA_TX=false
```

Notes:

- `NEXT_PUBLIC_INDEXER_URL` should point at a hosted read-model service.
- Do **not** point production at a local workstation indexer.
- For the shell launch, devnet RPC is acceptable unless you explicitly want a read-only mainnet presentation.

## Indexer hosting

Do not host the indexer on Vercel. It needs always-on runtime behavior for long-lived Solana ingestion and should live on persistent infra with a database.

Recommended shape:

- indexer runtime on always-on container/service infra
- Postgres on managed persistent storage

## Pre-deploy checks

Run from repo root:

```bash
npm install
npm run build
```

Confirm:

- homepage renders
- `/arenas` renders
- `/arena/[arenaId]` renders
- `/me` renders
- `/admin` renders
- the arena command panel shows shell-mode messaging

## Post-deploy checks

After Vercel deploys:

1. Open `/`
2. Open `/arenas`
3. Open a detail route such as `/arena/siege-of-shadefall`
4. Connect a wallet
5. Confirm the command panel remains disabled and explicitly indicates shell mode
6. Confirm arena/status/ticker data resolves from the hosted indexer URL

## What must still happen before public-money launch

These are still release blockers:

- replace placeholder program ID
- move indexer off scaffold/demo projection behavior
- remove production dependence on fallback/demo read-model rows
- prove join / leave / surrender / finalize / claim end-to-end on devnet
- run canonical IDL sync for the release candidate
- complete verified build + authority hardening
- complete legal/geofence decision

Until those are complete, the correct public framing is:

**website live, money path not live**
