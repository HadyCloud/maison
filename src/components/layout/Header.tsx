"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Logo } from "@/components/ui/Logo";
import { type Dictionary, routes } from "@/i18n";
import { cn } from "@/lib/format";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./nav";
import { Ticker } from "./Ticker";

/**
 * Fixed header: wood ticker on top, then the nav row. The nav row is transparent with light text over the hero
 * and turns beige with green text once the page scrolls (no backdrop blur: it would trap the mobile overlay).
 */
export function Header({ dict }: { dict: Dictionary }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  return (
    <header className="fixed inset-x-0 top-0 z-[75]">
      <Ticker dict={dict} />
      <div
        className={cn(
          "h-[var(--nav-h)] border-b text-fg transition-[background-color,border-color,color] duration-700 ease-house",
          scrolled ? "theme-paper border-rule bg-surface" : "theme-forest border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <TransitionLink
            href={routes.home}
            aria-label={dict.a11y.home}
            className="flex shrink-0 items-center text-fg"
          >
            <Logo className="w-[176px] sm:w-[260px] lg:w-[236px] xl:w-[300px]" />
          </TransitionLink>

          <div className="flex items-center gap-10 xl:gap-14">
            <nav aria-label={dict.a11y.primaryNav} className="hidden lg:block">
              <ul className="flex items-center gap-10 text-[0.8125rem] uppercase tracking-[0.3em] xl:gap-14">
                {navItems(dict).map((item) => (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      className="group relative inline-flex min-h-11 items-center text-fg transition-colors duration-500"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-2.5 h-px origin-right scale-x-0 bg-accent transition-transform duration-700 ease-house group-hover:origin-left group-hover:scale-x-100"
                      />
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <LangToggle dict={dict} className="hidden lg:flex" />
            <MobileMenu dict={dict} />
          </div>
        </div>
      </div>
    </header>
  );
}
