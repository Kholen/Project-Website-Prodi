import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import { Banner } from "@/components/Banner";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
// import { fontSans } from "@/config/fonts";
import { myFont } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import "../styles/globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen text-foreground bg-background antialiased", myFont.className)}>
        <div className="relative flex flex-col ">
          <div className="w-screen sticky top-0 z-11 bg-black/10">
            <Navbar />
          </div>

          <Banner />

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#0A0950"
              fillOpacity="1"
              d="M0,160L60,144C120,128,240,96,360,122.7C480,149,600,235,720,250.7C840,267,960,213,1080,197.3C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <main className="container mx-auto pt-10 px-6 flex-grow">{children}</main>
        </div>

        <div className="">
          <ConditionalFooter />
        </div>
        
      </body>
    </html>
  );
}
