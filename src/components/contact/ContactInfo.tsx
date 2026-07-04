import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (212) 555-0100",
    href: "tel:+12125550100",
    description: "Mon–Sat 8am–8pm, Sun 9am–6pm",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@floraandgrace.com",
    href: "mailto:hello@floraandgrace.com",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "142 Blossom Street",
    href: "https://maps.google.com",
    description: "New York, NY 10001",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 8am–8pm",
    description: "Sunday: 9am–6pm",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-2xl font-bold text-sage-900">
          Get in Touch
        </h2>

        <p className="font-body leading-relaxed text-sage-500">
          Have a question about an order, want to plan a custom arrangement,
          or need help choosing the perfect flowers? We&apos;re here to help.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map(
          ({ icon: Icon, label, value, href, description }) => (
            <div key={label} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-50">
                <Icon className="h-5 w-5 text-blush-600" />
              </div>

              <div>
                <p className="mb-0.5 font-body text-xs font-semibold uppercase tracking-wide text-sage-500">
                  {label}
                </p>

                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-body font-semibold text-sage-800 transition-colors hover:text-blush-600"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-body font-semibold text-sage-800">
                    {value}
                  </p>
                )}

                {description && (
                  <p className="mt-0.5 font-body text-xs text-sage-500">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Social */}
      <div className="border-t border-cream-100 pt-4">
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-sage-500">
          Follow Us
        </p>

        <div className="flex gap-2">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-cream-200 text-sage-500 transition-all hover:border-blush-400 hover:text-blush-600"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Same Day */}
      <div className="rounded-2xl border border-blush-100 bg-blush-50 p-4">
        <p className="mb-1 font-body text-sm font-semibold text-blush-800">
          🌸 Same-Day Orders
        </p>

        <p className="font-body text-xs text-blush-700">
          Need flowers today? Order before 2:00 PM for same-day delivery, or
          call us directly and we&apos;ll do our best to help!
        </p>
      </div>
    </div>
  );
}