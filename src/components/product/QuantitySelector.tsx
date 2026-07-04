"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: { btn: "w-7 h-7", input: "w-8 text-sm", wrapper: "rounded-lg" },
    md: { btn: "w-9 h-9", input: "w-10 text-sm", wrapper: "rounded-xl" },
    lg: { btn: "w-11 h-11", input: "w-12 text-base", wrapper: "rounded-xl" },
  }[size];

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-cream-200 bg-white",
        sizeClasses.wrapper,
        className
      )}
    >
      <button
        onClick={decrement}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
          sizeClasses.btn
        )}
        aria-label="Decrease quantity"
        type="button"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInput}
        min={min}
        max={max}
        className={cn(
          "text-center font-body font-semibold text-sage-800 bg-transparent focus:outline-none tabular-nums",
          sizeClasses.input
        )}
        aria-label="Quantity"
      />

      <button
        onClick={increment}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center text-sage-600 hover:text-blush-600 hover:bg-blush-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
          sizeClasses.btn
        )}
        aria-label="Increase quantity"
        type="button"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}