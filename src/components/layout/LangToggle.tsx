"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { alternatePath, type Dictionary, type Lang } from "@/i18n";
import { cn } from "@/lib/format";

export function LangToggle({ dict, className }: { dict: Dictionary; className?: string }) {
  const pathname = usePathname();
  const current = dict.lang as Lang;
  const other: Lang = current === "fr" ? "en" : "fr";
  return (
    <div className={cn("label flex items-center gap-2", className)}>
      <span aria-current="true" className="text-white">
        {dict.nav.langCurrent}
      </span>
      <span aria-hidden="true" className="text-sage">
        /
      </span>
      <TransitionLink
        href={alternatePath(pathname, other)}
        hrefLang={other}
        lang={other}
        aria-label={`${dict.nav.langShort}, ${dict.a11y.langSwitch}`}
        className="inline-flex min-h-6 min-w-6 items-center text-sage-light transition-colors duration-500 hover:text-white"
        data-testid="lang-toggle"
      >
        {dict.nav.langShort}
      </TransitionLink>
    </div>
  );
}
