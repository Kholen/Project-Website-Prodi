"use client"; 

import "@/styles/globals.css";
import Sidebar from "@/components/SideBarAdmin"; 
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
        <div className="flex h-screen bg-gray-100 w-screen relative left-1/2 -translate-x-1/2">
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
          
          <main className="flex-1 p-4 sm:p-6 md:p-10 md:pt-6 overflow-y-auto">
            {children}
          </main>
        </div>
  );
}
