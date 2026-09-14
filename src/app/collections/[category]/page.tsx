import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, categoryById, type CategoryId } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryById(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `Shop SpectraVue ${cat.name.toLowerCase()} — ${cat.blurb}. Price on request. Designed in Mumbai, delivered pan-India.`,
    alternates: { canonical: cat.href },
    openGraph: {
      title: `${cat.name} | SpectraVue`,
      description: cat.blurb,
      url: `${SITE_URL}${cat.href}`,
      images: [{ url: cat.image, alt: cat.name }],
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categoryById(category);
  if (!cat) notFound();
  const products = productsByCategory(category as CategoryId);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 md:px-4 md:py-10">
      <JsonLd data={collectionJsonLd(cat, products)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: cat.name },
        ])}
      />
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted md:text-xs">Collection</p>
      <h1 className="mt-1 font-display text-3xl md:mt-2 md:text-5xl">{cat.name}</h1>
      <p className="mt-2 max-w-xl text-sm text-ink2 md:mt-3 md:text-base">{cat.blurb}</p>
      <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
