"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Badge from "@/components/common/Badge";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className, priority }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const router = useRouter();

  const { addItem, isInCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0];
    addItem(product, defaultSize);
    toast.success(`${product.name} added to cart!`, {
      style: { borderRadius: "12px", fontFamily: "var(--font-lato)" },
      icon: "🌸",
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      {
        style: { borderRadius: "12px" },
        icon: inWishlist ? "💔" : "💖",
      }
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300",
        className
      )}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images[1]) setImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImgIndex(0);
      }}
    >
      <Link
  href={`/shop/${product.slug}`}
  className="block"
  aria-label={`View ${product.name}`}
>
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-cream-50">
          <Image
            src={product.images[imgIndex] || product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && (
              <Badge variant="new" size="xs">New</Badge>
            )}
            {product.bestSeller && (
              <Badge variant="bestseller" size="xs">Best Seller</Badge>
            )}
            {product.discount && (
              <Badge variant="sale" size="xs">-{product.discount}%</Badge>
            )}
          </div>

          {/* Action buttons */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-200",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            )}
          >
            <button
              onClick={handleWishlistToggle}
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shadow-soft backdrop-blur-sm transition-all",
                inWishlist
                  ? "bg-blush-500 text-white"
                  : "bg-white/90 text-sage-600 hover:bg-blush-50 hover:text-blush-600"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn("w-4 h-4", inWishlist && "fill-current")}
              />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/90 text-sage-600 hover:bg-sage-50 shadow-soft backdrop-blur-sm"
              aria-label={`Quick view ${product.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/shop/${product.slug}`);
              }}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
              <span className="font-body text-sm font-semibold text-sage-600 bg-white/80 px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          <p className="font-body text-xs text-blush-500 font-medium tracking-wide uppercase mb-1">
            {product.category}
          </p>

          <h3 className="font-display text-sm font-semibold text-sage-800 leading-snug mb-2 line-clamp-2 group-hover:text-blush-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-gold-400 text-gold-400"
                      : "fill-cream-200 text-cream-200"
                  )}
                />
              ))}
            </div>
            <span className="font-body text-xs text-sage-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="font-display font-semibold text-base text-sage-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-body text-xs text-sage-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-semibold transition-all shrink-0",
                inCart
                  ? "bg-sage-100 text-sage-700"
                  : "bg-blush-600 text-white hover:bg-blush-700 active:bg-blush-800",
                !product.inStock && "opacity-50 cursor-not-allowed"
              )}
              aria-label={inCart ? "Already in cart" : `Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {inCart ? "In Cart" : "Add"}
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}