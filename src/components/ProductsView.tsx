"use client";

import { useEffect } from "react";
import { useFilterStore } from "@/store/filters";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { fetchProducts } from "@/store/redux/slices/productsSlice";
import ProductCard from "@/components/ProductCard";

export default function ProductsView() {
  const { category, secondaryCategory, maxPrice, search } = useFilterStore();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    const effectiveCategory = secondaryCategory !== "All" ? secondaryCategory : category;
    const params: any = {};
    if (effectiveCategory !== "All") params.category = effectiveCategory;
    if (maxPrice != null && maxPrice !== 1000) params.maxPrice = maxPrice;
    if (search) params.q = search;
    dispatch(fetchProducts(params));
  }, [category, secondaryCategory, maxPrice, search, dispatch]);

  if (status === "loading") return <div className="text-gray-600">Loading products…</div>;
  if (!items || items.length === 0) return <div className="text-gray-600">No products found.</div>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={(p as any)._id || p.id} product={p as any} />
      ))}
    </div>
  );
}


