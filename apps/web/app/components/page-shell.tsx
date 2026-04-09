import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TopNav } from "./top-nav";

type NavKey = "home" | "arenas" | "me" | "admin";

type Signal = {
  label: string;
  value: string;
};

type PageShellProps = {
  current: NavKey;
  eyebrow: string;
  title: string;
  description: string;
  signals: Signal[];
  frameSrc: string;
  frameLabel: string;
  children: ReactNode;
};

export function PageShell({
  current,
  eyebrow,
  title,
  description,
  signals,
  frameSrc,
  frameLabel,
  children,
}: PageShellProps) {
  return (
    <div className="site-stage">
      <TopNav current={current} />
      <main className="page-shell">
        <section className="page-hero-panel">
          <div className="page-copy">
            <p className="eyebrow-pill">{eyebrow}</p>
            <h1 className="page-title">{title}</h1>
            <p className="page-summary">{description}</p>
            <div className="page-signal-grid">
              {signals.map((signal) => (
                <div key={signal.label} className="page-signal">
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="monitor-card">
            <Image
              src={frameSrc}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 540px"
              className="monitor-image"
            />
            <div className="monitor-overlay">
              <span className="monitor-badge">{frameLabel}</span>
              <strong>READ THE FIELD. THEN MOVE.</strong>
              <p>
                This shell stays compact on purpose. Live boards, wallet-linked positions, and
                command surfaces carry the real protocol detail.
              </p>
              <Link href="/" className="monitor-link">
                BACK TO WAR ROOM
              </Link>
            </div>
          </div>
        </section>

        <section className="page-content-grid">{children}</section>
      </main>
    </div>
  );
}
