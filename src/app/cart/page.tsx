"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { increase, decrease, remove, clear, selectTotals } from "@/store/redux/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const totals = selectTotals(items);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Your cart is empty.</p>
        <Link href="/" className="text-blue-700 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 bg-white p-3 rounded-md border">
            <div className="relative h-20 w-20 rounded overflow-hidden">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-600">${item.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch(decrease(item.productId))} className="px-2 py-1 border rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increase(item.productId))} className="px-2 py-1 border rounded">+</button>
            </div>
            <button onClick={() => dispatch(remove(item.productId))} className="text-red-600 text-sm">Remove</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-md border p-4 h-fit">
        <h3 className="font-semibold mb-2">Summary</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Items</span>
          <span>{totals.totalItems}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>${totals.totalPrice.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="block w-full text-center text-white rounded-md py-2" style={{ backgroundColor: "var(--primary-dark)" }}>Checkout</Link>
        <button onClick={() => dispatch(clear())} className="w-full mt-2 border rounded-md py-2">Clear Cart</button>
      </div>
    </div>
  );
}


