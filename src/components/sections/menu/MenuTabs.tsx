"use client";

import { useLenis } from "lenis/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

export type Tab = { id: string; title: string };

/** Sticky category tabs under the header; the active one follows the scroll position. */
export function MenuTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const rowRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter((el) => el !== null);
    const io = new IntersectionObserver(
      (records) => {
        const hit = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    for (const s of sections) io.observe(s);
    return () => io.disconnect();
  }, [tabs]);

  useEffect(() => {
    const row = rowRef.current;
    const tab = row?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (row && tab) {
      row.scrollTo({ left: tab.offsetLeft - row.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -140 });
    else target.scrollIntoView();
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav
      aria-label={label}
      data-testid="menu-tabs"
      className="sticky top-[var(--header-h)] z-30 border-rule border-b bg-surface"
    >
      <div
        ref={rowRef}
        className="container-x flex gap-6 overflow-x-auto py-1 [scrollbar-width:none] max-md:gap-2 max-md:py-2"
      >
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            data-tab={t.id}
            onClick={(e) => go(e, t.id)}
            aria-current={active === t.id ? "true" : undefined}
            className={cn(
              "label inline-flex min-h-11 shrink-0 items-center border-b px-0.5 transition-colors duration-500 max-md:min-h-9 max-md:rounded-full max-md:border-0 max-md:px-4",
              active === t.id
                ? "border-accent text-fg max-md:bg-forest max-md:text-paper"
                : "border-transparent text-muted max-md:bg-paper-deep",
            )}
          >
            {t.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
