import { TransitionLink } from "@/components/motion/TransitionLink";
import { Logo } from "@/components/ui/Logo";
import { site, telHref } from "@/config/site";
import { type Dictionary, type Lang, routes } from "@/i18n";
import { HoursTable } from "./HoursTable";

function Ext({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-6 items-center text-silver-200 transition-colors duration-500 hover:text-silver-100"
    >
      {children}
    </a>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-graphite-700 border-t bg-ink pt-20">
      <div className="container-x grid-12 gap-y-12">
        <div className="col-span-12 md:col-span-4">
          <p className="label mb-5 text-graphite-400">{dict.footer.visit}</p>
          <address className="text-silver-300 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.postalCode.value} {site.address.city}
            <br />
            <span className="label text-graphite-400">{site.address.metro}</span>
          </address>
          <a
            href={telHref()}
            className="display mt-6 block text-3xl text-silver-100"
            aria-label={`${site.phone.primary.display}, ${dict.a11y.phoneCall}`}
          >
            {site.phone.primary.display}
          </a>
        </div>

        <div className="col-span-12 md:col-span-4">
          <p className="label mb-5 text-graphite-400">{dict.reserve.hours}</p>
          <HoursTable dict={dict} />
        </div>

        <div className="col-span-12 flex flex-col gap-3 md:col-span-3 md:col-start-10">
          <p className="label mb-2 text-graphite-400">{dict.footer.follow}</p>
          <ul className="label flex flex-col gap-3">
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
              <Ext href={site.delivery.deliveroo}>{dict.footer.delivery}</Ext>
            </li>
          </ul>
        </div>

        <div className="col-span-12 flex flex-col gap-4 border-graphite-700 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-graphite-400 text-sm">
            {site.sister.url ? (
              <a href={site.sister.url} className="underline decoration-graphite-500 underline-offset-4">
                {dict.footer.sister}
              </a>
            ) : (
              dict.footer.sister
            )}
          </p>
          <ul className="label flex flex-wrap gap-x-6 gap-y-2 text-graphite-400">
            <li>
              <TransitionLink
                href={routes.legal[lang]}
                className="inline-flex min-h-6 items-center hover:text-silver-100"
              >
                {dict.footer.legal}
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href={`${routes.menu[lang]}#allergenes`}
                className="inline-flex min-h-6 items-center hover:text-silver-100"
              >
                {dict.footer.allergens}
              </TransitionLink>
            </li>
            <li className="inline-flex min-h-6 items-center">
              © {year} {site.legal.company}
            </li>
          </ul>
        </div>
      </div>

      {/* Giant logo, cropped by the bottom edge (decorative: the footer already names the house). */}
      <div aria-hidden="true" className="pointer-events-none container-x mt-20 select-none">
        <Logo variant="mark" className="w-full translate-y-[24%] text-graphite-800" />
      </div>
    </footer>
  );
}
