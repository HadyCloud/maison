import { TransitionLink } from "@/components/motion/TransitionLink";
import { Arcade } from "@/components/ui/Arcade";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { type Dictionary, type Lang, routes } from "@/i18n";

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
  const lang = dict.lang as Lang;
  const f = dict.footer;
  const n = f.legalNotes;
  const l = site.legal;
  return (
    <footer className="theme-wood wood-grain relative bg-surface text-fg">
      <Arcade className="text-wood-dark" />
      <div className="container-x py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <TransitionLink href={routes.home[lang]} aria-label={dict.a11y.home} className="text-fg">
            <Logo variant="mark" className="w-[160px]" />
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
                href={`${routes.menu[lang]}#allergenes`}
                className="inline-flex min-h-6 items-center text-fg transition-colors duration-500 hover:text-accent"
              >
                {f.allergens}
              </TransitionLink>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-muted text-sm">{f.sister}</p>

        <div className="mt-8 flex flex-col gap-1.5 border-rule border-t pt-6 text-muted text-xs leading-relaxed">
          <p>
            © {new Date().getFullYear()} {l.company}, {n.capital} {l.capital}. {l.rcs}. TVA {l.vat}.{" "}
            {n.office} {l.registeredOffice}.
          </p>
          <p>
            {n.publisher} {l.representative.value}. {n.host} {l.host.name}, {l.host.address}.
          </p>
          <p>
            {n.privacy} {n.map}
          </p>
        </div>
      </div>
    </footer>
  );
}
