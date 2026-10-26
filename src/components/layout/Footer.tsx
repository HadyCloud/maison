import { TransitionLink } from "@/components/motion/TransitionLink";
import { Arcade } from "@/components/ui/Arcade";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { type Dictionary, routes } from "@/i18n";

function Ext({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-6 items-center text-fg transition-colors duration-500 hover:text-accent"
    >
      {children}
    </a>
  );
}

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
          <ul className="label flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <Ext href={site.social.instagram}>Instagram</Ext>
            </li>
            <li>
              <Ext href={site.social.facebook}>Facebook</Ext>
            </li>
            {site.social.tiktok && (
              <li>
                <Ext href={site.social.tiktok}>TikTok</Ext>
              </li>
            )}
            <li>
              <Ext href={site.delivery.deliveroo}>{f.delivery}</Ext>
            </li>
            <li>
              <TransitionLink
                href={`${routes.menu}#allergenes`}
                className="inline-flex min-h-6 items-center text-fg transition-colors duration-500 hover:text-accent"
              >
                {f.allergens}
              </TransitionLink>
            </li>
          </ul>
        </div>

        <p className="mt-5 text-muted text-sm">{f.sister}</p>

        <p className="mt-5 border-rule border-t pt-4 text-muted text-xs">
          © {new Date().getFullYear()} Maison L
        </p>
      </div>
    </footer>
  );
}
