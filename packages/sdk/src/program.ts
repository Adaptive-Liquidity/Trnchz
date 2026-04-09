import type { Idl } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import idl from "./idl/hvh.json" with { type: "json" };

/** On-chain program id (matches `declare_id!` / `Anchor.toml`). */
export const HVH_PROGRAM_ID = new PublicKey(idl.address);

/** Anchor IDL (`#[program] mod hvh` → `hvh.json`). */
export const HVH_IDL = idl as Idl;

export type { Hvh } from "./generated/hvh.js";
