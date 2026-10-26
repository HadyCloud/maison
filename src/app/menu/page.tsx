import { MenuPage } from "@/components/sections/menu/MenuPage";
import { getDictionary, type Lang } from "@/i18n";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const dict = getDictionary(await getLang());
  return pageMetadata({
    lang: dict.lang as Lang,
    route: "menu",
    title: dict.meta.menuTitle,
    description: dict.meta.menuDescription,
  });
}

export default async function Page() {
  return <MenuPage dict={getDictionary(await getLang())} />;
}
