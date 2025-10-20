"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { Banner } from "@/components/Banner";
import { Navbar } from "@/components/navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import { ProdiProvider } from "./context/ProdiContext";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/" && mainRef.current) {
        const navbarOffset = 80;
        const elementPosition = mainRef.current.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    const timer = setTimeout(handleScroll, 100);

    return () => clearTimeout(timer);
  }, [pathname]);
  const hiddenRoutes = pathname.startsWith("/dashboard") || pathname.startsWith("/aktivitas-mahasiswa/berita") || pathname.startsWith("/aktivitas-mahasiswa/pengumuman");
  const isPathname = hiddenRoutes;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="w-screen sticky top-0 z-11 bg-black/10">
        <Navbar />
      </div>
      <ProdiProvider>
        <Banner />

        {!isPathname && (
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,160L60,144C120,128,240,96,360,122.7C480,149,600,235,720,250.7C840,267,960,213,1080,197.3C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#0A0950"
              fillOpacity="1"
            />
          </svg>
        )}

        <main ref={mainRef} className="container mx-auto flex-grow text-foreground bg-background">
          {children}
        </main>
      </ProdiProvider>
      <ConditionalFooter />
    </div>
  );
}
