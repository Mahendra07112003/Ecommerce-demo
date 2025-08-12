"use client";

import { create } from "zustand";
import { Category } from "@/types/product";

interface FilterState {
  search: string;
  category: "All" | Category;
  maxPrice: number; // 0 - 1000
  secondaryCategory: "All" | Category; // purely UI, mirrors mock's second group
  setSearch: (q: string) => void;
  setCategory: (c: "All" | Category) => void;
  setMaxPrice: (p: number) => void;
  setSecondaryCategory: (c: "All" | Category) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  category: "All",
  maxPrice: 1000,
  secondaryCategory: "All",
  setSearch: (q) => set({ search: q }),
  setCategory: (c) => set({ category: c }),
  setMaxPrice: (p) => set({ maxPrice: p }),
  setSecondaryCategory: (c) => set({ secondaryCategory: c }),
  reset: () =>
    set({ search: "", category: "All", secondaryCategory: "All", maxPrice: 1000 }),
}));

