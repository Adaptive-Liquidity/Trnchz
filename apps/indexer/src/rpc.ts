import type { IndexerConfig } from "./config.js";

export interface RpcClient {
  /** Placeholder slot for HTTP RPC helpers */
  getSlot(): Promise<bigint>;
}

export function createRpc(_config: IndexerConfig): RpcClient {
  return {
    async getSlot() {
      return 0n;
    },
  };
}
