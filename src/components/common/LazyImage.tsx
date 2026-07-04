"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
}

export default function LazyImage({
  src,
  alt,
  fallback = "/images/placeholder-flower.jpg",
  containerClassName,
  showSkeleton = true,
  className,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imgSrc = hasError ? fallback : src;

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-200 to-cream-100 animate-pulse z-10" />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}