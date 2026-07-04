"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ExternalLink } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import EmptyState from "@/components/common/EmptyState";
import Rating from "@/components/common/Rating";
import toast from "react-hot-toast";

export default function WishlistGrid() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    const size = item.product.sizes[1] || item.product.sizes[0];
    addItem(item.product, size);
    removeItem(productId);
    toast.success("Moved to cart!", { icon: "🛒" });
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="w-10 h-10" />}
        title="Your wishlist is empty"
        description="Save the arrangements you love and come back to them any time."
        action={{ label: "Browse Flowers", href: "/shop" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-cream-50 flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-cream-50">
              <Link href={`/product/${item.product.slug}`}>
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              {/* Remove from wishlist */}
              <button
                onClick={() => {
                  removeItem(item.productId);
                  toast.success("Removed from wishlist");
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow-soft flex items-center justify-center text-blush-500 hover:bg-blush-50 transition-all"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Info */}
            <div className="p-3 flex-1 flex flex-col">
              <p className="font-body text-xs text-blush-500 uppercase tracking-wide mb-0.5">
                {item.product.category}
              </p>
              <Link href={`/product/${item.product.slug}`}>
                <h3 className="font-display font-semibold text-sm text-sage-800 hover:text-blush-700 transition-colors leading-snug line-clamp-2 mb-1.5">
                  {item.product.name}
                </h3>
              </Link>
              <Rating value={item.product.rating} size="sm" className="mb-2" />

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-cream-50">
                <span className="font-display font-bold text-sm text-sage-900">
                  {formatPrice(item.product.price)}
                </span>
                <div className="flex gap-1">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="w-7 h-7 rounded-lg border border-cream-200 flex items-center justify-center text-sage-500 hover:border-blush-300 hover:text-blush-600 transition-all"
                    aria-label="View product"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => handleMoveToCart(item.productId)}
                    disabled={!item.product.inStock}
                    className="w-7 h-7 rounded-lg bg-blush-600 flex items-center justify-center text-white hover:bg-blush-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}