"use client";

import type { ReactNode } from "react";

/**
 * Phones and tablets: the intro on top, then the dishes as a swipeable row that snaps card by card.
 * Desktop (≥1024px) uses SignaturesAccordion instead, so this is hidden there.
 */
export function SignaturesTrack({ intro, children }: { intro: ReactNode; children: ReactNode }) {
  return (
    <div className="relative pt-[var(--band-gap)] lg:hidden">
      <div className="container-x">{intro}</div>
      <div className="flex snap-x snap-mandatory flex-row items-start gap-5 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pt-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden [&>article]:w-[72vw] [&>article]:max-w-[21rem] [&>article]:shrink-0 [&>article]:snap-start">
        {children}
      </div>
    </div>
  );
}
