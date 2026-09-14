"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BANNERS } from "@/data/products";

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % BANNERS.length), 5200);
    return () => clearInterval(t);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) setI((n) => (n - 1 + BANNERS.length) % BANNERS.length);
    if (dx < -40) setI((n) => (n + 1) % BANNERS.length);
    startX.current = null;
  }

  return (
    <section
      className="relative overflow-hidden bg-bg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">SpectraVue interactive panels and digital signage</h1>
      <div className="relative mx-auto aspect-[4/3] w-full max-h-[360px] md:aspect-auto md:h-[min(86vh,880px)] md:max-h-[880px] md:min-h-[480px]">
        {BANNERS.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`SpectraVue collection banner ${idx + 1}`}
            fill
            priority={idx === 0}
            className={`object-cover object-center transition-opacity duration-700 md:object-contain ${idx === i ? "opacity-100" : "opacity-0"}`}
            sizes="100vw"
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-3 md:gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-ink" : "w-1.5 bg-ink/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
