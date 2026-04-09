"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import type { PositionsResponse } from "@holder-v-holder/shared";
import { PositionsResponseSchema } from "@holder-v-holder/shared";

const indexerBase =
  process.env.NEXT_PUBLIC_INDEXER_URL ?? "http://127.0.0.1:8080";

type LoadState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; payload: PositionsResponse }
  | { kind: "error"; message: string };

export function WalletPositionsPanel() {
  const { publicKey, connected } = useWallet();
  const [state, setState] = useState<LoadState>({ kind: "idle" });

  useEffect(() => {
    if (!connected || !publicKey) {
      setState({ kind: "idle" });
      return;
    }

    const walletAddress = publicKey.toBase58();
    const controller = new AbortController();

    async function loadPositions() {
      setState({ kind: "loading" });

      try {
        const response = await fetch(`${indexerBase}/api/wallet/${walletAddress}/positions`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Indexer returned ${response.status}`);
        }

        const json = await response.json();
        const payload = PositionsResponseSchema.parse(json);
        setState({ kind: "ready", payload });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          kind: "error",
          message:
            error instanceof Error ? error.message : "Unable to load wallet positions.",
        });
      }
    }

    void loadPositions();

    return () => controller.abort();
  }, [connected, publicKey]);

  if (!connected || !publicKey) {
    return (
      <article className="content-card content-card-wide">
        <span className="content-card-kicker">Wallet required</span>
        <h2>Connect a wallet to query your positions</h2>
        <p>The nav wallet control is live. Once connected, this page calls the indexer read API for position rows.</p>
      </article>
    );
  }

  if (state.kind === "loading") {
    return (
      <article className="content-card content-card-wide">
        <span className="content-card-kicker">Loading</span>
        <h2>Reading projection state</h2>
        <p>Fetching position rows for {publicKey.toBase58()}.</p>
      </article>
    );
  }

  if (state.kind === "error") {
    return (
      <article className="content-card content-card-wide">
        <span className="content-card-kicker">Indexer offline</span>
        <h2>Wallet connected, projection unavailable</h2>
        <p>{state.message}</p>
      </article>
    );
  }

  if (state.kind !== "ready") {
    return null;
  }

  return (
    <>
      <article className="content-card content-card-wide">
        <span className="content-card-kicker">Projection status</span>
        <h2>Positions for {publicKey.toBase58()}</h2>
        <p>
          Source: {state.payload.source}. Updated:{" "}
          {new Date(state.payload.updatedAt).toLocaleString()}.
        </p>
      </article>

      {state.payload.positions.map((position) => (
        <article key={position.positionPubkey} className="content-card">
          <span className="content-card-kicker">{position.status}</span>
          <h2>{position.arenaName}</h2>
          <p>{position.lastAction}</p>
          <div className="data-points">
            <span>{position.battleLotUi}</span>
            <span>{position.usdcStakeUi}</span>
            <span>{position.actionLabel}</span>
          </div>
        </article>
      ))}
    </>
  );
}
