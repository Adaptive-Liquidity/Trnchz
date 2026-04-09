# Rule: Web and backend boundaries

- **Backend/indexer**: Ingest, decode, project, query — **no custody**, no settlement authority, no winner selection.
- **APIs**: Thin read layer + auth session + admin surfaces that only **request client-signed transactions** or document “sign this instruction” — never hold keys that spend user tokens.
- **Auth**: Wallet signature → session cookie for **UX** (personalized reads, admin UI session) only; program authorization remains **transaction signers** onchain.
- **Next.js** (product app): Server components for read-heavy pages fed by indexer; **client components** only where wallet/tx required.
- **Secrets**: No production keys in repo; use `.env.example` and secret management outside VCS.

## Forbidden

- Server-side signing of user transactions with custodial keys.
- Backend endpoints that “finalize” or “pay winners” without a client-built and user-signed program instruction.
