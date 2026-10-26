"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { site, telHref } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { LangToggle } from "./LangToggle";
import { navItems } from "./nav";
import { useFocusTrap } from "./useFocusTrap";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen overlay menu (mobile). Structure, clip-path wipe and focus trap adapted from
 * 21st.dev "Immersive Full Screen Navigation" — rebuilt on Motion, restyled to the house tokens.
 */
export function MobileMenu({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = next ? "hidden" : "";
  };
  useFocusTrap(open, rootRef, () => toggle(false));

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
        className="label relative z-[76] inline-flex min-h-11 min-w-11 items-center justify-end text-white"
        data-testid="menu-toggle"
      >
        {open ? (dict.lang === "fr" ? "Fermer" : "Close") : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label={dict.a11y.primaryNav}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-forest-deep container-x pt-[calc(var(--header-h)+2rem)] pb-8"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE }}
          >
            <ul className="flex flex-1 flex-col border-line border-t">
              {navItems(dict).map((item, i) => (
                <li key={item.href} className="overflow-hidden border-line border-b">
                  <m.div
                    initial={reduce ? { opacity: 0 } : { y: "110%" }}
                    animate={reduce ? { opacity: 1 } : { y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.35 + i * 0.07 }}
                  >
                    <TransitionLink
                      href={item.href}
                      onClick={() => toggle(false)}
                      className="display flex items-baseline justify-between py-3 text-[clamp(2.75rem,12vw,4.5rem)] leading-none text-white"
                    >
                      <span>{item.label}</span>
                    </TransitionLink>
                  </m.div>
                </li>
              ))}
            </ul>
            <m.div
              className="mt-10 grid gap-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.7 }}
            >
              <a href={telHref()} className="display text-3xl text-white">
                {site.phone.primary.display}
              </a>
              <p className="text-cream">
                {site.address.street}, {site.address.postalCode.value} {site.address.city}
                <br />
                <span className="label text-sage-light">{site.address.metro}</span>
              </p>
              <div className="flex items-center justify-between">
                <div className="label flex gap-5">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-light"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-light"
                  >
                    Facebook
                  </a>
                </div>
                <LangToggle dict={dict} />
              </div>
            </m.div>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
