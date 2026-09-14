"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { openWhatsApp, orderMessage } from "@/lib/whatsapp";

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  function addToCart() {
    add({ slug: product.slug, name: product.name, size, image: product.images[0] }, qty);
  }

  function buyNow() {
    openWhatsApp(orderMessage([{ name: product.name, size, qty }]));
  }

  return (
    <div className="mt-6">
      {product.sizes.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Available sizes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
                  size === s ? "bg-ink text-white ring-ink" : "bg-white ring-black/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-black/10">
          <button type="button" className="h-11 w-11" onClick={() => setQty((n) => Math.max(1, n - 1))}>
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button type="button" className="h-11 w-11" onClick={() => setQty((n) => n + 1)}>
            +
          </button>
        </div>
        <p className="text-sm font-semibold text-blue">Price on request</p>
      </div>
      <div className="mt-4 hidden flex-col gap-2 sm:flex sm:flex-row">
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 rounded-full border border-ink py-3 text-sm font-bold"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={buyNow}
          className="flex-1 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white"
        >
          Buy now on WhatsApp
        </button>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-black/8 bg-white/95 px-3 py-2.5 pb-[max(0.7rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 rounded-full border border-ink py-3 text-sm font-bold"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={buyNow}
          className="flex-1 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
