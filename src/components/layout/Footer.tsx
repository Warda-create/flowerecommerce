import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
} from "lucide-react";


const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Flowers", href: "/shop" },
      { label: "Roses", href: "/shop?category=roses" },
      { label: "Peonies", href: "/shop?category=peonies" },
      { label: "Mixed Bouquets", href: "/shop?category=mixed-bouquets" },
      { label: "Plants", href: "/shop?category=plants" },
      { label: "Wedding Flowers", href: "/shop?category=wedding" },
      { label: "Gift Boxes", href: "/shop?category=gift-boxes" },
    ],
  },
  occasions: {
    title: "Occasions",
    links: [
      { label: "Valentine's Day", href: "/shop?occasion=valentines-day" },
      { label: "Birthday", href: "/shop?occasion=birthday" },
      { label: "Anniversary", href: "/shop?occasion=anniversary" },
      { label: "Mother's Day", href: "/shop?occasion=mothers-day" },
      { label: "Wedding", href: "/shop?occasion=wedding" },
      { label: "Sympathy", href: "/shop?occasion=sympathy" },
      { label: "Graduation", href: "/shop?occasion=congratulations" },
    ],
  },
  help: {
    title: "Help & Info",
    links: [
      { label: "FAQs", href: "/contact" },
      { label: "Delivery Information", href: "/contact" },
      { label: "Care Instructions", href: "/contact" },
      { label: "Track Your Order", href: "/order-tracking" },
      { label: "Returns Policy", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Meet the Team", href: "/about" },
      { label: "Sustainability", href: "/about" },
      { label: "Press & Media", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Wholesale", href: "/contact" },
    ],
  },
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="bg-sage-950 text-cream-200">
      {/* Newsletter */}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blush-400 to-blush-600 flex items-center justify-center">
                <span className="text-white font-display text-sm font-bold">
                  F
                </span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-white block leading-none">
                  Flora & Grace
                </span>
                <span className="font-body text-[9px] text-cream-400 tracking-[0.15em] uppercase">
                  Premium Florals
                </span>
              </div>
            </Link>

            <p className="font-body text-sm text-cream-400 leading-relaxed mb-6 max-w-xs">
              Crafting extraordinary floral experiences since 2008. Every bloom
              is hand-selected, every arrangement a work of art, every delivery
              a moment of pure joy.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2.5 text-sm text-cream-400 font-body">
                <MapPin className="w-4 h-4 shrink-0 text-blush-400 mt-0.5" />
                <span>142 Blossom Street, New York, NY 10001</span>
              </div>
              <a
                href="tel:+12125550100"
                className="flex items-center gap-2.5 text-sm text-cream-400 hover:text-blush-300 transition-colors font-body"
              >
                <Phone className="w-4 h-4 shrink-0 text-blush-400" />
                +1 (212) 555-0100
              </a>
              <a
                href="mailto:hello@floraandgrace.com"
                className="flex items-center gap-2.5 text-sm text-cream-400 hover:text-blush-300 transition-colors font-body"
              >
                <Mail className="w-4 h-4 shrink-0 text-blush-400" />
                hello@floraandgrace.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-cream-400 font-body">
                <Clock className="w-4 h-4 shrink-0 text-blush-400 mt-0.5" />
                <span>Mon–Sat 8am–8pm · Sun 9am–6pm</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cream-400 hover:text-white hover:bg-blush-600 hover:border-blush-600 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-white font-semibold text-sm mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-cream-400 hover:text-blush-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-cream-500">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Flora & Grace. Made with{" "}
              <Heart className="w-3 h-3 text-blush-400 inline" /> in New York
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-cream-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-cream-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-cream-300 transition-colors"
              >
                Cookies
              </Link>
            </div>
            {/* Payment icons placeholder */}
            <div className="flex items-center gap-2 text-cream-600">
              <span className="px-2 py-0.5 border border-white/20 rounded text-[10px] font-semibold">
                VISA
              </span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-[10px] font-semibold">
                MC
              </span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-[10px] font-semibold">
                AMEX
              </span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-[10px] font-semibold">
                PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}