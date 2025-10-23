import { ReactNode } from "react";  
export default function PengumumanLayout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-gray-100">
     <main>{children}</main>
    </section>
  );
}
