import type { Metadata } from "next";
import { CategoryRail } from "@/components/CategoryRail";
import { HeroCarousel } from "@/components/HeroCarousel";
import { JsonLd } from "@/components/JsonLd";
import { ProductRow } from "@/components/ProductRow";
import { TrustStrip } from "@/components/TrustStrip";
import { PRODUCTS } from "@/data/products";
import { HOME_SEO, OG_IMAGE, SITE_URL } from "@/lib/constants";
import { homeCollectionJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: HOME_SEO.title },
  description: HOME_SEO.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    url: SITE_URL,
    images: [{ url: OG_IMAGE, alt: "SpectraVue interactive panels and digital signage" }],
  },
};

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) =>
    ["vistakiosk", "angle-pro", "adzoview", "education-plus", "luma", "edgevue"].includes(p.slug),
  );
  const floor = PRODUCTS.filter((p) => p.category === "floor");
  const retail = PRODUCTS.filter((p) => p.category === "retail");
  const ifp = PRODUCTS.filter((p) => p.category === "ifp");

  return (
    <>
      <JsonLd data={homeCollectionJsonLd(PRODUCTS)} />
      <HeroCarousel />
      <CategoryRail />
      <TrustStrip />
      <ProductRow title={<>Best <em>sellers</em></>} href="/collections/floor" products={bestsellers} />
      <ProductRow title={<>Floor <em>displays</em></>} href="/collections/floor" products={floor} />
      <ProductRow title={<>Retail &amp; <em>POS</em></>} href="/collections/retail" products={retail} />
      <ProductRow title={<>Interactive <em>panels</em></>} href="/collections/ifp" products={ifp} />
    </>
  );
}
