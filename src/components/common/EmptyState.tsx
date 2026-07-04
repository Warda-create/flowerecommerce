import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      {icon && (
        <div className="w-20 h-20 rounded-full bg-blush-50 flex items-center justify-center text-blush-300 mb-5">
          {icon}
        </div>
      )}

      <h3 className="font-display text-xl font-semibold text-sage-800 mb-2">
        {title}
      </h3>

      {description && (
        <p className="font-body text-sm text-sage-500 max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action &&
            (action.href ? (
              <Link href={action.href}>
                <Button variant="primary">{action.label}</Button>
              </Link>
            ) : (
              <Button variant="primary" onClick={action.onClick}>
                {action.label}
              </Button>
            ))}

          {secondaryAction &&
            (secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button variant="outline">{secondaryAction.label}</Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}