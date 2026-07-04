"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-4xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showClose = true,
  closeOnBackdrop = true,
  footer,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className={cn(
              "relative w-full bg-white rounded-3xl shadow-luxury overflow-hidden",
              sizeClasses[size],
              className
            )}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-start justify-between px-6 pt-6 pb-0">
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      className="font-display text-xl font-semibold text-sage-900"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm font-body text-sage-500"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="ml-4 p-2 rounded-xl text-sage-400 hover:text-sage-600 hover:bg-sage-100 transition-colors shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 pb-6 border-t border-cream-100 pt-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}