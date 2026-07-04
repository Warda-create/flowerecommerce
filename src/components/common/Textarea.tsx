import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  charLimit?: number;
  currentLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, charLimit, currentLength, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={textareaId}
              className="text-sm font-body font-medium text-sage-700"
            >
              {label}
              {props.required && (
                <span className="text-blush-500 ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            {charLimit && (
              <span
                className={cn(
                  "text-xs font-body tabular-nums",
                  currentLength !== undefined && currentLength > charLimit * 0.9
                    ? "text-blush-600"
                    : "text-sage-400"
                )}
              >
                {currentLength ?? 0}/{charLimit}
              </span>
            )}
          </div>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full font-body text-sm text-sage-800 bg-white border rounded-xl px-4 py-3 transition-all duration-200 resize-none",
            "placeholder:text-sage-400",
            "focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300",
            "disabled:bg-cream-50 disabled:text-sage-400 disabled:cursor-not-allowed",
            error
              ? "border-red-400 focus:ring-red-200 focus:border-red-400"
              : "border-cream-300 hover:border-cream-400",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs font-body text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
            className="mt-1.5 text-xs font-body text-sage-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };