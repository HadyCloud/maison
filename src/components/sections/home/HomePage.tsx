import type { Dictionary } from "@/i18n";
import { Chef } from "./Chef";
import { Hero } from "./Hero";
import { Interlude } from "./Interlude";
import { Reserve } from "./Reserve";
import { Reviews } from "./Reviews";
import { Signatures } from "./Signatures";
import { Story } from "./Story";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Hero dict={dict} />
      <Story dict={dict} />
      <Chef dict={dict} />
      <Signatures dict={dict} />
      <Interlude dict={dict} />
      <Reviews dict={dict} />
      <Reserve dict={dict} />
    </>
  );
}
