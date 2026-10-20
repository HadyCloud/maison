import { LineReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { menuItemById, signatureIds } from "@/content/menu";
import { type Dictionary, type Lang, routes } from "@/i18n";
import { SignatureCard } from "./SignatureCard";
import { SignaturesTrack } from "./SignaturesTrack";

export function Signatures({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Lang;
  const items = signatureIds.map((id) => menuItemById(id)).filter((i) => i !== undefined);
  return (
    <section
      id="signatures"
      aria-labelledby="signatures-title"
      className="bg-ink pt-[clamp(6rem,12vw,11rem)] pb-24 lg:pb-0"
    >
      <SignaturesTrack>
        <div className="flex flex-col justify-between gap-10 md:col-span-2 lg:col-span-1 lg:w-[26vw] lg:shrink-0 lg:self-stretch lg:pt-6">
          <div>
            <LineReveal
              as="h2"
              className="display text-headline text-silver-100"
              lines={[<Emphasis key="t" text={dict.signatures.title} />]}
            />
            <span id="signatures-title" className="sr-only">
              {dict.signatures.label}
            </span>
            <p className="mt-6 max-w-xs text-lead text-silver-300">{dict.signatures.intro}</p>
          </div>
          <ButtonLink href={routes.menu[lang]} variant="underline" className="self-start">
            {dict.signatures.all} →
          </ButtonLink>
        </div>
        {items.map((item, i) => (
          <SignatureCard key={item.id} item={item} index={i} lang={lang} priceTbd={dict.menuPage.priceTbd} />
        ))}
        <div aria-hidden="true" className="hidden w-[4vw] shrink-0 [.w-max>&]:block" />
      </SignaturesTrack>
    </section>
  );
}
