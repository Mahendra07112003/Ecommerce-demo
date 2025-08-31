import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import StarRating from "@/components/StarRating";
import ProductPurchaseActions from "@/components/ProductPurchaseActions";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

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
