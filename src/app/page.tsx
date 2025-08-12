import FiltersSidebar from "@/components/FiltersSidebar";
import ProductsView from "@/components/ProductsView";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
      <div>
        <Suspense fallback={<div className="text-sm text-gray-500">Loading filters…</div>}>
          <FiltersSidebar />
        </Suspense>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Product Listing</h2>
        <ProductsView />
      </div>
    </div>
  );
}
