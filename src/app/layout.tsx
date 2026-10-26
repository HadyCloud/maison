import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL } from "@/config/site";
import { getLang } from "@/lib/lang";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };
export const viewport: Viewport = { themeColor: "#2e431a", colorScheme: "dark" };

export default async function RootLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang={await getLang()}>{children}</SiteShell>;
}
