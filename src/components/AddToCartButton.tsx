"use client";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/redux/hooks";
import { addItem } from "@/store/redux/slices/cartSlice";

export default function AddToCartButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(addItem({ product, quantity }))}
      className="inline-flex items-center justify-center rounded-md text-white px-4 py-2"
      style={{ backgroundColor: "var(--button)" }}
    >
      Add to Cart
    </button>
  );
}


