import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";

import { HVH_IDL, type Hvh } from "./program.js";

type BrowserWallet = {
  publicKey: PublicKey;
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
};

export function createHvhProgram(connection: Connection, wallet: BrowserWallet): Program<Hvh> {
  const provider = new AnchorProvider(connection, wallet as never, AnchorProvider.defaultOptions());
  return new Program(HVH_IDL as Hvh, provider);
}
