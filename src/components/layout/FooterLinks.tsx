import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export default function FooterLinks({ title, links, className }: FooterLinksProps) {
  return (
    <div className={cn("", className)}>
      <h3 className="font-display text-white font-semibold text-sm mb-4 tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-cream-400 hover:text-blush-300 transition-colors inline-flex items-center gap-1"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="font-body text-sm text-cream-400 hover:text-blush-300 transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}