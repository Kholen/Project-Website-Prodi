"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import FooterHome from "@/components/FooterHome";

const ConditionalFooter = () => {
  const pathname = usePathname();

  const dashboardPath = pathname.startsWith("/dashboard");
  const beritaPath = pathname.startsWith("/berita");
  if (pathname === "/") {
    return <FooterHome />;
  }
  if (pathname === "/sign-in") {
    return null;
  }
  if (beritaPath) {
    return null;
  }
  if (dashboardPath) {
    return null;
  }
  return <Footer />;
};

export default ConditionalFooter;
