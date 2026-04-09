import Image from "next/image";
import Link from "next/link";
import { WalletControls } from "./wallet-controls";

type TopNavProps = {
  current?: "home" | "arenas" | "me" | "admin";
};

const navItems = [
  { href: "/", label: "HOME", key: "home" },
  { href: "/arenas", label: "THE_ARENA", key: "arenas" },
  { href: "/me", label: "MY_POSITIONS", key: "me" },
  { href: "/admin", label: "COMMAND_CENTER", key: "admin" },
] as const;

export function TopNav({ current }: TopNavProps) {
  return (
    <header className="site-nav-shell">
      <div className="site-nav">
        <Link href="/" className="brand-lockup" aria-label="Holder v. Holder home">
          <span className="brand-mark">
            <Image
              src="/theme/skull-badge.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain"
            />
          </span>
          <span>
            <span className="brand-kicker">Trenchz</span>
            <span className="brand-title">Onchain survival arena</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.key === current ? "nav-link nav-link-active" : "nav-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/arenas" className="nav-cta">
            ENTER_THE_TRENCH
          </Link>
          <WalletControls />
        </div>
      </div>
    </header>
  );
}
