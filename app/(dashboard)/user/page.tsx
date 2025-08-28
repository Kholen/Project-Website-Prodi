export function dashboardLayout({
    children }: { children: React.ReactNode }) {
    return (
    <main>
    <header className="border-b border-gray-200">Dashboard Layout</header>
    <div className="p-4">{children}</div>
    </main>
    );
}