import { LegalPage } from "@/components/sections/LegalPage";
import { en } from "@/i18n/en";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  lang: "en",
  route: "legal",
  title: en.meta.legalTitle,
  description: en.meta.description,
});

export default function Page() {
  return <LegalPage dict={en} />;
}
