import Image from "next/image";
import Link from "next/link";
import { getArenaList } from "./lib/indexer";
import { TopNav } from "./components/top-nav";
import { OpsTicker } from "./components/ops-ticker";
import { LAUNCH_MODE } from "./lib/launch-mode";

const ruleChips = [
  "Onchain custody only",
  "Projection-only indexer",
  "No timed eliminations",
];

export default async function HomePage() {
  const arenaList = await getArenaList();
  const featuredArenas = arenaList.arenas.slice(0, 3);
  const totalLive = arenaList.arenas.reduce((sum, arena) => sum + arena.activeCount, 0);
  const kingArena = arenaList.arenas.reduce((best, arena) => {
    const bestScore = best.activeCount * 10 + best.joinedCount;
    const score = arena.activeCount * 10 + arena.joinedCount;
    return score > bestScore ? arena : best;
  }, arenaList.arenas[0]);

  return (
    <div className="site-stage">
      <TopNav current="home" />
      <OpsTicker items={arenaList.ticker} />

      <main className="landing-shell">
        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow-pill">CHAIN_OF_TRUTH</p>
            <h1 className="hero-title">
              HOLD FAST.
              <span>OUTLAST THE EXIT.</span>
            </h1>
            <p className="hero-lede">
              Holder v. Holder is an onchain survival arena for wallets that refuse to flinch.
              Every seat locks a tracked battle lot and USDC stake on Solana. There are no timers,
              no offchain winner picks, and no fake portfolio theater. The field narrows until
              three survivors remain.
            </p>

            <div className="hero-actions">
              <Link href="/arenas" className="action-primary">
                SCOUT LIVE BOARDS
              </Link>
              <Link href="/admin" className="action-secondary">
                OPEN WAR ROOM
              </Link>
            </div>

            <div className="rule-strip">
              {ruleChips.map((chip) => (
                <span key={chip} className="rule-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-art-frame">
              <Image
                src="/theme/generated/hero-panorama-bg.png"
                alt="Mascot factions facing off across a toxic battlefield and fortress gate."
                fill
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
                className="hero-art-image hero-art-image-wide"
              />
              <div className="hero-art-shade" />
              <div className="hero-badge hero-badge-left">
                <Image
                  src="/theme/lava-skull.png"
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <div className="hero-badge hero-badge-right">
                <Image
                  src="/theme/skull-badge.png"
                  alt=""
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="hero-overlay-card">
              <div className="hero-overlay-copy">
                <span className="overlay-label">OBSERVER_SHELL</span>
                <strong>
                  {LAUNCH_MODE === "live" ? "Transaction lane armed." : "Transactions locked for shell launch."}{" "}
                  {arenaList.arenas.length} boards tracked. {totalLive} live seats still holding.
                </strong>
                <p>
                  Read model source: {arenaList.source}. Last sweep{" "}
                  {new Date(arenaList.updatedAt).toLocaleString()}.
                </p>
              </div>
              <div className="hero-overlay-visual">
                <Image
                  src="/theme/generated/hero-shell-frame.png"
                  alt="Premium hero shell frame with a clean center for tactical overlays."
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className="hero-overlay-image hero-overlay-image-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="support-section">
          <div className="support-heading">
            <p className="section-kicker">TACTICAL_INDEX</p>
            <h2>One short landing page. The serious surfaces live deeper in the stack.</h2>
          </div>

          <div className="support-grid">
            <Link href={`/arena/${kingArena.arenaId}`} className="route-card route-card-wide">
              <div className="route-card-media">
                <Image
                  src="/theme/generated/arena-board-bg.png"
                  alt="Arena board background with a clean center and trench battlefield horizon."
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="route-card-image"
                />
              </div>
              <span className="route-card-label">SECTOR_KING</span>
              <strong>{kingArena.name}</strong>
              <p>{kingArena.synopsis}</p>
              <div className="data-points">
                <span>{kingArena.potUi}</span>
                <span>{kingArena.activeCount}/{kingArena.joinedCount} live</span>
                <span>{kingArena.status}</span>
              </div>
              <span className="route-card-link">OPEN COMMAND BOARD</span>
            </Link>

            {featuredArenas.map((arena) => (
              <Link key={arena.arenaId} href={`/arena/${arena.arenaId}`} className="route-card">
                <div className="route-card-media route-card-media-compact">
                  <Image
                    src={arena.art}
                    alt={arena.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 28vw"
                    className="route-card-image"
                  />
                </div>
                <span className="route-card-label">{arena.status}</span>
                <strong>{arena.name}</strong>
                <p>{arena.synopsis}</p>
                <div className="data-points">
                  <span>{arena.battleLotUi}</span>
                  <span>{arena.usdcStakeUi}</span>
                  <span>{arena.potUi}</span>
                  <span>{arena.activeCount} live</span>
                </div>
                <span className="route-card-link">SCAN ARENA</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
