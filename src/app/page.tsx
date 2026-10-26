import { HomePage } from "@/components/sections/home/HomePage";
import { getDictionary, type Lang } from "@/i18n";
import { getLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const dict = getDictionary(await getLang());
  return pageMetadata({
    lang: dict.lang as Lang,
    route: "home",
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

export default async function Page() {
  return <HomePage dict={getDictionary(await getLang())} />;
}
