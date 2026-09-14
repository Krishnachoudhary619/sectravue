import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { PromoBar } from "@/components/PromoBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { HOME_SEO, OG_IMAGE, SITE_URL } from "@/lib/constants";
import "./globals.css";

const dm = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO.title,
    template: "%s | SpectraVue",
  },
  description: HOME_SEO.description,
  applicationName: "SpectraVue",
  authors: [{ name: "SpectraVue", url: SITE_URL }],
  creator: "SpectraVue",
  publisher: "SpectraVue",
  category: "Digital signage",
  keywords: [
    "SpectraVue",
    "interactive flat panel",
    "digital signage Mumbai",
    "digital totem",
    "kiosk display",
    "wall display",
    "Fleet IQ CMS",
    "retail digital display India",
  ],
  openGraph: {
    siteName: "SpectraVue",
    locale: "en_IN",
    type: "website",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    images: [{ url: OG_IMAGE, alt: "SpectraVue interactive panels and digital signage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: { icon: "/spectravue-logo.png", apple: "/spectravue-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${dm.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Providers>
          <PromoBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
