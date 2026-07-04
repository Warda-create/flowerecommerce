import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "@/components/common/Skeleton";
import EmptyState from "@/components/common/EmptyState";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
  columns?: 2 | 3 | 4;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function ProductGrid({
  products,
  isLoading,
  className,
  columns = 4,
  emptyTitle = "No flowers found",
  emptyDescription = "Try adjusting your filters or search to find what you're looking for.",
}: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton count={columns * 2} />;

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Search className="w-10 h-10" />}
        title={emptyTitle}
        description={emptyDescription}
        action={{ label: "Browse all flowers", href: "/shop" }}
      />
    );
  }

  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-4 md:gap-6", colClass, className)}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}