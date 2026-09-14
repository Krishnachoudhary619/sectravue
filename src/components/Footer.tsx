import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ADDRESS, EMAIL, INSTAGRAM_URL, LINKEDIN_URL, MAPS_URL, WHATSAPP_DISPLAY } from "@/lib/constants";
import { waUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/8 bg-bg2">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-4 md:gap-10 md:py-14">
        <div>
          <Image src="/spectravue-logo.png" alt="SpectraVue" width={148} height={36} className="h-8 w-auto md:h-9" />
          <p className="mt-3 text-sm leading-6 text-ink2 md:mt-4">
            Interactive panels and digital displays for education, enterprise, retail, and public spaces.
          </p>
          <div className="mt-4 flex gap-4">
            <a href={LINKEDIN_URL} className="text-sm font-semibold hover:text-blue" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={INSTAGRAM_URL} className="text-sm font-semibold hover:text-blue" rel="noopener noreferrer">
              Instagram
            </a>
            <a
              href={waUrl("Hi SpectraVue, I want to know more about the products.")}
              className="text-sm font-semibold hover:text-blue"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Shop</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm md:mt-4 md:grid-cols-1">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className="hover:text-blue">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="font-semibold hover:text-blue">
                Get a quote
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Products</h4>
          <ul className="mt-4 grid gap-2 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:text-blue">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Contact</h4>
          <ul className="mt-3 grid gap-2 text-sm text-ink2 md:mt-4">
            <li>WhatsApp {WHATSAPP_DISPLAY}</li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-blue">
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/8 px-4 py-4 text-center text-[11px] text-muted md:text-xs">
        © {new Date().getFullYear()} SpectraVue. All rights reserved.
      </div>
    </footer>
  );
}
