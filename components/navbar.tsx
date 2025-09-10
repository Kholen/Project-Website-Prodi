"use client";
import { Navbar as HeroUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { fontNavbar } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <HeroUINavbar className="" maxWidth="xl" position="sticky">
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
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "transition-transform duration-300",
                  pathname === item.href ? "text-black font-bold" : "text-gray-600 font-medium hover:scale-110 hover:text-black"
                )}
                color="foreground"
                href={item.href}
              >
                <span>{item.label}</span>
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
    </HeroUINavbar>
  );
};
