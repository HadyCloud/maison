"use client";

import { useEffect, useRef, useState } from "react";
import type { PreviewImage } from "./HoverPreview";

type Open = { id: string; title: string };

/**
 * Full-screen photo sheet. Opens from any `[data-sheet]` button (mobile thumbnails, desktop "◉ PHOTO"
 * markers) by delegation. Native <dialog>: focus is trapped and Escape closes.
 */
export function PhotoSheet({
  images,
  closeLabel,
}: {
  images: Record<string, PreviewImage & { large: string; largeAvif: string }>;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-sheet]") : null;
      const id = btn?.dataset.sheet;
      if (!btn || !id || !images[id]) return;
      setOpen({ id, title: btn.dataset.sheetTitle ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [images]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const img = open ? images[open.id] : undefined;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click only; native <dialog> already closes on Escape
    <dialog
      ref={ref}
      onClose={() => setOpen(null)}
      onClick={(e) => e.target === ref.current && setOpen(null)}
      aria-label={open?.title}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink/97 p-0 text-silver-100 backdrop:bg-ink/80"
      data-testid="photo-sheet"
    >
      {img && open && (
        <div className="flex h-full flex-col">
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between border-graphite-700 border-b">
            <p className="label text-silver-200">{open.title}</p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="label inline-flex min-h-11 items-center text-silver-100"
            >
              {closeLabel}
            </button>
          </div>
          <picture className="flex min-h-0 flex-1 items-center justify-center p-[var(--gutter)]">
            <source type="image/avif" srcSet={img.largeAvif} />
            <img src={img.large} alt={img.alt} className="max-h-full max-w-full object-contain" />
          </picture>
        </div>
      )}
    </dialog>
  );
}
