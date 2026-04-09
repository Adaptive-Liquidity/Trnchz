/** Cluster names for config — no protocol logic. */
export const CLUSTER_NAMES = ["localnet", "devnet", "mainnet-beta"] as const;
export type ClusterName = (typeof CLUSTER_NAMES)[number];
export const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111";
export const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const ASSOCIATED_TOKEN_PROGRAM_ID = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
