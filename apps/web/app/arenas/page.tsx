import Link from "next/link";
import { getArenaList } from "../lib/indexer";
import { PageShell } from "../components/page-shell";

export default async function ArenasPage() {
  const arenaList = await getArenaList();
  const dominantArena = arenaList.arenas.reduce((best, arena) => {
    const bestScore = best.activeCount * 10 + best.joinedCount;
    const score = arena.activeCount * 10 + arena.joinedCount;
    return score > bestScore ? arena : best;
  }, arenaList.arenas[0]);

  return (
    <PageShell
      current="arenas"
      eyebrow="COMBAT_THEATER"
      title="The Arena"
      description="Every board here is a live read-model surface for a real Holder v. Holder arena: battle lot, stake, pot pressure, survivor count, and the exact route into the command view."
      signals={[
        { label: "Data source", value: arenaList.source },
        { label: "Tracked arenas", value: String(arenaList.arenas.length) },
        {
          label: "Updated",
          value: new Date(arenaList.updatedAt).toLocaleDateString(),
        },
      ]}
      frameSrc="/theme/generated/hero-panorama-bg.png"
      frameLabel="Arena read model"
    >
      <article className="content-card content-card-wide">
        <span className="content-card-kicker">SECTOR_KING</span>
        <h2>{dominantArena.name}</h2>
        <p>{dominantArena.synopsis}</p>
        <div className="data-points">
          <span>{dominantArena.battleLotUi}</span>
          <span>{dominantArena.usdcStakeUi}</span>
          <span>{dominantArena.potUi}</span>
          <span>{dominantArena.activeCount}/{dominantArena.joinedCount} live</span>
        </div>
        <p className="content-card-footnote">{dominantArena.lifecycleLabel}</p>
        <Link href={`/arena/${dominantArena.arenaId}`} className="content-inline-link">
          OPEN COMMAND BOARD
        </Link>
      </article>

      {arenaList.arenas.map((arena) => (
        <article key={arena.arenaId} className="content-card">
          <span className="content-card-kicker">{arena.status}</span>
          <h2>{arena.name}</h2>
          <p>{arena.synopsis}</p>
          <div className="data-points">
            <span>{arena.battleLotUi}</span>
            <span>{arena.usdcStakeUi}</span>
            <span>{arena.potUi}</span>
            <span>{arena.activeCount}/{arena.joinedCount} live</span>
          </div>
          <p className="content-card-footnote">{arena.lifecycleLabel}</p>
          <Link href={`/arena/${arena.arenaId}`} className="content-inline-link">
            SCAN ARENA
          </Link>
        </article>
      ))}
    </PageShell>
  );
}
