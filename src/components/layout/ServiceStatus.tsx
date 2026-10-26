"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/format";
import { formatStatus, getServiceStatus, zonedNow } from "@/lib/hours";

type State = { text: string; open: boolean };

/**
 * Live "CE SOIR, DE 19H À 22H30" pill with an open/closed dot, computed in Europe/Paris on the client
 * (never stale from the build). Lives at the right end of the top strip.
 */
export function ServiceStatus({ dict, className }: { dict: Dictionary; className?: string }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const tick = () => {
      const status = getServiceStatus(zonedNow(new Date(), site.timeZone), site.hours.week);
      setState({ text: formatStatus(status, dict), open: status.kind === "today" && status.open });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [dict]);

  return (
    <p
      className={cn(
        "label flex min-h-6 items-center gap-2 whitespace-nowrap rounded-full border border-fg/30 bg-surface px-3 py-0.5 text-fg",
        className,
      )}
      data-testid="service-status"
      data-open={state?.open ?? false}
    >
      <span
        aria-hidden="true"
        className={cn("block size-1.5 rounded-full", state?.open ? "bg-[#a6d17f]" : "bg-wood-light")}
      />
      <span className="tabular">{state?.text ?? "\u00a0"}</span>
    </p>
  );
}
