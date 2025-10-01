"use client";
import { useEffect, useState } from "react";

import "../styles/globals.css";
import HomeIf from "@/components/HomeIf";
import HomeSi from "@/components/HomeSi";
import { useProdi } from "./context/ProdiContext";
//table data

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;

    const handleScroll = () => {
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);

        if (element) {
          const navbarOffset = 80; // Adjust this value to your navbar's height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // mengatur scrolling agar sampai sebelum batas waktu
    const timer = setTimeout(handleScroll, 100);

    return () => clearTimeout(timer);
  }, []);

   const { prodi } = useProdi();
  return (
    <div>
        {prodi === "IF" ? <HomeIf /> : <HomeSi />}
    </div>
  );
}
