import { ImageReveal } from "@/components/motion/ImageReveal";
import { Picture } from "@/components/ui/Picture";
import { photoById } from "@/content/photo-map";
import type { Dictionary, Lang } from "@/i18n";

/** Full-bleed pause between signatures and reviews: the whole table, from above. */
export function Interlude({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const photo = photoById("table-zenith");
  return (
    <figure>
      <ImageReveal className="h-[78svh] min-h-[420px] w-full" parallax={8}>
        <Picture id="table-zenith" alt={photo?.alt[lang] ?? ""} sizes="100vw" className="h-full w-full" />
      </ImageReveal>
    </figure>
  );
}
