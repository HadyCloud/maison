import { HoursTable } from "@/components/layout/HoursTable";
import { LineReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { site, telHref } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { MapPlan } from "./MapPlan";

export function Reserve({ dict }: { dict: Dictionary }) {
  const r = dict.reserve;
  return (
    <section
      id="contact"
      aria-labelledby="reserve-title"
      className="bg-graphite-900 py-[clamp(6rem,12vw,11rem)]"
    >
      <div className="container-x">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <LineReveal
              as="h2"
              className="display text-display text-silver-100"
              lines={[
                <em key="t" className="italic">
                  {r.title}
                </em>,
              ]}
            />
            <span id="reserve-title" className="sr-only">
              {r.title}
            </span>
            <p className="label mt-12 text-graphite-400">{r.byPhone}</p>
            <a
              href={telHref()}
              className="display mt-3 inline-block text-[clamp(2.5rem,5.4vw,5.5rem)] text-silver-100 leading-none tabular transition-opacity duration-500 hover:opacity-70"
              aria-label={`${site.phone.primary.display}, ${dict.a11y.phoneCall}`}
              data-testid="reserve-phone"
            >
              {site.phone.primary.display}
            </a>
            {site.reservationUrl && (
              <div className="mt-8">
                <ButtonLink href={site.reservationUrl} variant="fill" testId="reserve-online">
                  {r.online}
                </ButtonLink>
              </div>
            )}
            <div className="mt-16 max-w-xl">
              <MapPlan dict={dict} />
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-12 lg:col-span-5 lg:col-start-8 lg:pt-6">
            <div>
              <p className="label mb-4 text-graphite-400">{r.address}</p>
              <address className="text-lead text-silver-200 not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postalCode.value} {site.address.city}
              </address>
              <p className="label mt-2 text-graphite-400">{site.address.metro}</p>
              <ButtonLink href={site.google.directionsUrl} variant="underline" className="mt-3">
                {r.directions} ↗
              </ButtonLink>
            </div>
            <div>
              <p className="label mb-4 text-graphite-400">{r.hours}</p>
              <HoursTable dict={dict} />
              {!site.hours.confirmed && <p className="mt-3 text-graphite-400 text-xs">{r.hoursNote}</p>}
            </div>
          </div>
        </div>

        <div className="grid-12 mt-24 items-center gap-y-6 border-graphite-700 border-y py-10">
          <p className="label col-span-12 text-graphite-400 md:col-span-2">{r.privatisation.label}</p>
          <p className="display col-span-12 text-title text-silver-100 md:col-span-7">
            <Emphasis text={r.privatisation.line} />
          </p>
          <div className="col-span-12 md:col-span-3 md:justify-self-end">
            <ButtonLink href={telHref()} variant="outline">
              {r.privatisation.cta}
            </ButtonLink>
          </div>
        </div>

        <ul className="label mt-8 flex flex-wrap gap-x-0 gap-y-3 text-silver-300">
          {r.amenities.map((a, i) => (
            <li key={a} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="mx-5 h-3 w-px bg-graphite-700" />}
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
