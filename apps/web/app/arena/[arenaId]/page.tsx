import Image from "next/image";
import { getArenaDetail } from "../../lib/indexer";
import { TopNav } from "../../components/top-nav";
import { OpsTicker } from "../../components/ops-ticker";
import { ProtocolActionsPanel } from "../../components/protocol-actions-panel";

type Props = { params: Promise<{ arenaId: string }> };

export default async function ArenaDetailPage({ params }: Props) {
  const { arenaId } = await params;
  const detail = await getArenaDetail(arenaId);
  const { arena } = detail;

  return (
    <div className="site-stage">
      <TopNav current="arenas" />
      <OpsTicker items={arena.protocolPulse} />
      <main className="page-shell arena-shell">
        <section className="arena-board-hero">
          <div className="arena-board-copy">
            <span className="eyebrow-pill">{arena.status}</span>
            <h1 className="page-title">{arena.name}</h1>
            <p className="page-summary">{arena.synopsis}</p>
            <div className="data-points">
              <span>{arena.battleLotUi}</span>
              <span>{arena.usdcStakeUi}</span>
              <span>{arena.potUi}</span>
              <span>{arena.activeCount} live</span>
            </div>
            <p className="content-card-footnote">{arena.lifecycleLabel}</p>
          </div>

          <div className="arena-board-frame">
            <Image
              src={arena.boardFrame}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              className="monitor-image"
            />
            <div className="arena-board-overlay">
              <p className="monitor-badge">{detail.source}</p>
              <strong>{arena.location}</strong>
              <p>{arena.topography}</p>
            </div>
          </div>
        </section>

        <section className="arena-board-scene">
          <div className="arena-scene-image">
            <Image
              src={arena.art}
              alt={arena.name}
              fill
              sizes="100vw"
              className="hero-art-image"
            />
            <div className="hero-art-shade" />
          </div>
        </section>

        <section className="arena-command-layout">
          <section className="arena-grid">
            {arena.boardNotes.map((note) => (
              <article key={note} className="content-card">
                <span className="content-card-kicker">FIELD_INTEL</span>
                <h2>{arena.name}</h2>
                <p>{note}</p>
              </article>
            ))}

            <article className="content-card content-card-wide">
              <span className="content-card-kicker">FINAL_THREE</span>
              <h2>Finalize witness set</h2>
              <p>
                Once the arena compresses to exactly three live positions, this board must surface
                the winner PDAs required to execute <code>finalize_if_three_left</code>.
              </p>
              <div className="witness-grid">
                {arena.finalizeWitnesses.length > 0 ? (
                  arena.finalizeWitnesses.map((witness) => (
                    <div key={witness.positionPubkey} className="witness-row">
                      <strong>{witness.ownerPubkey}</strong>
                      <span>{witness.positionPubkey}</span>
                    </div>
                  ))
                ) : (
                  <p className="content-card-footnote">No witness set is currently available for this arena.</p>
                )}
              </div>
            </article>
          </section>

          <ProtocolActionsPanel arena={arena} />
        </section>
      </main>
    </div>
  );
}
