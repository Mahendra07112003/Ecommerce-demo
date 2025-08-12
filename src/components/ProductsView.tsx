"use client";

import { products } from "@/lib/products";
import { useFilterStore } from "@/store/filters";
import ProductCard from "@/components/ProductCard";

export default function ProductsView() {
  const { category, secondaryCategory, maxPrice, search } = useFilterStore();

  const filtered = products.filter((p) => {
    const effectiveCategory = secondaryCategory !== "All" ? secondaryCategory : category;
    const matchesCategory = effectiveCategory === "All" || p.category === effectiveCategory;
    const matchesPrice = p.price <= maxPrice;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  if (filtered.length === 0) {
    return <div className="text-gray-600">No products found.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


