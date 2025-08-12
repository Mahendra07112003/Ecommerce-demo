"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                productId: product.id,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity,
              },
            ],
          });
        }
      },
      increase: (productId) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),
      decrease: (productId) =>
        set({
          items: get().items
            .map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }),
      remove: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "ecom-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  return { totalItems, totalPrice };
};

