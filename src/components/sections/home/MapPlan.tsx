import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

/**
 * A live OpenStreetMap map (the standard embed, no account or key) in a plain rounded frame with a thin oak outline. It loads lazily, so nothing is requested from OpenStreetMap until the visitor
 * scrolls close to it. The map itself can be dragged and zoomed natively.
 */
export function MapPlan({ dict }: { dict: Dictionary }) {
  const { lat, lng } = site.address.geo;
  const dLng = 0.0075;
  const dLat = 0.0038;
  const bbox = [lng - dLng, lat - dLat, lng + dLng, lat + dLat].map((n) => n.toFixed(5)).join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <figure className="relative mx-auto w-full max-w-xs lg:max-w-none">
      <div className="overflow-hidden rounded-2xl bg-accent/70 p-[3px] max-md:bg-wood-light/70">
        <div className="aspect-[3/2] overflow-hidden rounded-[0.8rem] bg-paper-deep lg:aspect-[6/5]">
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
