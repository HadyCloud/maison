import { MenuPage } from "@/components/sections/menu/MenuPage";
import { en } from "@/i18n/en";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "en",
  route: "menu",
  title: en.meta.menuTitle,
  description: en.meta.menuDescription,
});

export default function Page() {
  return <MenuPage dict={en} />;
}
