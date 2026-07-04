"use client";

import { useState } from "react";
import { Tag, X, Check, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

const validCoupons: Record<string, { discount: number; label: string }> = {
  BLOOM20: { discount: 20, label: "20% off your order" },
  WELCOME15: { discount: 15, label: "15% off for new customers" },
  ROSES10: { discount: 10, label: "10% off roses and bouquets" },
  SUMMER25: { discount: 25, label: "25% summer sale discount" },
};

export default function CouponForm() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { couponCode, applyCoupon, removeCoupon } = useCartStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    const upperCode = code.toUpperCase();
    const coupon = validCoupons[upperCode];

    if (coupon) {
      applyCoupon(upperCode, coupon.discount);
      toast.success(`Coupon applied: ${coupon.label}!`, { icon: "🎉" });
      setCode("");
    } else {
      toast.error("Invalid coupon code. Please try again.", { icon: "❌" });
    }

    setIsLoading(false);
  };

  if (couponCode) {
    const coupon = validCoupons[couponCode];
    return (
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
        <Check className="w-4 h-4 text-green-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-body text-xs font-semibold text-green-700">
            {couponCode}
          </p>
          {coupon && (
            <p className="font-body text-xs text-green-600 truncate">
              {coupon.label}
            </p>
          )}
        </div>
        <button
          onClick={removeCoupon}
          className="p-1 text-green-500 hover:text-green-700 transition-colors"
          aria-label="Remove coupon"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="font-body text-xs font-semibold text-sage-700 flex items-center gap-1.5 mb-2">
        <Tag className="w-3.5 h-3.5" />
        Promo Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder="Enter code"
          className="flex-1 px-3 py-2.5 bg-cream-50 border border-cream-200 rounded-xl font-body text-sm text-sage-800 placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 uppercase tracking-widest"
          maxLength={20}
        />
        <button
          onClick={handleApply}
          disabled={!code.trim() || isLoading}
          className="px-4 py-2.5 bg-blush-600 text-white rounded-xl font-body text-sm font-medium hover:bg-blush-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shrink-0 flex items-center gap-1.5"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Apply"
          )}
        </button>
      </div>
      <p className="font-body text-xs text-sage-400 mt-1.5">
        Try: BLOOM20, WELCOME15, ROSES10
      </p>
    </div>
  );
}