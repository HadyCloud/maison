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
        className="container-x mx-auto flex w-fit max-w-full gap-2 md:gap-1 overflow-x-auto py-2 [scrollbar-width:none]"
      >
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            data-tab={t.id}
            onClick={(e) => go(e, t.id)}
            aria-current={active === t.id ? "true" : undefined}
            className={cn(
              "label inline-flex shrink-0 items-center rounded-full px-4 md:px-3 transition-colors duration-500 min-h-9 border-0",
              active === t.id ? "bg-forest text-paper" : "bg-paper-deep text-muted hover:text-fg",
            )}
          >
            {t.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
