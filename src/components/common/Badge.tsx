import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-body font-semibold rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-sage-100 text-sage-700",
        primary: "bg-blush-100 text-blush-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
        gold: "bg-gold-100 text-gold-700",
        luxury: "bg-gradient-to-r from-blush-600 to-rose-600 text-white",
        outline: "border border-sage-200 text-sage-600 bg-transparent",
        "outline-blush": "border border-blush-300 text-blush-700 bg-transparent",
        sale: "bg-red-500 text-white",
        new: "bg-sage-600 text-white",
        bestseller: "bg-gold-500 text-white",
      },
      size: {
        xs: "text-[10px] px-2 py-0.5",
        sm: "text-xs px-2.5 py-1",
        md: "text-xs px-3 py-1.5",
        lg: "text-sm px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  dot?: boolean;
  dotColor?: string;
}

export default function Badge({
  className,
  variant,
  size,
  icon,
  dot,
  dotColor = "bg-blush-500",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}