import type { ArenaTickerItem } from "@holder-v-holder/shared";

type OpsTickerProps = {
  items: ArenaTickerItem[];
};

export function OpsTicker({ items }: OpsTickerProps) {
  return (
    <div className="ops-ticker" aria-label="Live protocol ticker">
      <div className="ops-ticker-track">
        {items.concat(items).map((item, index) => (
          <span key={`${item.id}-${index}`} className={`ops-pill ops-pill-${item.tone}`}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
