"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBox({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form onSubmit={onSearch} className="mt-4 md:hidden">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search displays, totems, CMS…"
        className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm"
      />
    </form>
  );
}
