export default function adminLayout({ children }: { children: React.ReactNode }) {
 return (
  <main>
   <header className="border-b border-gray-200">Admin Layout</header>
   {children}
  </main>
 );
}
