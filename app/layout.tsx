import "@/styles/globals.css";
import { Metadata } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Banner } from "@/components/Banner";
import { siteConfig } from "@/config/site";
// import { fontSans } from "@/config/fonts";
import { myFont } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background antialiased",
          myFont.className,
        )}
      >
        <div className="relative flex flex-col ">
          <div className="w-screen sticky top-0 z-11 bg-black/10">
            <Navbar />
          </div>

          <Banner />

          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,160L60,144C120,128,240,96,360,122.7C480,149,600,235,720,250.7C840,267,960,213,1080,197.3C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#0A0950"
              fillOpacity="1"
            />
          </svg>
          <main className="container mx-auto pt-10 px-6 flex-grow">
            {children}
          </main>
        </div>

        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://heroui.com?utm_source=next-app-template"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">footer</p>
          </Link>
        </footer>
      </body>
    </html>
  );
}
