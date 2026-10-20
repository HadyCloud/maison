"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";

const HALF = 0.3; // 300 ms cover + 300 ms reveal = 600 ms
const EASE = [0.22, 1, 0.36, 1] as const;

type Navigate = (href: string, opts?: { hard?: boolean }) => void;
const CurtainContext = createContext<Navigate | null>(null);

export function useCurtainNavigate(): Navigate {
  const ctx = useContext(CurtainContext);
  return ctx ?? ((href) => window.location.assign(href));
}

/** Dark curtain between pages. Skipped (instant navigation) under prefers-reduced-motion. */
export function CurtainProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const fromPath = useRef(pathname);

  const navigate = useCallback<Navigate>(
    (href, opts) => {
      const go = () => (opts?.hard ? window.location.assign(href) : router.push(href));
      if (reduce) return go();
      fromPath.current = window.location.pathname;
      setPhase("cover");
      window.setTimeout(go, HALF * 1000);
    },
    [reduce, router],
  );

  useEffect(() => {
    if (phase !== "cover" || pathname === fromPath.current) return;
    setPhase("reveal");
    const t = window.setTimeout(() => setPhase("idle"), HALF * 1000 + 50);
    return () => window.clearTimeout(t);
  }, [pathname, phase]);

  return (
    <CurtainContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <m.div
            key="curtain"
            aria-hidden="true"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: phase === "cover" ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)" }}
            transition={{ duration: HALF, ease: EASE }}
          >
            <Logo variant="mark" className="w-[min(64vw,22rem)] text-silver-100" />
          </m.div>
        )}
      </AnimatePresence>
    </CurtainContext.Provider>
  );
}
