"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Gift, ChevronDown } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import QuantitySelector from "@/components/product/QuantitySelector";
import { motion, AnimatePresence } from "framer-motion";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const [showMessage, setShowMessage] = useState(false);
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-soft border border-cream-50">
      <div className="flex gap-4">
        {/* Image */}
        <Link href={`/product/${item.product.slug}`} className="shrink-0">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-cream-50">
            <Image
              src={item.product.images[0]}
              alt={item.product.name}
              fill
              sizes="112px"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/product/${item.product.slug}`}
                className="font-display font-semibold text-sage-900 hover:text-blush-700 transition-colors block leading-snug"
              >
                {item.product.name}
              </Link>
              <p className="font-body text-xs text-sage-500 mt-1">
                Size: {item.selectedSize.label} ({item.selectedSize.description})
              </p>
              {item.deliveryDate && (
                <p className="font-body text-xs text-blush-600 mt-0.5">
                  Delivery: {new Date(item.deliveryDate).toLocaleDateString("en-US", {
                    weekday: "short", month: "short", day: "numeric"
                  })}
                </p>
              )}
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="p-2 rounded-lg text-sage-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
              aria-label={`Remove ${item.product.name} from cart`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Gift message toggle */}
          {item.giftMessage && (
            <button
              onClick={() => setShowMessage(!showMessage)}
              className="flex items-center gap-1.5 mt-2 text-xs font-body text-blush-600 hover:text-blush-700"
            >
              <Gift className="w-3.5 h-3.5" />
              Gift message
              <ChevronDown className={cn("w-3 h-3 transition-transform", showMessage && "rotate-180")} />
            </button>
          )}

          <AnimatePresence>
            {showMessage && item.giftMessage && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-1.5 text-xs font-body text-sage-600 italic bg-blush-50 px-3 py-2 rounded-lg border border-blush-100"
              >
                &ldquo;{item.giftMessage}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>

          {/* Qty + price */}
          <div className="flex items-center justify-between mt-3">
            <QuantitySelector
              value={item.quantity}
              onChange={(qty) => updateQuantity(item.id, qty)}
              size="sm"
              max={item.product.stockCount}
            />
            <div className="text-right">
              <span className="font-display font-bold text-lg text-sage-900">
                {formatPrice(item.selectedSize.price * item.quantity)}
              </span>
              {item.quantity > 1 && (
                <p className="font-body text-xs text-sage-400">
                  {formatPrice(item.selectedSize.price)} each
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}