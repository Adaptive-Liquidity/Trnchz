"use client";

import {
  createHvhProgram,
  deriveAssociatedTokenAddress,
  deriveGlobalConfigPda,
  deriveMintPolicyPda,
  derivePositionPda,
  deriveVaultAuthorityPda,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@holder-v-holder/sdk";
import type { ArenaDetail } from "@holder-v-holder/shared";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMemo, useState } from "react";
import { ARENA_TX_ENABLED } from "../lib/launch-mode";

type ProtocolActionsPanelProps = {
  arena: ArenaDetail;
};

type ActionKey = "join" | "leaveRecruiting" | "surrender" | "finalize" | "claim";

const labels: Record<ActionKey, string> = {
  join: "join_arena",
  leaveRecruiting: "leave_recruiting",
  surrender: "surrender_live",
  finalize: "finalize_if_three_left",
  claim: "claim_winnings",
};

export function ProtocolActionsPanel({ arena }: ProtocolActionsPanelProps) {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const { connected, publicKey } = useWallet();
  const [pending, setPending] = useState<ActionKey | null>(null);
  const [message, setMessage] = useState<string>(
    ARENA_TX_ENABLED
      ? "Wallet-signed protocol actions are enabled for this build."
      : "Observer shell active: live reads are online, money-path actions remain gated."
  );

  const accountSet = useMemo(() => {
    try {
      const arenaKey = new PublicKey(arena.arenaPubkey);
      const trackedMint = new PublicKey(arena.accounts.trackedMintPubkey);
      const stakeMint = new PublicKey(arena.accounts.stakeMintPubkey);
      const treasuryOwner = new PublicKey(arena.accounts.treasuryOwnerPubkey);
      const [globalConfig] = deriveGlobalConfigPda();
      const [vaultAuthority] = deriveVaultAuthorityPda(arenaKey);
      const arenaStakeVault = deriveAssociatedTokenAddress(vaultAuthority, stakeMint);
      const treasuryTokenAccount = deriveAssociatedTokenAddress(treasuryOwner, stakeMint);
      return {
        arenaKey,
        trackedMint,
        stakeMint,
        globalConfig,
        vaultAuthority,
        arenaStakeVault,
        treasuryTokenAccount,
      };
    } catch {
      return null;
    }
  }, [arena]);

  async function runAction(action: ActionKey) {
    if (!ARENA_TX_ENABLED) {
      setMessage("Money-path actions are disabled while the public shell is in observer mode.");
      return;
    }

    if (!anchorWallet || !connected || !publicKey || !accountSet) {
      setMessage("Connect a wallet and wait for valid projection metadata before sending protocol instructions.");
      return;
    }

    setPending(action);
    setMessage(`Preparing ${labels[action]}...`);

    try {
      const program = createHvhProgram(connection, anchorWallet);
      const owner = publicKey;
      const [position] = derivePositionPda(accountSet.arenaKey, owner);
      const [mintPolicy] = deriveMintPolicyPda(accountSet.trackedMint);
      const userTracked = deriveAssociatedTokenAddress(owner, accountSet.trackedMint);
      const userStake = deriveAssociatedTokenAddress(owner, accountSet.stakeMint);
      const positionTrackedVault = deriveAssociatedTokenAddress(position, accountSet.trackedMint);

      let signature = "";

      if (action === "join") {
        signature = await program.methods
          .joinArena()
          .accountsPartial({
            globalConfig: accountSet.globalConfig,
            arena: accountSet.arenaKey,
            mintPolicy,
            position,
            owner,
            vaultAuthority: accountSet.vaultAuthority,
            arenaStakeVault: accountSet.arenaStakeVault,
            userTracked,
            userStake,
            positionTrackedVault,
            trackedMint: accountSet.trackedMint,
            stakeMint: accountSet.stakeMint,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SYSTEM_PROGRAM_ID,
          })
          .rpc();
      }

      if (action === "leaveRecruiting") {
        signature = await program.methods
          .leaveRecruiting()
          .accountsPartial({
            globalConfig: accountSet.globalConfig,
            arena: accountSet.arenaKey,
            position,
            owner,
            vaultAuthority: accountSet.vaultAuthority,
            arenaStakeVault: accountSet.arenaStakeVault,
            userStake,
            userTracked,
            positionTrackedVault,
            stakeMint: accountSet.stakeMint,
            trackedMint: accountSet.trackedMint,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .rpc();
      }

      if (action === "surrender") {
        signature = await program.methods
          .surrenderLive()
          .accountsPartial({
            globalConfig: accountSet.globalConfig,
            arena: accountSet.arenaKey,
            position,
            owner,
            positionTrackedVault,
            userTracked,
            trackedMint: accountSet.trackedMint,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .rpc();
      }

      if (action === "claim") {
        signature = await program.methods
          .claimWinnings()
          .accountsPartial({
            globalConfig: accountSet.globalConfig,
            arena: accountSet.arenaKey,
            vaultAuthority: accountSet.vaultAuthority,
            arenaStakeVault: accountSet.arenaStakeVault,
            stakeMint: accountSet.stakeMint,
            position,
            owner,
            userStake,
            positionTrackedVault,
            userTracked,
            trackedMint: accountSet.trackedMint,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .rpc();
      }

      if (action === "finalize") {
        const [pa, pb, pc] = arena.finalizeWitnesses.map((entry) => new PublicKey(entry.positionPubkey));
        signature = await program.methods
          .finalizeIfThreeLeft()
          .accountsPartial({
            globalConfig: accountSet.globalConfig,
            arena: accountSet.arenaKey,
            vaultAuthority: accountSet.vaultAuthority,
            arenaStakeVault: accountSet.arenaStakeVault,
            stakeMint: accountSet.stakeMint,
            treasuryTokenAccount: accountSet.treasuryTokenAccount,
            pa,
            pb,
            pc,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .rpc();
      }

      setMessage(`${labels[action]} submitted: ${signature}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? `${labels[action]} failed: ${error.message}` : `${labels[action]} failed.`
      );
    } finally {
      setPending(null);
    }
  }

  return (
    <aside className="command-panel">
      <div className="command-panel-head">
        <span className="content-card-kicker">Command center</span>
        <strong>Protocol actions</strong>
        <p>{message}</p>
      </div>

      <div className="command-panel-grid">
        {(Object.keys(labels) as ActionKey[]).map((action) => {
          const state = arena.commands[action];
          const disabled =
            pending !== null ||
            !state.enabled ||
            !ARENA_TX_ENABLED ||
            !connected ||
            !accountSet ||
            (action === "finalize" && arena.finalizeWitnesses.length !== 3);

          return (
            <button
              key={action}
              type="button"
              className={disabled ? "command-button command-button-disabled" : "command-button"}
              disabled={disabled}
              onClick={() => void runAction(action)}
            >
              <span>{state.label}</span>
              <strong>{pending === action ? "Submitting..." : labels[action]}</strong>
              <small>
                {!ARENA_TX_ENABLED
                  ? "Feature gated for public shell launch."
                  : !connected
                    ? "Connect wallet to unlock this command."
                    : state.reason ?? "Ready when live deployment metadata is valid."}
              </small>
            </button>
          );
        })}
      </div>

      <div className="command-panel-notes">
        {arena.launchNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </aside>
  );
}

