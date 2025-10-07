'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { 
  RiAccountCircleFill, 
  RiMenu2Line, 
  RiLogoutBoxLine,
  RiDashboardLine,
  RiBookReadFill,
  RiNewspaperFill
} from "react-icons/ri";
import { IoMenu } from "react-icons/io5";

// Tipe untuk props utama
type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

// Tipe untuk setiap item navigasi
type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

// Daftar item menu utama
const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Data Dosen', icon: RiDashboardLine },
  { href: '/dashboard/data-riset', label: 'Data Riset', icon: RiBookReadFill },
  { href: '/dashboard/berita-mahasiswa', label: 'Data Berita Mahasiswa', icon: RiNewspaperFill },
];

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside 
      className={`relative flex-shrink-0 bg-[#1a0050] text-white flex flex-col transition-[width] duration-300 ease-in-out ${
        isOpen ? 'w-72 p-6' : 'w-24 p-4'
      }`}
    >
      {/* Header Sidebar */}
      <div className={`flex w-full items-center mb-10 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        <div className={`overflow-hidden transition-all duration-0 ease-in-out ${isOpen ? 'w-full' : 'w-0'}`}>
          <h2 className="text-2xl font-bold whitespace-nowrap">
            Dashboard
          </h2>
        </div>
        <button 
          onClick={toggle} 
          className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        >
          {isOpen ? <RiMenu2Line size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Profil Admin */}
      <div className={`flex items-center mb-10 pb-5 border-b border-white/20 ${!isOpen && 'justify-center'}`}>
        <div className="w-12 h-12 rounded-full bg-[#6a00ff] flex-shrink-0">
            <RiAccountCircleFill className="text-5xl"/>
        </div>
        <div className={`overflow-hidden transition-all duration-0 ease-in-out ${isOpen ? 'w-full' : 'w-0'}`}>
            <p className="font-semibold text-lg whitespace-nowrap ps-4">Admin</p>
        </div>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {mainNavItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center h-12 rounded-md transition-colors duration-200 group ${
                  isOpen ? 'px-4 justify-start' : 'justify-center'
                } ${
                  pathname === item.href ? 'bg-white/20 font-bold' : 'hover:bg-white/10'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400`}
              >
                <item.icon size={30} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                <div className={`overflow-hidden transition-all duration-0 ease-in-out ${isOpen ? 'w-full ml-4' : 'w-0 ml-0'}`}>
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

       {/* Navigasi Bawah (Logout) */}
       <div className="flex flex-col">
        <Link
          href="/logout"
          className={`flex items-center h-12 rounded-md transition-colors duration-200 group text-red-400 hover:bg-red-500/20 ${
            isOpen ? 'px-4 justify-start' : 'justify-center'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400`}
        >
          <RiLogoutBoxLine size={30} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'w-full ml-4' : 'w-0 ml-0'}`}>
            <span className="whitespace-nowrap">Logout</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;