"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function formatPublicKey(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function WalletControls() {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  if (connected && publicKey) {
    return (
      <div className="wallet-cluster">
        <div className="wallet-pill">
          <span className="wallet-pill-label">Combatant online</span>
          <strong>{formatPublicKey(publicKey.toBase58())}</strong>
        </div>
        <button type="button" className="wallet-action" onClick={() => void disconnect()}>
          DISCONNECT
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="wallet-action wallet-action-primary"
      onClick={() => setVisible(true)}
    >
      {connecting ? "LINKING_WALLET..." : "CONNECT_COMBATANT"}
    </button>
  );
}
