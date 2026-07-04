import { Truck, Zap, Clock, CheckCircle } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface DeliveryInfoProps {
  product: Product;
}

export default function DeliveryInfo({ product }: DeliveryInfoProps) {
  const { deliveryInfo } = product;

  return (
    <div className="bg-white rounded-2xl border border-cream-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-cream-100">
        <h3 className="font-display text-base font-semibold text-sage-800">
          Delivery Options
        </h3>
      </div>

      <div className="divide-y divide-cream-50">
        {deliveryInfo.sameDayAvailable && (
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-sage-800">
                Same-Day Delivery
              </p>
              <p className="font-body text-xs text-sage-500 mt-0.5">
                Order before 2:00 PM for delivery today
              </p>
              <p className="font-body text-xs font-semibold text-amber-600 mt-1">
                From $14.99
              </p>
            </div>
          </div>
        )}

        {deliveryInfo.expressAvailable && (
          <div className="flex items-start gap-3 px-5 py-4">
            <div className="w-9 h-9 rounded-xl bg-blush-50 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-blush-600" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-sage-800">
                Express Delivery
              </p>
              <p className="font-body text-xs text-sage-500 mt-0.5">
                Next business day delivery
              </p>
              <p className="font-body text-xs font-semibold text-blush-600 mt-1">
                From $9.99
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-sage-50 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-sage-600" />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-sage-800">
              Standard Delivery
            </p>
            <p className="font-body text-xs text-sage-500 mt-0.5">
              {deliveryInfo.standardDays}
            </p>
            <p className="font-body text-xs text-sage-500 mt-1">
              Free on orders over{" "}
              <span className="font-semibold text-sage-700">
                ${deliveryInfo.freeDeliveryThreshold}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 px-5 py-4 bg-cream-50">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
          <p className="font-body text-xs text-sage-600">
            All deliveries include a{" "}
            <span className="font-semibold">7-day freshness guarantee</span>.
            If your flowers aren&apos;t perfect, we&apos;ll replace them free of charge.
          </p>
        </div>
      </div>
    </div>
  );
}