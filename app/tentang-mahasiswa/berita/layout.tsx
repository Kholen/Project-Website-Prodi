import { ReactNode } from "react";  
export default function BeritaLayout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-gray-100">
     <main>{children}</main>
    </section>
  );
}
