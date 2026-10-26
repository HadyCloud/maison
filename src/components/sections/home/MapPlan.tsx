import { existsSync } from "node:fs";
import { join } from "node:path";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

const PLAN = "/images/plan-gambetta.svg";

/**
 * Architectural street plan drawn from OpenStreetMap data by scripts/map.ts — a static, lazy-loaded SVG,
 * so no map library, tile server or inline path data ships with the page.
 */
export function MapPlan({ dict }: { dict: Dictionary }) {
  const hasPlan = existsSync(join(process.cwd(), "public", PLAN));
  return (
    <figure>
      <a
        href={site.google.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${dict.info.directions}, ${dict.info.mapAlt}`}
        className="block"
      >
        {hasPlan ? (
          <img
            src={PLAN}
            alt={dict.info.mapAlt}
            width={1240}
            height={920}
            loading="lazy"
            decoding="async"
            className="block aspect-[4/3] h-auto w-full bg-paper object-cover"
          />
        ) : (
          <PhotoPlaceholder label="Plan · Gambetta" className="aspect-[4/3] w-full" />
        )}
      </a>
      <figcaption className="label mt-3 flex items-center justify-between gap-4 text-muted">
        <span>
          {site.address.street} · {site.address.metro}
        </span>
        <span className="text-[0.625rem]">© OpenStreetMap</span>
      </figcaption>
    </figure>
  );
}
