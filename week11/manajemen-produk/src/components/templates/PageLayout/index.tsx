import { NavLink, Outlet } from "react-router-dom";

export function PageLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
      isActive ? "bg-navy text-parchment" : "text-espresso hover:bg-stone/70"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-parchment text-espresso">
      <header className="sticky top-0 z-40 border-b border-stone-border bg-parchment/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <NavLink to="/products" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-serif text-lg font-bold text-parchment">
              M
            </span>
            <span className="font-serif text-xl font-bold text-navy">
              Manajemen Produk
            </span>
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink to="/products" className={navLinkClass}>
              Daftar Produk
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;