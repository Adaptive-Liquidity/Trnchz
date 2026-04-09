import type { IndexerDb } from "./db.js";
import type { RpcClient } from "./rpc.js";

/**
 * WebSocket subscriptions (logs / program / account) — implement in Phase 2.
 */
export async function startSubscriptions(
  _db: IndexerDb,
  _rpc: RpcClient
): Promise<void> {
  await Promise.resolve();
}
