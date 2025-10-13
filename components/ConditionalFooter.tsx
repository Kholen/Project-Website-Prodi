"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import FooterHome from "@/components/FooterHome";

const ConditionalFooter = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <FooterHome />;
  }
  if (pathname === "/sign-in") {
    return null;
  }
  if (pathname === "/tentang-mahasiswa/berita") {
    return null;
  }
  if (pathname === "/dashboard"  ) {
    return null;
  }
  return <Footer />;
};

export default ConditionalFooter;
