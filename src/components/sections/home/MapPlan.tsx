import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";

/**
 * A live Google map (the standard keyless embed) shown through the pointed-arch window, the same arch as the section
 * transitions, with a thin oak outline. It loads lazily, so nothing is requested from Google until the visitor
 * scrolls close to it. The map itself can be dragged and zoomed natively.
 */
export function MapPlan({ dict }: { dict: Dictionary }) {
  const arch = { clipPath: "url(#arch-window)" };
  const place = `Maison L, ${site.address.street}, ${site.address.postalCode.value} ${site.address.city}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(place)}&hl=${dict.lang}&z=16&output=embed`;
  return (
    <figure className="mx-auto w-full max-w-xs lg:max-w-none">
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <clipPath id="arch-window" clipPathUnits="objectBoundingBox">
          <path d="M0 1V0.34C0 0.18 0.36 0.14 0.5 0C0.64 0.14 1 0.18 1 0.34V1Z" />
        </clipPath>
      </svg>
      <div className="bg-accent/70 p-[3px] max-md:bg-wood-light/70" style={arch}>
        <div className="aspect-[3/2] bg-paper-deep lg:aspect-[6/5]" style={arch}>
          <iframe
            src={src}
            title={dict.info.mapAlt}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block size-full border-0 [filter:sepia(0.18)_saturate(0.9)]"
          />
        </div>
      </div>
    </figure>
  );
}
