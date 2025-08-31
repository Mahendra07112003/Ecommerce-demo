"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

export default function AddToCartButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <button
      onClick={() => addItem(product, quantity)}
      className="inline-flex items-center justify-center rounded-md text-white px-4 py-2"
      style={{ backgroundColor: "var(--button)" }}
    >
      Add to Cart
    </button>
  );
}

