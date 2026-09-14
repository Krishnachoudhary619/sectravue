"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { count, setOpen } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenu(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setMenu(false);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-2 py-2 md:flex md:gap-4 md:px-4 md:py-3">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center lg:hidden"
          aria-label="Menu"
          onClick={() => setMenu((v) => !v)}
        >
          <span className="flex w-5 flex-col gap-1">
            <span className="block h-0.5 w-full bg-ink" />
            <span className="block h-0.5 w-full bg-ink" />
            <span className="block h-0.5 w-3 bg-ink" />
          </span>
        </button>

        <Link href="/" className="shrink-0 justify-self-center md:mr-2">
          <Image
            src="/spectravue-logo.png"
            alt="SpectraVue"
            width={148}
            height={36}
            className="h-7 w-auto md:h-9"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold tracking-wide">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={c.href} className="hover:text-blue">
              {c.name}
            </Link>
          ))}
          <Link href="/contact" className="hover:text-blue">
            Contact
          </Link>
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden md:flex flex-1 max-w-sm">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search displays, totems, CMS…"
            className="w-full rounded-full border border-black/10 bg-bg2 px-4 py-2 text-sm outline-none focus:border-blue"
          />
        </form>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center md:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative grid h-10 w-10 place-items-center"
            aria-label="Open cart"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-blue px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={onSearch} className="border-t border-black/8 bg-white px-3 py-2 md:hidden">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-black/10 bg-bg2 px-4 py-2.5 text-sm"
          />
        </form>
      )}

      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={() => setMenu(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/8 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Shop</p>
              <button type="button" onClick={() => setMenu(false)} className="grid h-10 w-10 place-items-center text-lg">
                ×
              </button>
            </div>
            <nav className="flex-1 overflow-auto px-4 py-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  onClick={() => setMenu(false)}
                  className="flex items-center justify-between border-b border-black/6 py-4 text-[15px] font-semibold"
                >
                  {c.name}
                  <span className="text-muted">›</span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenu(false)}
                className="flex items-center justify-between py-4 text-[15px] font-semibold"
              >
                Contact
                <span className="text-muted">›</span>
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6h15l-1.5 9h-12L6 6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" />
      <circle cx="18" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}
