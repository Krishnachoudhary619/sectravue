import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryRail() {
  return (
    <section className="py-6 md:mx-auto md:max-w-7xl md:px-4 md:py-12">
      <h2 className="mb-4 px-4 font-display text-2xl md:mb-8 md:text-4xl">
        Shop by <span className="italic">category</span>
      </h2>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 md:justify-between md:gap-8 md:overflow-visible">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group flex w-[80px] shrink-0 snap-start flex-col items-center gap-2 text-center md:w-40 md:gap-3"
          >
            <span className="relative block h-[80px] w-[80px] overflow-hidden rounded-full bg-bg2 shadow-[0_8px_18px_rgba(0,0,0,.08)] ring-1 ring-black/8 transition group-hover:-translate-y-0.5 group-hover:ring-ink md:h-36 md:w-36">
              <Image
                src={c.image}
                alt={c.name}
                fill
                priority
                className={`object-cover ${c.imageClass ?? ""}`}
                sizes="80px"
              />
            </span>
            <span className="text-[11px] font-semibold leading-tight md:hidden">{c.short}</span>
            <span className="hidden text-sm font-semibold leading-tight md:block">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
