import type { ReactNode } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/format";

type Variant = "fill" | "outline" | "underline";

const base =
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-3 overflow-hidden label transition-colors duration-700 ease-house";

// Colours come from the surrounding band (theme-paper, theme-forest…), so one button works on every background.
const variants: Record<Variant, string> = {
  fill: "bg-fg px-6 text-surface hover:text-fg focus-visible:text-fg",
  outline: "border border-fg/50 px-5 text-fg hover:text-surface focus-visible:text-surface",
  underline: "px-0 text-fg",
};

function Fill({ variant }: { variant: Variant }) {
  if (variant === "underline") {
    return (
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-2 left-0 h-px origin-right scale-x-100 bg-fg/60 transition-transform duration-700 ease-house group-hover/btn:origin-left group-hover/btn:bg-fg"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-0 origin-bottom transition-transform duration-700 ease-house",
        variant === "fill"
          ? "scale-y-0 bg-surface group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
          : "scale-y-0 bg-fg group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100",
      )}
    />
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** External, tel: and mailto: links skip the page curtain. */
  external?: boolean;
  ariaLabel?: string;
  testId?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "fill",
  className,
  external,
  ariaLabel,
  testId,
}: Props) {
  const content = (
    <>
      <Fill variant={variant} />
      <span className="relative">{children}</span>
    </>
  );
  const cls = cn(base, variants[variant], variant === "fill" && "border border-fg", className);
  const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        data-testid={testId}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={cls} aria-label={ariaLabel} data-testid={testId}>
      {content}
    </TransitionLink>
  );
}
