"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { langFromPath } from "@/i18n";
import { useCurtainNavigate } from "./Curtain";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Internal link that plays the page curtain, smooth-scrolls same-page anchors with Lenis,
 * and does a hard load when switching language (FR/EN live under different root layouts).
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const navigate = useCurtainNavigate();
  const pathname = usePathname();
  const lenis = useLenis();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();

    const samePage = (url.pathname.replace(/\/$/, "") || "/") === (pathname.replace(/\/$/, "") || "/");
    if (samePage) {
      if (!url.hash) {
        lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 });
        return;
      }
      const target = document.querySelector(url.hash);
      if (target instanceof HTMLElement) {
        lenis ? lenis.scrollTo(target, { offset: -80 }) : target.scrollIntoView();
        history.replaceState(null, "", url.hash);
        target.focus({ preventScroll: true });
      }
      return;
    }
    navigate(url.pathname + url.hash, { hard: langFromPath(url.pathname) !== langFromPath(pathname) });
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
