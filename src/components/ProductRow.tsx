import Link from "next/link";
import type { ReactNode } from "react";
import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductRow({
  title,
  href,
  products,
}: {
  title: ReactNode;
  href: string;
  products: Product[];
}) {
  return (
    <section className="py-7 md:mx-auto md:max-w-7xl md:px-4 md:py-10">
      <div className="mb-4 flex items-end justify-between px-4 md:mb-5 md:px-0">
        <h2 className="font-display text-2xl md:text-4xl">{title}</h2>
        <Link href={href} className="text-xs font-bold underline underline-offset-4 md:text-sm">
          View all
        </Link>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:gap-4">
        {products.map((p) => (
          <div key={p.slug} className="w-[68vw] max-w-[240px] shrink-0 snap-start md:w-[260px] md:max-w-none">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
