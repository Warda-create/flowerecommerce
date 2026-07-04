"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl flex items-center justify-center border border-cream-200 text-sage-600 hover:border-blush-300 hover:text-blush-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sage-400"
          >
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={cn(
              "w-9 h-9 rounded-xl text-sm font-body font-medium transition-all",
              currentPage === page
                ? "bg-blush-600 text-white shadow-sm"
                : "border border-cream-200 text-sage-600 hover:border-blush-300 hover:text-blush-600"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl flex items-center justify-center border border-cream-200 text-sage-600 hover:border-blush-300 hover:text-blush-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}