import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-blush-600 text-white hover:bg-blush-700 active:bg-blush-800 shadow-sm hover:shadow-md",
        secondary:
          "bg-sage-700 text-white hover:bg-sage-800 active:bg-sage-900 shadow-sm",
        outline:
          "border-2 border-blush-300 text-blush-700 hover:bg-blush-50 hover:border-blush-400 active:bg-blush-100",
        ghost:
          "text-sage-700 hover:bg-sage-100 hover:text-sage-900 active:bg-sage-200",
        danger:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm",
        luxury:
          "bg-gradient-to-r from-blush-600 to-rose-600 text-white hover:from-blush-700 hover:to-rose-700 shadow-md hover:shadow-luxury",
        cream:
          "bg-cream-100 text-sage-800 hover:bg-cream-200 active:bg-cream-300 border border-cream-200",
        white:
          "bg-white text-blush-700 hover:bg-blush-50 border border-cream-200 shadow-sm",
      },
      size: {
        xs: "text-xs px-3 py-1.5 rounded-lg",
        sm: "text-sm px-4 py-2 rounded-lg",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3",
        xl: "text-base px-8 py-4 rounded-2xl",
        icon: "w-9 h-9 rounded-xl",
        "icon-sm": "w-8 h-8 rounded-lg",
        "icon-lg": "w-11 h-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };