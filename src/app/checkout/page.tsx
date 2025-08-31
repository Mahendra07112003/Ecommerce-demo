"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { selectTotals, clear } from "@/store/redux/slices/cartSlice";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const items = useAppSelector((s) => s.cart.items);
  const totals = selectTotals(items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [delivery, setDelivery] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        delivery,
      };
      await api.createOrder(payload);
      dispatch(clear());
      setStatus("success");
      router.push("/");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Checkout failed");
    }
  };

  if (items.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {Object.entries(delivery).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              value={value as string}
              onChange={(e) => setDelivery((d) => ({ ...d, [key]: e.target.value }))}
              className="border rounded px-3 py-2"
              required={key !== "addressLine2"}
            />
          </div>
        ))}
        <button disabled={status === "submitting"} className="rounded-md text-white px-4 py-2" style={{ backgroundColor: "var(--primary-dark)" }}>
          {status === "submitting" ? "Placing order…" : "Place Order"}
        </button>
      </form>
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
      </div>
    </div>
  );
}

