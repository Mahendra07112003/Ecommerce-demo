import { Star } from "lucide-react";

export default function StarRating({ value = 0 }: { value?: number }) {
  const rounded = Math.round((value ?? 0) * 2) / 2; // halves
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i + 1 <= rounded ? "fill-yellow-400" : ""}`} />
      ))}
    </div>
  );
}

