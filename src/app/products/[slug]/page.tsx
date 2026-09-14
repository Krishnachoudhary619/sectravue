import { notFound } from "next/navigation";
import Link from "next/link";
import { BuyBox } from "@/components/BuyBox";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { getProduct, PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDescription,
      images: [{ url: p.images[0], alt: p.alt }],
      url: `${SITE_URL}/products/${p.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: p.seoTitle,
      description: p.seoDescription,
      images: [p.images[0]],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = product.related.map(getProduct).filter(Boolean);

  const jsonLdProduct = productJsonLd(product);
  const jsonLdCrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: product.label, href: `/collections/${product.category}` },
    { name: product.name },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-3 pb-24 pt-4 md:px-4 md:py-10 sm:pb-10">
      <JsonLd data={jsonLdProduct} />
      <JsonLd data={jsonLdCrumbs} />
      <nav className="mb-3 text-xs text-muted md:mb-6 md:text-sm">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-ink">
          {product.label}
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <ProductGallery images={product.images} alt={product.alt} />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{product.label}</p>
          <h1 className="mt-1 font-display text-3xl md:mt-2 md:text-5xl">
            {product.name}
            <br />
            <em>{product.italic}</em>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-ink2 md:mt-4 md:text-base">{product.lead}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.pills.map((pill) => (
              <span key={pill} className="rounded-full bg-bg2 px-3 py-1 text-xs font-semibold">
                {pill}
              </span>
            ))}
          </div>
          <BuyBox product={product} />
        </div>
      </div>

      <section className="mt-10 md:mt-16">
        <h2 className="font-display text-2xl md:text-3xl">
          Why teams choose <em>{product.name}.</em>
        </h2>
        <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-4">
          {product.features.map((f, i) => (
            <div key={f.title} className="rounded-2xl bg-white p-5 ring-1 ring-black/8">
              <p className="text-xs font-bold text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-ink2">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 md:mt-16">
        <h2 className="font-display text-2xl md:text-3xl">
          Engineered <em>to perform.</em>
        </h2>
        <div className="mt-6 divide-y divide-black/8 overflow-hidden rounded-2xl bg-white ring-1 ring-black/8">
          {product.specs.map(([k, v]) => (
            <div key={k} className="grid gap-2 px-5 py-4 md:grid-cols-3">
              <div className="text-sm font-semibold">{k}</div>
              <div className="md:col-span-2 text-sm text-ink2">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {product.venues.length > 0 && (
        <section className="mt-10 md:mt-16">
          <h2 className="font-display text-2xl md:text-3xl">
            Built for <em>real spaces.</em>
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.venues.map((v) => (
              <span key={v} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/8">
                {v}
              </span>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 md:mt-16">
          <h2 className="font-display text-2xl md:text-3xl">
            Also in the <em>collection.</em>
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 md:mt-6 md:gap-5 lg:grid-cols-3">
            {related.map((p) => p && <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
