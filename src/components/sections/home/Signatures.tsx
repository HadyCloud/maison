import { LineReveal } from "@/components/motion/Reveal";
import { Arcade } from "@/components/ui/Arcade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { Ornament } from "@/components/ui/Ornament";
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
      className="theme-paper relative bg-surface pt-[clamp(6rem,12vw,11rem)] pb-24 lg:pb-0"
    >
      <Arcade className="text-paper" />
      <SignaturesTrack
        intro={
          <div className="flex flex-col justify-between gap-10 lg:w-[26vw] lg:shrink-0 lg:self-stretch lg:pt-6">
            <div>
              <LineReveal
                as="h2"
                className="display text-headline text-fg"
                lines={[<Emphasis key="t" text={dict.signatures.title} />]}
              />
              <span id="signatures-title" className="sr-only">
                {dict.signatures.label}
              </span>
              <Ornament className="mt-6" />
            </div>
            <ButtonLink href={routes.menu} variant="underline" className="self-start">
              {dict.signatures.all} →
            </ButtonLink>
          </div>
        }
      >
        {items.map((item, i) => (
          <SignatureCard key={item.id} item={item} index={i} lang={lang} priceTbd={dict.menuPage.priceTbd} />
        ))}
        <div aria-hidden="true" className="hidden w-[4vw] shrink-0 [.w-max>&]:block" />
      </SignaturesTrack>
    </section>
  );
}
