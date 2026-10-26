"use client";

import { useLenis } from "lenis/react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

export type IndexEntry = { id: string; title: string };

/**
 * Scroll-spy over the menu sections + overall progress through #menu-list.
 * Behaviour informed by 21st.dev "Scroll Spy" (ddoemonn) — rewritten and restyled (docs/COMPONENTS.md).
 */
export function useMenuSpy(entries: IndexEntry[]) {
  const [active, setActive] = useState(entries[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const sections = entries.map((e) => document.getElementById(e.id)).filter((el) => el !== null);
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

    const list = document.getElementById("menu-list");
    const onScroll = () => {
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight * 0.5);
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.3 - rect.top) / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [entries]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string, offset: number) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset });
    else target.scrollIntoView();
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return { active, progress, go };
}

/** Mobile: sticky horizontal chips under the header. Must be a direct child of the tall grid. */
export function MenuChips({ entries, label }: { entries: IndexEntry[]; label: string }) {
  const { active, go } = useMenuSpy(entries);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = ref.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (row && chip)
      row.scrollTo({
        left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2,
        behavior: "smooth",
      });
  }, [active]);

  return (
    <nav
      aria-label={label}
      data-testid="menu-chips"
      className="sticky top-[var(--header-h)] z-30 col-span-12 -mx-[var(--gutter)] self-start border-line border-b bg-forest/95 backdrop-blur-md lg:hidden"
    >
      <div ref={ref} className="flex gap-5 overflow-x-auto px-[var(--gutter)] py-1 [scrollbar-width:none]">
        {entries.map((e) => (
          <a
            key={e.id}
            href={`#${e.id}`}
            data-chip={e.id}
            onClick={(ev) => go(ev, e.id, -140)}
            aria-current={active === e.id ? "true" : undefined}
            className={cn(
              "label inline-flex min-h-10 shrink-0 items-center border-b px-0.5 transition-colors duration-500",
              active === e.id ? "border-white text-white" : "border-transparent text-sage-light",
            )}
          >
            {e.title}
          </a>
        ))}
      </div>
    </nav>
  );
}

/** Desktop: sticky category index with a thin progress hairline. */
export function MenuIndex({ entries, label }: { entries: IndexEntry[]; label: string }) {
  const { active, progress, go } = useMenuSpy(entries);
  return (
    <nav aria-label={label} className="sticky top-[calc(var(--header-h)+3rem)]" data-testid="menu-index">
      <div className="relative pl-6">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-line" />
        <span
          aria-hidden="true"
          data-testid="menu-progress"
          className="absolute inset-y-0 left-0 w-px origin-top bg-white"
          style={{ transform: `scaleY(${progress})` }}
        />
        <ol className="flex flex-col gap-1">
          {entries.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                onClick={(ev) => go(ev, e.id, -96)}
                aria-current={active === e.id ? "true" : undefined}
                className={cn(
                  "label flex min-h-8 items-center gap-4 transition-colors duration-500",
                  active === e.id ? "text-white" : "text-sage-light hover:text-cream-light",
                )}
              >
                <span>{e.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px flex-1 origin-left bg-white transition-transform duration-700 ease-house",
                    active === e.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
