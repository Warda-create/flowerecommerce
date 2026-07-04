"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface NavigationProps {
  links: NavLink[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  onLinkClick?: () => void;
}

export default function Navigation({
  links,
  orientation = "horizontal",
  className,
  onLinkClick,
}: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (orientation === "vertical") {
    return (
      <nav className={cn("flex flex-col", className)}>
        {links.map((link) => (
          <div key={link.label}>
            <Link
              href={link.href === "#" ? "/" : link.href}
              onClick={onLinkClick}
              className={cn(
                "block py-3 px-2 font-body text-base font-medium border-b border-cream-100 transition-colors",
                isActive(link.href) && link.href !== "#"
                  ? "text-blush-600"
                  : "text-sage-700 hover:text-blush-600"
              )}
            >
              {link.label}
            </Link>
            {link.children && (
              <div className="pl-4 mb-2">
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={onLinkClick}
                    className="block py-2 text-sm font-body text-sage-500 hover:text-blush-600 transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href === "#" ? "/" : link.href}
          className={cn(
            "px-3 py-2 text-sm font-body font-medium rounded-lg transition-colors",
            isActive(link.href) && link.href !== "#"
              ? "text-blush-600 bg-blush-50"
              : "text-sage-700 hover:text-blush-600 hover:bg-blush-50"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}