"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showCount?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  showCount,
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Rating" : `Rating: ${value} out of ${max}`}
    >
      <div className="flex items-center gap-0.5">
        {stars.map((star) => {
          const filled = star <= Math.floor(value);
          const partial = !filled && star === Math.ceil(value) && value % 1 > 0;

          return (
            <button
              key={star}
              type={interactive ? "button" : undefined}
              onClick={interactive && onChange ? () => onChange(star) : undefined}
              disabled={!interactive}
              className={cn(
                "relative shrink-0 transition-transform",
                interactive &&
                  "hover:scale-110 cursor-pointer focus:outline-none focus:scale-110"
              )}
              aria-label={interactive ? `${star} star${star > 1 ? "s" : ""}` : undefined}
              role={interactive ? "radio" : undefined}
              aria-checked={interactive ? value === star : undefined}
            >
              {partial ? (
                <div className="relative">
                  <Star
                    className={cn(sizeMap[size], "text-cream-200 fill-cream-200")}
                  />
                  <div className="absolute inset-0 overflow-hidden w-[50%]">
                    <Star
                      className={cn(
                        sizeMap[size],
                        "text-gold-400 fill-gold-400"
                      )}
                    />
                  </div>
                </div>
              ) : (
                <Star
                  className={cn(
                    sizeMap[size],
                    filled
                      ? "text-gold-400 fill-gold-400"
                      : "text-cream-200 fill-cream-200"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span
          className={cn(
            "font-body font-semibold text-sage-700 ml-0.5",
            textSizeMap[size]
          )}
        >
          {value.toFixed(1)}
        </span>
      )}

      {showCount !== undefined && (
        <span className={cn("font-body text-sage-400", textSizeMap[size])}>
          ({showCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}