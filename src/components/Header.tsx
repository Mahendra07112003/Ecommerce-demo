"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import Link from "next/link";
import { useFilterStore } from "@/store/filters";
import { useAppSelector } from "@/store/redux/hooks";
import { selectTotals } from "@/store/redux/slices/cartSlice";

export default function Header() {
  const search = useFilterStore((s) => s.search);
  const setSearch = useFilterStore((s) => s.setSearch);
  const items = useAppSelector((s) => s.cart.items);
  const totals = selectTotals(items);

  return (
    <header className="sticky top-0 z-30  text-white" style={{ backgroundColor: "var(--primary-dark)" }}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-bold text-2xl">Logo</Link>

        <div className="ml-auto hidden md:flex">
          <div className="w-100 relative ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              // className="w-full rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder:text-white outline-white-300"
             className="w-full rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder:text-white outline-none
                 bg-blue-900 border border-[#4a90e2] focus:border-white transition"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/cart" className="relative inline-flex items-center">
            <ShoppingCart className="h-6 w-6" />
            {totals.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-blue-700 text-xs font-semibold rounded-full h-5 w-5 grid place-items-center">
                {totals.totalItems}
              </span>
            )}
          </Link>
          <Link href="/auth/login" className="hidden sm:block">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}

