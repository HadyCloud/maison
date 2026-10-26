import type { Dictionary } from "@/i18n";
import { Hero } from "./Hero";
import { Info } from "./Info";
import { Signatures } from "./Signatures";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Hero dict={dict} />
      <Signatures dict={dict} />
      <Info dict={dict} />
    </>
  );
}
