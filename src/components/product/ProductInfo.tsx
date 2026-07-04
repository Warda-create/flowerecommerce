"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Check,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { Product, ProductSize } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Rating from "@/components/common/Rating";
import Badge from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import QuantitySelector from "./QuantitySelector";
import GiftMessageForm from "./GiftMessageForm";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[1] || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState("");
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem, isInCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity, giftMessage, deliveryDate);
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`, {
      icon: "🌸",
      style: { borderRadius: "12px" },
    });
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", { icon: "🔗" });
    }
  };

  const currentPrice = selectedSize.price;
  const originalPrice = product.originalPrice
    ? (product.originalPrice * selectedSize.price) / product.price
    : undefined;

  return (
    <div className="space-y-6">
      {/* Category + badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/shop?category=${product.categorySlug}`}
          className="font-body text-xs text-blush-500 font-medium tracking-wide uppercase hover:text-blush-700 transition-colors"
        >
          {product.category}
        </Link>
        {product.bestSeller && (
          <Badge variant="bestseller" size="xs">Best Seller</Badge>
        )}
        {product.newArrival && (
          <Badge variant="new" size="xs">New Arrival</Badge>
        )}
        {product.discount && (
          <Badge variant="sale" size="xs">Save {product.discount}%</Badge>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-sage-900 leading-snug mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <Rating
            value={product.rating}
            showValue
            showCount={product.reviewCount}
            size="sm"
          />
          <span className="text-cream-300">|</span>
          <a
            href="#reviews"
            className="font-body text-xs text-blush-600 hover:text-blush-700 transition-colors"
          >
            Read reviews
          </a>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-bold text-sage-900">
          {formatPrice(currentPrice)}
        </span>
        {originalPrice && (
          <span className="font-body text-lg text-sage-400 line-through">
            {formatPrice(originalPrice)}
          </span>
        )}
        {product.discount && (
          <span className="font-body text-sm font-semibold text-blush-600">
            {product.discount}% off
          </span>
        )}
      </div>

      {/* Short description */}
      <p className="font-body text-sm text-sage-600 leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-sm font-semibold text-sage-800">
            Size
          </span>
          <span className="font-body text-xs text-sage-500">
            Currently:{" "}
            <span className="text-sage-700 font-medium">
              {selectedSize.label} — {selectedSize.description}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "relative flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center",
                selectedSize.id === size.id
                  ? "border-blush-500 bg-blush-50"
                  : "border-cream-200 hover:border-blush-200 bg-white"
              )}
            >
              {selectedSize.id === size.id && (
                <Check className="absolute top-1.5 right-1.5 w-3 h-3 text-blush-500" />
              )}
              <span
                className={cn(
                  "font-body font-semibold text-sm",
                  selectedSize.id === size.id ? "text-blush-700" : "text-sage-800"
                )}
              >
                {size.label}
              </span>
              <span className="font-body text-xs text-sage-500 mt-0.5">
                {size.description}
              </span>
              <span
                className={cn(
                  "font-display font-bold text-sm mt-1",
                  selectedSize.id === size.id ? "text-blush-600" : "text-sage-700"
                )}
              >
                {formatPrice(size.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flower types + colors */}
      <div className="flex flex-wrap gap-3">
        <div>
          <span className="font-body text-xs text-sage-500 block mb-1.5">
            Flowers
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.flowerTypes.map((f) => (
              <Badge key={f} variant="outline" size="xs">
                {f}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <span className="font-body text-xs text-sage-500 block mb-1.5">
            Colors
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.colors.map((c) => (
              <Badge key={c} variant="outline-blush" size="xs">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <span className="font-body text-sm font-semibold text-sage-800 block mb-2">
          Quantity
        </span>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={product.stockCount}
        />
        {product.stockCount < 10 && product.inStock && (
          <p className="mt-2 font-body text-xs text-amber-600 font-medium">
            Only {product.stockCount} left in stock — order soon!
          </p>
        )}
      </div>

      {/* Gift message toggle */}
      {product.customizable && (
        <div>
          <button
            onClick={() => setShowGiftMessage(!showGiftMessage)}
            className="flex items-center gap-2 font-body text-sm text-sage-700 hover:text-blush-600 transition-colors"
          >
            <span className="w-5 h-5 rounded border-2 border-cream-300 flex items-center justify-center shrink-0">
              {showGiftMessage && <Check className="w-3 h-3 text-blush-500" />}
            </span>
            Add a personalized gift message
          </button>

          <AnimatePresence>
            {showGiftMessage && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-3"
              >
                <GiftMessageForm
                  value={giftMessage}
                  onChange={setGiftMessage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Delivery date */}
      <div>
        <label className="font-body text-sm font-semibold text-sage-800 block mb-2">
          Preferred Delivery Date
          <span className="font-normal text-sage-500 ml-1">(optional)</span>
        </label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
          max={new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0]}
          className="w-full px-4 py-2.5 border border-cream-200 rounded-xl font-body text-sm text-sage-800 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 bg-white"
        />
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3">
        <Button
          variant={addedToCart ? "secondary" : "luxury"}
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          fullWidth
          leftIcon={
            addedToCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )
          }
          className="text-base"
        >
          {addedToCart ? "Added to Cart!" : product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <button
          onClick={() => {
            toggleItem(product);
            toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist", {
              icon: inWishlist ? "💔" : "💖",
            });
          }}
          className={cn(
            "w-14 h-14 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all",
            inWishlist
              ? "border-blush-500 bg-blush-50 text-blush-600"
              : "border-cream-200 text-sage-500 hover:border-blush-300 hover:text-blush-500"
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("w-5 h-5", inWishlist && "fill-current")}
          />
        </button>

        <button
          onClick={handleShare}
          className="w-14 h-14 rounded-xl border-2 border-cream-200 text-sage-500 hover:border-sage-300 hover:text-sage-700 flex items-center justify-center shrink-0 transition-all"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          {
            icon: Truck,
            title: "Free Delivery",
            sub: "Orders over $75",
          },
          {
            icon: Shield,
            title: "Freshness Guaranteed",
            sub: "7-day promise",
          },
          {
            icon: Leaf,
            title: "Sustainably Sourced",
            sub: "Eco-friendly farms",
          },
        ].map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-cream-50"
          >
            <Icon className="w-5 h-5 text-sage-500" />
            <span className="font-body text-xs font-semibold text-sage-700">
              {title}
            </span>
            <span className="font-body text-[10px] text-sage-500">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}