import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { searchProducts } from "@/data/products";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q = "" } = await searchParams;
  return {
    title: q ? `Search “${q}”` : "Search",
    robots: { index: false, follow: true },
    alternates: { canonical: "/search" },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-10">
      <h1 className="font-display text-3xl md:text-4xl">Search</h1>
      <p className="mt-2 text-sm text-ink2 md:text-base">{q ? `Results for “${q}”` : "Type a product, size, or use case."}</p>
      <SearchBox initial={q} />
      <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {results.length === 0 && <p className="mt-8 text-muted">No products matched that search.</p>}
    </div>
  );
}
