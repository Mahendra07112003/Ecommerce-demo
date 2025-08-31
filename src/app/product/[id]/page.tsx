import Image from "next/image";
import { notFound } from "next/navigation";
import StarRating from "@/components/StarRating";
import ProductPurchaseActions from "@/components/ProductPurchaseActions";
import { API_BASE_URL } from "@/lib/api";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const data = await res.json();
  const product = data.product;

  // This is a server component. Use a client wrapper for quantity and add to cart below.
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white border">
        <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-blue-800 font-bold text-xl">${product.price}</span>
          <StarRating value={product.rating ?? 0} />
        </div>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
        <div className="text-sm text-gray-600 mb-6">Category: {product.category}</div>
        <ProductPurchaseActions product={product} />
      </div>
    </div>
  );
}
