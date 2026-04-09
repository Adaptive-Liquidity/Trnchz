import type { PublicKey } from "@solana/web3.js";

/** Stub — real PDAs come from Phase 2 seed table + program id. */
export type PdaLabel = "config" | "mint_policy" | "arena" | "vault_authority" | "position";

export interface PdaRequest {
  label: PdaLabel;
  /** Optional seeds — shape TBD in Phase 2 */
  seeds?: Uint8Array[];
}

export type ProgramAddresses = {
  programId: PublicKey;
};
