"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import FooterHome from "@/components/FooterHome";

const ConditionalFooter = () => {
  const pathname = usePathname();
  const adminPathname = pathname.startsWith("/dashboard");

  if (pathname === "/") {
    return <FooterHome />;
  }else if (pathname === "/sign-in") {
    return null;
  }
  else if (adminPathname) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;
