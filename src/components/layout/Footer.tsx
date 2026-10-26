import { TransitionLink } from "@/components/motion/TransitionLink";
import { Arcade } from "@/components/ui/Arcade";
import { Logo } from "@/components/ui/Logo";
import { type Dictionary, routes } from "@/i18n";

/** Slim footer: logo, social links, sister venue, and the legal mentions as small print (no separate page). */
export function Footer({ dict }: { dict: Dictionary }) {
  const f = dict.footer;
  return (
    <footer className="theme-wood wood-grain relative bg-surface text-fg">
      <Arcade className="text-wood-dark" />
      <div className="container-x py-8 md:py-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <TransitionLink href={routes.home} aria-label={dict.a11y.home} className="text-fg">
            <Logo className="w-[260px]" />
          </TransitionLink>
        </div>

        <p className="mt-5 text-muted text-sm">{f.sister}</p>

        <p className="mt-5 border-rule border-t pt-4 text-muted text-xs">
          © {new Date().getFullYear()} Maison L
        </p>
      </div>
    </footer>
  );
}
