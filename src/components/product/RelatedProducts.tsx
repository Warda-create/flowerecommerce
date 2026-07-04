import { Product } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "You May Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-sage-900">
          {title}
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-1 font-body text-sm text-blush-600 hover:text-blush-700 font-medium transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}