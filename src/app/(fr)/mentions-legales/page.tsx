import { LegalPage } from "@/components/sections/LegalPage";
import { fr } from "@/i18n/fr";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "fr",
  route: "legal",
  title: fr.meta.legalTitle,
  description: fr.meta.description,
});

export default function Page() {
  return <LegalPage dict={fr} />;
}
