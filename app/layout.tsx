import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { myFont } from "@/config/fonts";
import { LayoutClient } from "./layout-client";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/ERD.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen text-foreground bg-background antialiased", myFont.className)}>
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
