import { PublicKey } from "@solana/web3.js";
import type { PdaLabel } from "./types.js";
import { HVH_PROGRAM_ID } from "./program.js";

export const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const CONFIG_SEED = Buffer.from("config");
const MINT_POLICY_SEED = Buffer.from("mint_policy");
const ARENA_SEED = Buffer.from("arena");
const VAULT_AUTH_SEED = Buffer.from("vault_authority");
const POSITION_SEED = Buffer.from("position");

export function placeholderPdaAddress(programId: PublicKey, label: PdaLabel): PublicKey {
  switch (label) {
    case "config":
      return deriveGlobalConfigPda(programId)[0];
    case "mint_policy":
    case "arena":
    case "vault_authority":
    case "position":
      return programId;
    default:
      return programId;
  }
}

export function deriveGlobalConfigPda(programId = HVH_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([CONFIG_SEED], programId);
}

export function deriveMintPolicyPda(
  mint: PublicKey,
  programId = HVH_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([MINT_POLICY_SEED, mint.toBuffer()], programId);
}

export function deriveArenaPda(
  arenaId: bigint | number,
  programId = HVH_PROGRAM_ID
): [PublicKey, number] {
  const value = BigInt(arenaId);
  const bytes = Buffer.alloc(8);
  bytes.writeBigUInt64LE(value);
  return PublicKey.findProgramAddressSync([ARENA_SEED, bytes], programId);
}

export function deriveVaultAuthorityPda(
  arena: PublicKey,
  programId = HVH_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([VAULT_AUTH_SEED, arena.toBuffer()], programId);
}

export function derivePositionPda(
  arena: PublicKey,
  owner: PublicKey,
  programId = HVH_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([POSITION_SEED, arena.toBuffer(), owner.toBuffer()], programId);
}

export function deriveAssociatedTokenAddress(
  owner: PublicKey,
  mint: PublicKey,
  tokenProgram = TOKEN_PROGRAM_ID
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [owner.toBuffer(), tokenProgram.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )[0];
}
