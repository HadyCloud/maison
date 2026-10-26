import "server-only";
import { cookies } from "next/headers";
import { LANG_COOKIE, type Lang, parseLang } from "@/i18n";

/** The visitor's language: the cookie set by the language button, otherwise French. */
export async function getLang(): Promise<Lang> {
  return parseLang((await cookies()).get(LANG_COOKIE)?.value);
}
