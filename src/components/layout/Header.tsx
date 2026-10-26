"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Logo } from "@/components/ui/Logo";
import { type Dictionary, routes } from "@/i18n";
import { cn } from "@/lib/format";
import { LangToggle } from "./LangToggle";
import { navItems } from "./nav";
import { Ticker } from "./Ticker";

/**
 * Fixed header: wood ticker on top, then the nav. The nav is transparent with light text over the hero and turns
 * beige with green text once the page scrolls. Desktop: one row. Phone: logo + FR · EN on top, the links below
 * (no hamburger: everything stays visible).
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
        <div className="container-x grid h-full grid-cols-[1fr_auto] grid-rows-[3.5rem_2.75rem] items-center lg:flex lg:grid-rows-none lg:gap-10 xl:gap-14">
          <TransitionLink
            href={routes.home}
            aria-label={dict.a11y.home}
            className="flex items-center text-fg"
          >
            <Logo className="w-[176px] sm:w-[220px] lg:w-[236px] xl:w-[300px]" />
          </TransitionLink>

          <LangToggle dict={dict} className="lg:order-3" />

          <nav aria-label={dict.a11y.primaryNav} className="col-span-2 lg:order-2 lg:col-auto lg:ml-auto">
            <ul className="flex h-11 items-center justify-between border-fg/20 border-t text-[0.6875rem] uppercase tracking-[0.22em] lg:h-auto lg:justify-start lg:gap-10 lg:border-0 lg:text-[0.8125rem] lg:tracking-[0.3em] xl:gap-14">
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
        </div>
      </div>
    </header>
  );
}
