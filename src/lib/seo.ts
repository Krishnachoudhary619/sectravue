import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import {
  ADDRESS,
  EMAIL,
  HOME_SEO,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  MAPS_URL,
  PHONE_TEL,
  SITE_URL,
} from "./constants";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "SpectraVue",
    url: SITE_URL,
    logo: `${SITE_URL}/spectravue-logo.png`,
    image: `${SITE_URL}/images/banners/01.png`,
    email: EMAIL,
    telephone: PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Anupam Villa, Kale Marg, Bail Bajar",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400070",
      addressCountry: "IN",
    },
    areaServed: "IN",
    sameAs: [LINKEDIN_URL, INSTAGRAM_URL, MAPS_URL],
    description: HOME_SEO.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "SpectraVue",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function homeCollectionJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: HOME_SEO.title,
    url: SITE_URL,
    description: HOME_SEO.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/products/${p.slug}`,
      })),
    },
  };
}

export function productJsonLd(product: Product) {
  const url = `${SITE_URL}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription,
    image: product.images.map((src) => `${SITE_URL}${src}`),
    brand: { "@type": "Brand", name: "SpectraVue" },
    sku: product.sku.split(" · ")[0],
    category: product.seoCategory,
    url,
    manufacturer: { "@type": "Organization", name: "SpectraVue", url: SITE_URL },
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceCurrency: "INR",
      price: 0,
      description: "Price on request",
      seller: { "@type": "Organization", name: "SpectraVue" },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function collectionJsonLd(category: Category, products: Product[]) {
  const url = `${SITE_URL}${category.href}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.blurb,
    url,
    image: `${SITE_URL}${category.image}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/products/${p.slug}`,
      })),
    },
  };
}

export function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SpectraVue",
    url: `${SITE_URL}/contact`,
    description: "Request a quote or demo for SpectraVue interactive panels and digital signage in Mumbai.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "SpectraVue",
      telephone: PHONE_TEL,
      email: EMAIL,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS,
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400070",
        addressCountry: "IN",
      },
    },
  };
}
