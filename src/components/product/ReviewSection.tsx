"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThumbsUp, CheckCircle, Star } from "lucide-react";
import { Review } from "@/types";
import { formatRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Rating from "@/components/common/Rating";
import { Button } from "@/components/common/Button";

interface ReviewSectionProps {
  reviews: Review[];
  productRating: number;
  reviewCount: number;
}

export default function ReviewSection({
  reviews,
  productRating,
  reviewCount,
}: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "highest" | "lowest">("helpful");
  const [showAll, setShowAll] = useState(false);

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const displayed = showAll ? sorted : sorted.slice(0, 4);

  return (
    <div id="reviews" className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold text-sage-900 mb-8">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center p-6 bg-blush-50 rounded-3xl text-center">
          <span className="font-display text-6xl font-bold text-sage-900 leading-none mb-2">
            {productRating.toFixed(1)}
          </span>
          <Rating value={productRating} size="md" className="mb-2" />
          <p className="font-body text-sm text-sage-500">
            Based on {reviewCount} review{reviewCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Distribution */}
        <div className="md:col-span-2 space-y-2">
          {ratingDistribution.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-14 shrink-0">
                <span className="font-body text-sm text-sage-700 font-medium">
                  {star}
                </span>
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              </div>
              <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-body text-xs text-sage-500 w-8 text-right shrink-0">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort options */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="font-body text-sm text-sage-500">Sort by:</span>
          {(["helpful", "recent", "highest", "lowest"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all",
                sortBy === opt
                  ? "bg-blush-600 text-white"
                  : "bg-cream-100 text-sage-600 hover:bg-cream-200"
              )}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Review cards */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-cream-50 rounded-2xl">
          <p className="font-display text-lg text-sage-700 mb-1">No reviews yet</p>
          <p className="font-body text-sm text-sage-500">
            Be the first to share your experience
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {displayed.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft"
            >
              <div className="flex items-start gap-4">
                {review.userAvatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center shrink-0 text-blush-600 font-display font-semibold text-sm">
                    {review.userName[0]}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-body font-semibold text-sm text-sage-800">
                        {review.userName}
                      </span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-body">
                          <CheckCircle className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="font-body text-xs text-sage-400">
                      {formatRelativeDate(review.createdAt)}
                    </span>
                  </div>

                  <Rating value={review.rating} size="sm" className="mb-2" />

                  <h4 className="font-body font-semibold text-sm text-sage-800 mb-1">
                    {review.title}
                  </h4>
                  <p className="font-body text-sm text-sage-600 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="flex items-center gap-1 mt-3">
                    <button className="flex items-center gap-1.5 text-xs font-body text-sage-400 hover:text-sage-600 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {reviews.length > 4 && (
            <div className="text-center pt-2">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? "Show fewer reviews"
                  : `Show all ${reviews.length} reviews`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}