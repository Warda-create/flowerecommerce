"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreditCard, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/common/Input";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

export default function PaymentMethods() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [showCvv, setShowCvv] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setValue("paymentMethod", method);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 border border-cream-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center">
          <span className="font-display font-bold text-sm text-blush-700">4</span>
        </div>
        <h2 className="font-display text-lg font-semibold text-sage-900">
          Payment Method
        </h2>
        <div className="ml-auto flex items-center gap-1.5 text-xs font-body text-sage-500">
          <Lock className="w-3.5 h-3.5 text-green-500" />
          Secure & encrypted
        </div>
      </div>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => handleMethodSelect(method.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
              selectedMethod === method.id
                ? "border-blush-500 bg-blush-50"
                : "border-cream-200 hover:border-blush-200"
            )}
          >
            <span className="text-2xl">{method.icon}</span>
            <span
              className={cn(
                "font-body text-xs font-medium text-center leading-tight",
                selectedMethod === method.id ? "text-blush-700" : "text-sage-600"
              )}
            >
              {method.label}
            </span>
          </button>
        ))}
      </div>

      <input type="hidden" value={selectedMethod} {...register("paymentMethod")} />

      {/* Card details */}
      {selectedMethod === "card" && (
        <div className="space-y-4">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            leftIcon={<CreditCard className="w-4 h-4" />}
            maxLength={19}
            {...register("cardDetails.cardNumber")}
            error={errors?.["cardDetails.cardNumber"]?.message as string}
            required
          />
          <Input
            label="Cardholder Name"
            placeholder="Jane Doe"
            {...register("cardDetails.cardHolder")}
            error={errors?.["cardDetails.cardHolder"]?.message as string}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              maxLength={5}
              {...register("cardDetails.expiryDate")}
              error={errors?.["cardDetails.expiryDate"]?.message as string}
              required
            />
            <Input
              label="CVV"
              type={showCvv ? "text" : "password"}
              placeholder="•••"
              maxLength={4}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="text-sage-400 hover:text-sage-600 transition-colors"
                  aria-label={showCvv ? "Hide CVV" : "Show CVV"}
                >
                  {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register("cardDetails.cvv")}
              error={errors?.["cardDetails.cvv"]?.message as string}
              required
            />
          </div>
          <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
            <Lock className="w-4 h-4 text-green-600 shrink-0" />
            <p className="font-body text-xs text-green-700">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      )}

      {selectedMethod === "paypal" && (
        <div className="text-center py-8 bg-blue-50 rounded-2xl">
          <p className="font-body text-sm text-sage-700 mb-2">
            You&apos;ll be redirected to PayPal to complete your payment securely.
          </p>
          <p className="font-body text-xs text-sage-500">
            PayPal Buyer Protection included on all orders.
          </p>
        </div>
      )}

      {selectedMethod === "cod" && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <p className="font-body text-sm text-amber-800 font-medium mb-1">
            Cash on Delivery
          </p>
          <p className="font-body text-xs text-amber-700">
            Pay with cash when your flowers arrive. A $2 COD handling fee applies.
            Please have exact change ready for the delivery driver.
          </p>
        </div>
      )}
    </div>
  );
}