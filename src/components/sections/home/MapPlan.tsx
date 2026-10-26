import { existsSync } from "node:fs";
import { join } from "node:path";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

const PLAN = "/images/plan-gambetta.svg";

/**
 * Street plan drawn from OpenStreetMap data by scripts/map.ts: a static, lazy-loaded SVG (no map library, tile
 * server or inline path data). Shown in a pointed-arch window, the same arch as the section transitions,
 * with a thin oak outline around it.
 */
export function MapPlan({ dict }: { dict: Dictionary }) {
  const hasPlan = existsSync(join(process.cwd(), "public", PLAN));
  const arch = { clipPath: "url(#arch-window)" };
  return (
    <figure className="mx-auto w-full max-w-xl lg:max-w-none">
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <clipPath id="arch-window" clipPathUnits="objectBoundingBox">
          <path d="M0 1V0.34C0 0.18 0.36 0.14 0.5 0C0.64 0.14 1 0.18 1 0.34V1Z" />
        </clipPath>
      </svg>
      <div className="relative">
        <a
          href={site.google.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${dict.info.directions}, ${dict.info.mapAlt}`}
          className="block bg-accent p-[5px]"
          style={arch}
        >
          <div className="bg-paper-deep" style={arch}>
            {hasPlan ? (
              <img
                src={PLAN}
                alt={dict.info.mapAlt}
                width={1240}
                height={920}
                loading="lazy"
                decoding="async"
                className="block aspect-[5/4] h-auto w-full object-cover lg:aspect-[6/5]"
              />
            ) : (
              <PhotoPlaceholder label="Plan · Gambetta" className="aspect-[5/4] w-full lg:aspect-[6/5]" />
            )}
          </div>
        </a>
        <p className="label pointer-events-none absolute inset-x-0 bottom-3 flex justify-center md:bottom-4">
          <span className="bg-paper px-4 py-2 text-[0.625rem] text-forest">{site.address.street}</span>
        </p>
      </div>
      <figcaption className="label mt-2 text-right text-[0.625rem] text-muted">© OpenStreetMap</figcaption>
    </figure>
  );
}
