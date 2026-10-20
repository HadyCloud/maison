import { HomePage } from "@/components/sections/home/HomePage";
import { en } from "@/i18n/en";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "en",
  route: "home",
  title: en.meta.title,
  description: en.meta.description,
});

export default function Page() {
  return <HomePage dict={en} />;
}
