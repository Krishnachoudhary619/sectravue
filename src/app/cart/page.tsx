"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { openWhatsApp, orderMessage } from "@/lib/whatsapp";

export default function CartPage() {
  const { lines, setQty, remove, count } = useCart();

  function placeOrder() {
    if (!lines.length) return;
    openWhatsApp(orderMessage(lines.map((l) => ({ name: l.name, size: l.size, qty: l.qty }))));
  }

  return (
    <div className="mx-auto max-w-3xl px-3 py-6 md:px-4 md:py-10">
      <h1 className="font-display text-3xl md:text-4xl">Your cart</h1>
      {count === 0 ? (
        <div className="mt-10 rounded-2xl bg-white p-10 text-center ring-1 ring-black/8">
          <p className="text-lg font-semibold">Your cart is feeling lonely</p>
          <Link href="/" className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-sm font-bold text-white">
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-black/8 overflow-hidden rounded-2xl bg-white ring-1 ring-black/8">
            {lines.map((line) => (
              <li key={`${line.slug}-${line.size ?? ""}`} className="flex gap-4 p-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white ring-1 ring-black/8">
                  <Image src={line.image} alt={line.name} fill className="object-contain p-2" sizes="96px" />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${line.slug}`} className="font-semibold">
                    {line.name}
                  </Link>
                  {line.size && <p className="text-sm text-muted">{line.size}</p>}
                  <p className="text-sm font-semibold text-blue">Price on request</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQty(line.slug, line.size, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQty(line.slug, line.size, line.qty + 1)}>
                      +
                    </button>
                    <button type="button" className="ml-3 text-xs text-muted" onClick={() => remove(line.slug, line.size)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink2">No payment on this site. Place the order and we will share the latest price on WhatsApp.</p>
          <div className="sticky bottom-0 -mx-3 mt-4 bg-bg px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:static md:mx-0 md:bg-transparent md:px-0">
            <button
              type="button"
              onClick={placeOrder}
              className="w-full rounded-full bg-[#25D366] py-3 text-sm font-bold text-white"
            >
              Place order on WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
