import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400 mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="font-display text-lg font-semibold text-sage-800 mb-2">
        {title}
      </h3>
      <p className="font-body text-sm text-sage-500 max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}