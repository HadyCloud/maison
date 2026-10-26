import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

/**
 * A live OpenStreetMap map (the standard embed, no account or key) shown through the pointed-arch window, the same arch as the section
 * transitions, with a thin oak outline. It loads lazily, so nothing is requested from OpenStreetMap until the visitor
 * scrolls close to it. The map itself can be dragged and zoomed natively.
 */
export function MapPlan({ dict }: { dict: Dictionary }) {
  const arch = { clipPath: "url(#arch-window)" };
  const { lat, lng } = site.address.geo;
  const dLng = 0.0075;
  const dLat = 0.0038;
  const bbox = [lng - dLng, lat - dLat, lng + dLng, lat + dLat].map((n) => n.toFixed(5)).join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <figure className="relative mx-auto w-full max-w-xs lg:max-w-none">
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <clipPath id="arch-window" clipPathUnits="objectBoundingBox">
          <path d="M0 1V0.34C0 0.18 0.36 0.14 0.5 0C0.64 0.14 1 0.18 1 0.34V1Z" />
        </clipPath>
      </svg>
      <div className="bg-accent/70 p-[3px] max-md:bg-wood-light/70" style={arch}>
        <div className="aspect-[3/2] bg-paper-deep lg:aspect-[6/5]" style={arch}>
          {/* biome-ignore lint/a11y/useIframeTitle: a title would show as a hover tooltip over the map; aria-label names it instead */}
          <iframe
            src={src}
            aria-label={dict.info.mapAlt}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block size-full border-0 [filter:sepia(0.18)_saturate(0.9)]"
          />
        </div>
      </div>
      <p className="label pointer-events-none absolute inset-x-0 bottom-3 flex justify-center md:bottom-4">
        <a
          dir="ltr"
          href={site.google.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${dict.info.directions}, ${site.address.street}`}
          className="pointer-events-auto bg-paper px-4 py-2 text-[0.625rem] text-forest shadow-sm"
        >
          {site.address.street} ↗
        </a>
      </p>
    </figure>
  );
}
