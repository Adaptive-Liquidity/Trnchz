import type { IndexerDb } from "./db.js";
import type { RpcClient } from "./rpc.js";

/**
 * Replay / gap-fill — implement with idempotent keys per docs/specs/invariants.md.
 */
export async function runReconciliation(
  _db: IndexerDb,
  _rpc: RpcClient
): Promise<void> {
  await Promise.resolve();
}
