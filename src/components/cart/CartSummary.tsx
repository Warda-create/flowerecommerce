"use client";

import Link from "next/link";
import { ArrowRight, Tag, Shield, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import CouponForm from "./CouponForm";

export default function CartSummary() {
  const {
    getSubtotal,
    getDiscount,
    getShipping,
    getTax,
    getTotal,
    couponCode,
    couponDiscount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const freeShippingThreshold = 75;
  const progressPct = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-cream-50 overflow-hidden sticky top-24">
      <div className="px-6 py-5 border-b border-cream-100">
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Order Summary
        </h2>
      </div>

      <div className="px-6 py-5 space-y-4">
        {/* Free shipping progress */}
        {subtotal < freeShippingThreshold && (
          <div className="bg-cream-50 rounded-xl p-3">
            <p className="font-body text-xs text-sage-600 mb-2">
              You&apos;re{" "}
              <span className="font-semibold text-blush-600">
                {formatPrice(freeShippingThreshold - subtotal)}
              </span>{" "}
              away from free delivery!
            </p>
            <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blush-400 to-blush-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= freeShippingThreshold && (
          <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3">
            <Truck className="w-4 h-4 text-green-600 shrink-0" />
            <p className="font-body text-xs text-green-700 font-medium">
              You&apos;ve unlocked free delivery! 🎉
            </p>
          </div>
        )}

        {/* Coupon */}
        <CouponForm />

        {/* Line items */}
        <div className="space-y-2.5 pt-2">
          <div className="flex justify-between font-body text-sm">
            <span className="text-sage-600">Subtotal</span>
            <span className="font-medium text-sage-800">{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && couponCode && (
            <div className="flex justify-between font-body text-sm text-green-600">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Discount ({couponCode})
              </span>
              <span className="font-medium">-{formatPrice(discount)}</span>
            </div>
          )}

          <div className="flex justify-between font-body text-sm">
            <span className="text-sage-600">Shipping</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-sage-800"}>
              {shipping === 0 ? "FREE" : formatPrice(shipping)}
            </span>
          </div>

          <div className="flex justify-between font-body text-sm">
            <span className="text-sage-600">Tax (9%)</span>
            <span className="font-medium text-sage-800">{formatPrice(tax)}</span>
          </div>

          <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-cream-100">
            <span className="text-sage-900">Total</span>
            <span className="text-blush-700">{formatPrice(total)}</span>
          </div>
        </div>

        <Link href="/checkout">
          <Button
            variant="luxury"
            fullWidth
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="mt-2"
          >
            Proceed to Checkout
          </Button>
        </Link>

        {/* Trust badges */}
        <div className="flex flex-col gap-2 pt-2">
          {[
            { icon: Shield, text: "Secure SSL encrypted checkout" },
            { icon: Truck, text: "7-day freshness guarantee" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-sage-400 shrink-0" />
              <span className="font-body text-xs text-sage-500">{text}</span>
            </div>
          ))}
        </div>

        {/* Payment icons */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
            <span
              key={p}
              className="px-2 py-0.5 border border-cream-200 rounded text-[10px] font-body font-semibold text-sage-500"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}