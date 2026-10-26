import { cn } from "@/lib/format";

/**
 * A row of pointed arches that rises out of the top of a section into the band above it.
 * Place it first inside a `relative` section and colour it with the section's own colour (`text-paper`…).
 */
export function Arcade({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("arcade pointer-events-none absolute inset-x-0 top-px z-10 -translate-y-full", className)}
    />
  );
}
