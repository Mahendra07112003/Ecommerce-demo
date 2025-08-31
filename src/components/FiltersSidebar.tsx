"use client";

import { categories } from "@/lib/products";
import { useFilterStore } from "@/store/filters";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FiltersSidebar() {
  const { category, secondaryCategory, maxPrice, search, setCategory, setSecondaryCategory, setMaxPrice, setSearch } =
    useFilterStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from URL on first mount
  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());

    const q = sp.get("q");
    if (q) setSearch(q);

    const categoryParam = sp.get("category");
    if (categoryParam) {
      const match = categories.find((c) => c.toLowerCase() === categoryParam.toLowerCase());
      if (match) setCategory(match);
    }

    const priceParam = sp.get("price"); // e.g., 0-1000
    if (priceParam && priceParam.includes("-")) {
      const parts = priceParam.split("-");
      const end = Number(parts[1]);
      if (!Number.isNaN(end)) setMaxPrice(end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync filters to URL when they change
  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());

    // search
    if (search && search.trim()) sp.set("q", search.trim());
    else sp.delete("q");

    // category (prefer secondary if not All)
    const effectiveCategory = secondaryCategory !== "All" ? secondaryCategory : category;
    if (effectiveCategory !== "All") sp.set("category", effectiveCategory.toLowerCase());
    else sp.delete("category");

    // price range serialized as 0-max
    if (maxPrice !== 1000) sp.set("price", `0-${maxPrice}`);
    else sp.delete("price");

    const query = sp.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, secondaryCategory, maxPrice, search, pathname, router]);

  return (
    <aside className="space-y-6">
      <div className="rounded-lg bg-blue-900 text-white p-4 shadow border">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">Category</h4>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="category"
                  value={c}
                  checked={category === c}
                  onChange={() => setCategory(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Price</h4>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm w-14 text-right">${maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Second box as in the mock: duplicated category group under heading "Cacyroy" and a numeric price field */}
      <div className="rounded-lg bg-white p-4 shadow border">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="mb-4">
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={`c2-${c}`} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="category2"
                  value={c}
                  checked={secondaryCategory === c}
                  onChange={() => setSecondaryCategory(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Price</h4>
          <input
            type="number"
            defaultValue={5000}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
            className="w-24 rounded border px-2 py-1 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
