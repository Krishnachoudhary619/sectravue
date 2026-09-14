import { WHATSAPP_E164 } from "./constants";

export type EnquiryLine = {
  name: string;
  size?: string;
  qty: number;
};

export function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export function orderMessage(lines: EnquiryLine[]) {
  const items = lines
    .map((line) => {
      const size = line.size ? ` — ${line.size}` : "";
      return `• ${line.name}${size} × ${line.qty}`;
    })
    .join("\n");
  return `Hi SpectraVue, I would like to place an enquiry.\n\n${items}\n\nPlease share the latest price and availability.`;
}

export function openWhatsApp(text: string) {
  window.open(waUrl(text), "_blank", "noopener,noreferrer");
}
