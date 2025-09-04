"use client";
import { Navbar as HeroUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { fontNavbar } from "@/config/fonts";

import { siteConfig } from "@/config/site";

import { TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon, SearchIcon, Logo } from "@/components/icons";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          {/* <Logo /> */}
          <Image src={"/ERD.png"} width={50} height={50} alt="logo" className="mr-2 " priority />
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
