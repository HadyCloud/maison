"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/format";
import { formatStatus, getServiceStatus, zonedNow } from "@/lib/hours";

/** Live "CE SOIR · 19H – 23H" line, computed in Europe/Paris on the client (never stale from the build). */
export function ServiceStatus({ dict, className }: { dict: Dictionary; className?: string }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setText(formatStatus(getServiceStatus(zonedNow(new Date(), site.timeZone), site.hours.week), dict));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [dict]);

  return (
    <p
      className={cn("label flex items-center gap-3 text-cream-light", className)}
      data-testid="service-status"
    >
      <span className="tabular min-h-[1.4em]">{text ?? " "}</span>
    </p>
  );
}
