"use client";
import { Navbar as HeroUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

import { fontNavbar } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathname = usePathname();
  // State untuk menyimpan hash aktif
  const [activeHash, setActiveHash] = useState("");

  // Effect untuk mendeteksi scroll dan mengupdate hash aktif
  useEffect(() => {
    const handleScroll = () => {
      const sections = siteConfig.navItems.filter((item) => item.href.startsWith("/#")).map((item) => item.href.substring(2)); // e.g., "Visi-Misi"

      let currentSection = "";

      for (const id of sections) {
        const element = document.getElementById(id);

        if (element) {
          const rect = element.getBoundingClientRect();
          // Check jika bagian atas elemen berada di dalam viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = id;
            break;
          }
        }
      }

      // jika di paling atas dan tidak ada section yang aktif, reset hash
      if (window.scrollY < 200 && currentSection === "") {
        setActiveHash("");
      } else if (currentSection) {
        setActiveHash(currentSection);
      }
    };

    // Set inisial hash jika ada di URL
    if (window.location.hash) {
      setActiveHash(window.location.hash.substring(1));
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);

      if (element) {
        const navbarOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        // Update manual URL hash tanpa reload
        window.history.pushState(null, "", `/#${id}`);
        setActiveHash(id);
      }
    } else if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveHash("");
    }
    // Untuk link ke halaman lain, biarkan default behavior
  };

  //agar tidak muncul pada sign in dan dashboard
  const adminPathname = pathname.startsWith("/dashboard") || pathname.startsWith("/aktivitas-mahasiswa/berita");
  const isHidden = pathname === "/sign-in" || adminPathname;
  //

  return (
    <HeroUINavbar className={`${isHidden && "hidden"}`} maxWidth="xl" position="sticky">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          {/* <Logo /> */}
          <Image priority alt="logo" className="mr-2 " height={50} src={"/ERD.png"} width={50} />
          <p className={clsx("font-bold text-inherit leading-none", fontNavbar.className)}>
            Sekolah Tinggi Teknologi Indonesia.
            <br /> Tanjungpinang
          </p>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ul className="hidden lg:flex gap-8 justify-start ml-2 main-nav">
          {siteConfig.navItems.map((item) => {
            // Check jika item adalah anchor link dan hash-nya aktif
            const isAnchorActive = item.href.startsWith("/#") && activeHash === item.href.substring(2);

            // Check jika path sesuai
            const isPathActive = pathname === item.href;

            let isActive = isPathActive || isAnchorActive;

            //case spesial: jika di homepage dan ada hash aktif, maka link home tidak aktif
            if (pathname === "/" && activeHash !== "" && item.href === "/") {
              isActive = false;
            }

            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "transition-transform duration-300",
                    isActive
                      ? "text-black font-bold" // style jika aktif
                      : "text-gray-600 font-medium hover:scale-110 hover:text-black" // style jika ga aktif
                  )}
                  color="foreground"
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  <span>{item.label}</span>
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>
    </HeroUINavbar>
  );
};
