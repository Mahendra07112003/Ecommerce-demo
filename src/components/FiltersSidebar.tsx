"use client";

import { categories } from "@/lib/products";
import { useFilterStore } from "@/store/filters";

export default function FiltersSidebar() {
  const { category, secondaryCategory, maxPrice, setCategory, setSecondaryCategory, setMaxPrice } =
    useFilterStore();

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

