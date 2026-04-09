import { PageShell } from "../components/page-shell";

export default function AdminPage() {
  return (
    <PageShell
      current="admin"
      eyebrow="COMMAND_CENTER"
      title="Command Post"
      description="The command post is for policy and arena operations only: build client-side transactions, inspect boundaries, and keep every admin action explicit and auditable."
      signals={[
        { label: "Flow type", value: "Client-built tx" },
        { label: "Custody", value: "None" },
        { label: "Scope", value: "Policy / create arena" },
      ]}
      frameSrc="/theme/generated/command-center-backplate.png"
      frameLabel="Operator shell"
    >
      <article className="content-card">
        <span className="content-card-kicker">Policy</span>
        <h2>Mint allowlist controls</h2>
        <p>
          Mint policy should feel like a war-room control, not a backend superpower. Every change
          remains a wallet-signed action with visible blast radius.
        </p>
        <div className="data-points">
          <span>Set mint policy</span>
          <span>Rotate defaults</span>
        </div>
      </article>

      <article className="content-card">
        <span className="content-card-kicker">Arena creation</span>
        <h2>Setup without backend custody</h2>
        <p>
          Arena creation belongs here: choose the tracked mint, stake policy, and battle lot
          envelope without inventing any offchain settlement layer.
        </p>
        <div className="data-points">
          <span>Create arena</span>
          <span>No backend custody</span>
        </div>
      </article>

      <article className="content-card content-card-wide">
        <span className="content-card-kicker">Boundary</span>
        <h2>No hidden operator powers</h2>
        <p>
          This client does not get secret levers. No admin seizure path, no reassignment logic, and
          no agent-managed funds are hiding behind the shell.
        </p>
        <div className="data-points">
          <span>Upgrade authority separate</span>
          <span>Projection only</span>
        </div>
      </article>
    </PageShell>
  );
}
