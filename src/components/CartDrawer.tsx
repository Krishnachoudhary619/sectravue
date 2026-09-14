"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { openWhatsApp, orderMessage } from "@/lib/whatsapp";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, count } = useCart();

  function placeOrder() {
    if (!lines.length) return;
    openWhatsApp(
      orderMessage(lines.map((l) => ({ name: l.name, size: l.size, qty: l.qty }))),
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/40" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className="absolute inset-x-0 bottom-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl md:inset-x-auto md:right-0 md:max-w-md">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-3 md:px-5 md:py-4">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold">
            Close
          </button>
        </div>
        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-lg font-semibold">Your cart is feeling lonely</p>
            <p className="text-sm text-muted">Add a display to start an enquiry.</p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-auto px-5 py-4">
              {lines.map((line) => (
                <li key={`${line.slug}-${line.size ?? ""}`} className="flex gap-3 border-b border-black/6 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/8">
                    <Image src={line.image} alt={line.name} fill className="object-contain p-1" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${line.slug}`} onClick={() => setOpen(false)} className="font-semibold">
                      {line.name}
                    </Link>
                    {line.size && <p className="text-xs text-muted">{line.size}</p>}
                    <p className="mt-1 text-xs font-semibold text-blue">Price on request</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-black/10"
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-black/10"
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                      >
                        +
                      </button>
                      <button type="button" className="ml-auto text-xs text-muted" onClick={() => remove(line.slug, line.size)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/8 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-5">
              <p className="mb-3 text-sm text-ink2">We will share the latest price on WhatsApp. No payment on this site.</p>
              <button
                type="button"
                onClick={placeOrder}
                className="w-full rounded-full bg-[#25D366] py-3 text-sm font-bold text-white"
              >
                Place order on WhatsApp
              </button>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center text-sm font-semibold underline"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
