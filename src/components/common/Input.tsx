import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-body font-medium text-sage-700 mb-1.5"
          >
            {label}
            {props.required && (
              <span className="text-blush-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sage-400">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full font-body text-sm text-sage-800 bg-white border rounded-xl px-4 py-2.5 transition-all duration-200",
              "placeholder:text-sage-400",
              "focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300",
              "disabled:bg-cream-50 disabled:text-sage-400 disabled:cursor-not-allowed",
              error
                ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                : "border-cream-300 hover:border-cream-400",
              leftIcon && "pl-10",
              (rightIcon || rightElement) && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            {...props}
          />

          {(rightIcon || rightElement) && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {rightIcon ? (
                <span className="text-sage-400 pointer-events-none">
                  {rightIcon}
                </span>
              ) : (
                rightElement
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs font-body text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="mt-1.5 text-xs font-body text-sage-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };