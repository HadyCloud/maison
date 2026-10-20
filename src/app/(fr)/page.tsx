import { HomePage } from "@/components/sections/home/HomePage";
import { fr } from "@/i18n/fr";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "fr",
  route: "home",
  title: fr.meta.title,
  description: fr.meta.description,
});

export default function Page() {
  return <HomePage dict={fr} />;
}
