import type { IndexerConfig } from "./config.js";

export interface IndexerDb {
  /** Placeholder — wire Postgres pool in Phase 2 */
  connect(): Promise<void>;
}

export function createDb(_config: IndexerConfig): IndexerDb {
  return {
    async connect() {
      /* no-op scaffold */
    },
  };
}
