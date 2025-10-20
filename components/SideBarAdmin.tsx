"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSlack, FiFolder, FiGlobe, FiLogOut, FiMenu, FiX, FiUser, FiBell } from "react-icons/fi";

import { removeAuthToken } from "@/lib/api";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Data Dosen", icon: FiSlack },
  { href: "/dashboard/data-riset", label: "Data Riset", icon: FiFolder },
  { href: "/dashboard/berita-mahasiswa", label: "Data Berita", icon: FiGlobe },
  { href: "/dashboard/pengumuman", label: "Data Pengumuman", icon: FiBell },
];

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    router.push("/sign-in");
  };

  const activeHref =
    mainNavItems
      .map((item) => item.href)
      .filter((href) => pathname.startsWith(href)) //
      .sort((a, b) => b.length - a.length)[0] ?? ""; //

  return (
    <div
      className={`relative flex-shrink-0 bg-white text-black flex flex-col transition-[width] duration-300 ease-in-out ${
        isOpen ? "w-68 p-4" : "w-24 p-4"
      }`}
    >
      <div className={`flex w-full items-center mb-5 ${isOpen ? "justify-between" : "justify-center"}`}>
        <div className={`overflow-hidden transition-all duration-0 ease-in-out ${isOpen ? "w-full" : "w-0"}`}>
          <h2 className="text-2xl font-bold whitespace-nowrap">Dashboard</h2>
        </div>
        <button
          onClick={toggle}
          className="p-1 rounded-full hover:bg-[#eeeeee] transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          type="button"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className={`flex w-full items-center border-y border-black py-2 ${isOpen ? "justify-start gap-4" : "justify-center"}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          <FiUser className="text-3xl text-black" />
        </div>
        {isOpen && <p className="font-semibold text-lg whitespace-nowrap">Admin</p>}
      </div>

      <nav className="flex-grow mt-4">
        <ul className="space-y-2">
          {mainNavItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <li key={item.label} className="w-full">
                <Link
                  href={item.href}
                  className={`flex w-full items-center h-16 rounded-md transition-colors duration-200 group ${
                    isOpen ? "px-5 justify-start" : "justify-center"
                  } ${
                    isActive ? "bg-[#eeeeee] font-bold" : "hover:bg-[#eeeeee] hover:font-bold"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400`}
                >
                  <item.icon size={25} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                  <div className={`overflow-hidden transition-all duration-0 ease-in-out ${isOpen ? "w-full ml-4" : "w-0 ml-0"}`}>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleLogout}
          className={`flex items-center h-16 rounded-md transition-colors duration-200 group text-danger hover:bg-danger/20 ${
            isOpen ? "justify-start px-5" : "justify-center"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400`}
        >
          <FiLogOut size={25} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? " ml-4" : "w-0 ml-0"}`}>
            <span className="whitespace-nowrap">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

