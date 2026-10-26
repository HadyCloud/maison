"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { bookingHref } from "@/config/site";
import { type Dictionary, type Lang, routes } from "@/i18n";
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
  const lang = dict.lang as Lang;

  return (
    <header className="fixed inset-x-0 top-0 z-[75]">
      <Ticker dict={dict} />
      <div
        className={cn(
          "h-[var(--nav-h)] border-b text-fg transition-[background-color,border-color,color] duration-700 ease-house",
          scrolled ? "theme-paper border-rule bg-surface" : "theme-forest border-transparent bg-transparent",
        )}
      >
        <div className="container-x grid-12 h-full items-center">
          <TransitionLink
            href={routes.home[lang]}
            aria-label={dict.a11y.home}
            className="col-span-6 flex items-center text-fg sm:col-span-5 lg:col-span-3"
          >
            <Logo variant="mark" className="w-[132px] sm:w-[160px]" />
          </TransitionLink>

          <nav aria-label={dict.a11y.primaryNav} className="col-span-6 hidden lg:block">
            <ul className="label flex items-center gap-8">
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

          <div className="col-span-6 flex items-center justify-end gap-4 sm:col-span-7 sm:gap-5 lg:col-span-3 lg:gap-7">
            <LangToggle dict={dict} className="hidden lg:flex" />
            <ButtonLink
              href={bookingHref()}
              variant="outline"
              className="min-h-10 px-4"
              testId="header-reserve"
            >
              {dict.nav.reserve}
            </ButtonLink>
            <MobileMenu dict={dict} />
          </div>
        </div>
      </div>
    </header>
  );
}
