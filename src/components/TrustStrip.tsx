const ITEMS = [
  { title: "Consultation", copy: "Right size, right form factor" },
  { title: "Installation", copy: "End-to-end setup support" },
  { title: "Warranty", copy: "18 months on interactive panels" },
  { title: "Pan-India", copy: "Mumbai HQ · Nationwide Delivery" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-black/8 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="border-black/8 px-3 py-3.5 odd:border-r md:border-r md:px-4 md:py-8 md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0">
            <p className="text-xs font-bold md:text-sm">{item.title}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted md:text-sm">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
