"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="rounded-lg border border-gray-200 p-3 bg-white shadow-sm">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-40 overflow-hidden rounded-md">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          />
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-1">{product.title}</h3>
        <p className="text-[color:var(--primary-dark)] font-bold">${product.price}</p>
        <StarRating value={product.rating ?? 0} />
        <button
          onClick={() => addItem(product)}
          className="mt-2 inline-flex items-center justify-center rounded-md text-white px-3 py-1.5 text-sm"
          style={{ backgroundColor: "var(--primary-dark)" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

