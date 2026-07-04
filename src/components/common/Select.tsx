import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full font-body text-sm text-sage-800 bg-white border rounded-xl px-4 py-2.5 pr-10 appearance-none transition-all duration-200 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300",
              "disabled:bg-cream-50 disabled:text-sage-400 disabled:cursor-not-allowed",
              error
                ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                : "border-cream-300 hover:border-cream-400",
              !props.value && !props.defaultValue && "text-sage-400",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : hint
                  ? `${selectId}-hint`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 pointer-events-none" />
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-xs font-body text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${selectId}-hint`}
            className="mt-1.5 text-xs font-body text-sage-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };