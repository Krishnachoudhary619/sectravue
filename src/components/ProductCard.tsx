"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { openWhatsApp, orderMessage } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const size = product.sizes[0];
  const image = product.images[0];

  function addToCart() {
    add({ slug: product.slug, name: product.name, size, image });
  }

  function buyNow() {
    openWhatsApp(orderMessage([{ name: product.name, size, qty: 1 }]));
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-black/8 bg-white md:rounded-2xl">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-white">
        <Image
          src={image}
          alt={product.alt}
          fill
          className="object-contain p-3 transition group-hover:scale-[1.03] md:p-5"
          sizes="(max-width: 640px) 50vw, 280px"
        />
      </Link>
      <div className="flex flex-1 flex-col border-t border-black/8 p-2.5 shadow-[0_-8px_18px_rgba(0,0,0,.04)] md:p-4">
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-muted md:block">{product.sku}</p>
        <Link href={`/products/${product.slug}`} className="font-display text-[15px] leading-tight md:mt-1 md:text-xl">
          {product.name}
        </Link>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-muted md:mt-1 md:text-sm">{product.tag}</p>
        <p className="mt-1 text-[12px] font-semibold text-blue md:mt-2 md:text-sm">Price on request</p>
        <div className="mt-auto flex gap-1.5 pt-2.5 md:gap-2 md:pt-4">
          <button
            type="button"
            onClick={addToCart}
            className="flex-1 rounded-full border border-ink px-2 py-1.5 text-[10px] font-bold md:px-3 md:py-2 md:text-xs"
          >
            Add
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="flex-1 rounded-full bg-ink px-2 py-1.5 text-[10px] font-bold text-white md:px-3 md:py-2 md:text-xs"
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}
