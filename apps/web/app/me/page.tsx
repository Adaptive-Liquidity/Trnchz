import { PageShell } from "../components/page-shell";
import { WalletPositionsPanel } from "../components/wallet-positions-panel";

export default function MePage() {
  return (
    <PageShell
      current="me"
      eyebrow="COMMAND_DECK"
      title="My Positions"
      description="This is the wallet-linked deck for real arena exposure: live seats, claimable outcomes, last protocol action, and explicit custody boundaries without fake portfolio fluff."
      signals={[
        { label: "Auth mode", value: "Wallet adapter" },
        { label: "Custody", value: "PDA vaults" },
        { label: "Read path", value: "Indexer API" },
      ]}
      frameSrc="/theme/generated/command-center-backplate.png"
      frameLabel="Wallet-linked view"
    >
      <WalletPositionsPanel />
    </PageShell>
  );
}
