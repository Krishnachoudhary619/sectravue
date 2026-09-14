import Link from "next/link";
import { WHATSAPP_DISPLAY } from "@/lib/constants";

export function PromoBar() {
  return (
    <div className="bg-ink text-white text-[11px] tracking-wide md:text-[12px]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 py-1.5 text-center md:px-4 md:py-2">
        <span>Price on request · WhatsApp {WHATSAPP_DISPLAY}</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <Link href="/contact" className="hidden sm:inline underline underline-offset-2 hover:text-blue">
          Talk to a specialist
        </Link>
      </div>
    </div>
  );
}
