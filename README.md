# Holder v. Holder (monorepo)

Solana locked-position survival arena monorepo scaffold (Phase 1). See [`AGENTS.md`](AGENTS.md) and [`docs/specs/product-spec.md`](docs/specs/product-spec.md).

## Layout

| Path | Role |
|------|------|
| [`programs/holder_arena`](programs/holder_arena) | Anchor program (stub build) |
| [`apps/web`](apps/web) | Product Next.js App Router (port **3001**) |
| [`apps/indexer`](apps/indexer) | Read-model indexer (projection only) |
| [`apps/legacy-trenchz-ui`](apps/legacy-trenchz-ui) | Quarantined legacy Vite demo, not the product client |
| [`packages/sdk`](packages/sdk), [`packages/shared`](packages/shared) | TS SDK + shared types |
| [`tests/`](tests) | Test harness docs / future runners |
| [`infra/`](infra) | DB migrations placeholder |

## Toolchain

See [`docs/TOOLCHAIN.md`](docs/TOOLCHAIN.md) (Rust **1.85.0**, Solana **1.18.26**, Anchor **0.30.1** via AVM).

## Scripts (root)

```bash
npm install
```

| Script | Purpose |
|--------|---------|
| `npm run dev:web` | Next.js product app |
| `npm run dev:indexer` | Indexer process (stubs) |
| `npm run dev:legacy` | Legacy Trenchz Vite only |
| `npm run anchor:build` | `anchor build` -> `target/deploy`, `target/idl/hvh.json` |
| `npm run anchor:idl:sync` | Copy IDL/types into `packages/sdk` (after `anchor build`) |
| `npm run anchor:artifacts` | `anchor:build` then `anchor:idl:sync` |
| `npm run build` | Packages + web + indexer |

## Web + indexer dev notes

- Web app uses `NEXT_PUBLIC_INDEXER_URL` (default `http://127.0.0.1:8080`) for read-only projection fetches.
- Web wallet provider uses `NEXT_PUBLIC_SOLANA_RPC_URL` (default Solana devnet RPC).
- Web money-path controls are gated by `NEXT_PUBLIC_ENABLE_ARENA_TX`.
  - `false` or unset: public shell mode, read surfaces live and tx buttons disabled.
  - `true`: wallet action panel will attempt real client-built Anchor instructions.
- Public shell deployment guidance lives in [docs/runbooks/public-shell-deploy.md](docs/runbooks/public-shell-deploy.md).
- Indexer exposes:
  - `GET /health`
  - `GET /api/arenas`
  - `GET /api/arenas/:arenaId`
  - `GET /api/wallet/:wallet/positions`
- Current indexer APIs are seeded read-model scaffolds. Chain state is still the protocol truth.

## Product vs legacy

- Holder v. Holder UI: `apps/web` (`npm run dev:web`).
- Legacy demo: `apps/legacy-trenchz-ui` with timers and mock wallet flows; see [ADR-002](docs/adr/ADR-002-legacy-vite-ui-disposition.md).

## Phase 2

Lock onchain state architecture (`docs/specs`) then implement instructions and indexer projection.
