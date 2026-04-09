export interface IndexerConfig {
  rpcUrl: string;
  wsUrl: string;
  databaseUrl: string;
  programId: string;
  /** HTTP port for `/health` and future read-only APIs. */
  httpPort: number;
}

export function loadConfig(): IndexerConfig {
  return {
    rpcUrl: process.env.RPC_URL ?? "http://127.0.0.1:8899",
    wsUrl: process.env.WS_URL ?? "ws://127.0.0.1:8900",
    databaseUrl: process.env.DATABASE_URL ?? "postgres://localhost/holder_v_holder",
    programId: process.env.PROGRAM_ID ?? "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
    httpPort: Number(process.env.INDEXER_HTTP_PORT ?? "8080"),
  };
}
