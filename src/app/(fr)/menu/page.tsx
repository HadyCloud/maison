import { MenuPage } from "@/components/sections/menu/MenuPage";
import { fr } from "@/i18n/fr";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "fr",
  route: "menu",
  title: fr.meta.menuTitle,
  description: fr.meta.menuDescription,
});

export default function Page() {
  return <MenuPage dict={fr} />;
}
