import type { Dictionary } from "@/i18n";

/** Thin strip above the header: facts about the house, scrolling slowly. The second copy only fills the loop. */
export function Ticker({ dict }: { dict: Dictionary }) {
  const items = dict.ticker;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="label flex items-center whitespace-nowrap">
          <span className="px-6">{t}</span>
          <span aria-hidden="true" className="block size-1.5 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ticker theme-wood wood-grain flex h-[var(--ticker-h)] items-center overflow-hidden bg-surface text-fg">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
