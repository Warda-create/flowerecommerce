"use client";

import { AlertTriangle, Trash2, CheckCircle, Info } from "lucide-react";
import Modal from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  isLoading?: boolean;
}

const variantConfig = {
  danger: {
    icon: Trash2,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    confirmVariant: "danger" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    confirmVariant: "primary" as const,
  },
  info: {
    icon: Info,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    confirmVariant: "primary" as const,
  },
  success: {
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    confirmVariant: "primary" as const,
  },
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showClose={false}
      closeOnBackdrop={!isLoading}
    >
      <div className="text-center">
        <div
          className={`w-14 h-14 ${config.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-7 h-7 ${config.iconColor}`} />
        </div>

        <h3 className="font-display text-lg font-semibold text-sage-900 mb-2">
          {title}
        </h3>
        <p className="font-body text-sm text-sage-500 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            fullWidth
            className="border border-cream-200"
          >
            {cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}