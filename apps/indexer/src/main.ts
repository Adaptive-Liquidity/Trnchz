/**
 * Indexer entrypoint — subscribes and projects chain state (Phase 2+).
 * Chain remains source of truth; this process is a disposable projection.
 */
import { loadConfig } from "./config.js";
import { createDb } from "./db.js";
import { createRpc } from "./rpc.js";
import { startHealthServer } from "./http.js";
import { startSubscriptions } from "./subscriptions.js";
import { runReconciliation } from "./reconciliation.js";

async function main(): Promise<void> {
  const config = loadConfig();
  startHealthServer(config.httpPort);
  const db = createDb(config);
  const rpc = createRpc(config);
  await runReconciliation(db, rpc);
  await startSubscriptions(db, rpc);
  console.log("[indexer] scaffold running; subscriptions are stubs.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
