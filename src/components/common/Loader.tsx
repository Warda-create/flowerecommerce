// src/components/common/Loader.tsx
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  fullPage?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function Loader({ size = "md", className, text, fullPage }: LoaderProps) {
  const spinner = (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-blush-500", sizeMap[size])} />
      {text && (
        <p className="font-body text-sm text-sage-500 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}