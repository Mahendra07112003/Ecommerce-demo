"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

export default function ProductPurchaseActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center border rounded-md">
        <button onClick={decrease} className="px-3 py-1.5">-</button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          className="w-14 text-center outline-none py-1.5"
        />
        <button onClick={increase} className="px-3 py-1.5">+</button>
      </div>
      <AddToCartButton product={product} quantity={quantity} />
    </div>
  );
}