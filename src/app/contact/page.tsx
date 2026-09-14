import { ADDRESS, EMAIL, MAPS_URL, PHONE_DISPLAY, SITE_URL, WHATSAPP_DISPLAY, WHATSAPP_E164 } from "@/lib/constants";
import { contactJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { waUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp, or visit SpectraVue in Kurla, Mumbai for interactive panel and digital signage quotes, demos, and installation support across India.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SpectraVue",
    description: "Request a quote or demo. WhatsApp +91 9321618509. Head office in Kurla, Mumbai.",
    url: `${SITE_URL}/contact`,
  },
};

const CALL_URL = `tel:+${WHATSAPP_E164}`;
const CHAT_URL = waUrl("Hi SpectraVue, I would like a quote and a live demo.");

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-3 py-8 md:px-4 md:py-12">
      <JsonLd data={contactJsonLd()} />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Get in touch</p>
      <h1 className="mt-2 font-display text-3xl md:text-5xl">
        Let’s <em>connect.</em>
      </h1>
      <p className="mt-4 text-ink2">
        No login and no payment on the site. Add products to cart, or message us on WhatsApp for the latest price.
      </p>
      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">WhatsApp</p>
          <p className="mt-1 text-lg font-semibold">{WHATSAPP_DISPLAY}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Email</p>
          <a href={`mailto:${EMAIL}`} className="mt-1 block text-lg font-semibold hover:text-blue">
            {EMAIL}
          </a>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Phone</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <a href={CALL_URL} className="text-lg font-semibold hover:text-blue">
              {PHONE_DISPLAY}
            </a>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={CALL_URL}
                aria-label="Call SpectraVue"
                className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"
              >
                <PhoneIcon />
              </a>
              <a
                href={CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-black/8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Head office</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold leading-snug hover:text-blue"
            >
              {ADDRESS}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Google Maps"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue text-white"
            >
              <MapIcon />
            </a>
          </div>
        </div>
      </div>
      <a
        href={CHAT_URL}
        className="mt-8 inline-flex w-full justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white md:w-auto"
      >
        Message on WhatsApp
      </a>
    </div>
  );
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5c3.7 0 6.7 3 6.7 6.7 0 4.9-6.7 12.3-6.7 12.3S5.3 14.1 5.3 9.2C5.3 5.5 8.3 2.5 12 2.5Zm0 4.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 3.8c.4-.4 1-.5 1.5-.3l2.2 1c.5.2.8.7.8 1.3v2.1c0 .4-.2.8-.5 1L9.7 10.4a12.2 12.2 0 0 0 3.9 3.9l1.5-1.5c.3-.3.7-.5 1.1-.5h2.1c.6 0 1.1.3 1.3.8l1 2.2c.2.5.1 1.1-.3 1.5l-1.3 1.3c-.5.5-1.2.7-1.9.5C11.5 18 6 12.5 4.4 6.9c-.2-.7 0-1.4.5-1.9l1.3-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2.05c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01a9.83 9.83 0 0 0-7.01-2.88Zm0 18.11h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.53 3.69-8.21 8.22-8.21 2.19 0 4.26.86 5.81 2.41a8.18 8.18 0 0 1 2.4 5.81c0 4.53-3.69 8.22-8.19 8.22Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.04.41 1.4.52.59.18 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.11-.23-.18-.48-.3Z" />
    </svg>
  );
}
