"use client";

import { MapPin, ExternalLink } from "lucide-react";

export default function MapSection() {
  return (
    <section className="bg-cream-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-display text-2xl font-bold text-sage-900">
            Find Our Store
          </h2>

          <p className="font-body text-sage-500">
            Visit us in the heart of Manhattan
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-cream-100 bg-white shadow-soft">
          {/* Map Placeholder */}
          <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-sage-100 to-cream-100">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blush-100">
                <MapPin className="h-8 w-8 text-blush-500" />
              </div>

              <p className="font-display text-lg font-semibold text-sage-800">
                142 Blossom Street
              </p>

              <p className="font-body text-sm text-sage-500">
                New York, NY 10001
              </p>

              <a
                href="https://maps.google.com/?q=142+Blossom+Street+New+York+NY+10001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-medium text-blush-600 transition-colors hover:text-blush-700"
              >
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Decorative Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Information Cards */}
          <div className="grid divide-y divide-cream-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              {
                title: "Address",
                lines: [
                  "142 Blossom Street",
                  "New York, NY 10001",
                  "United States",
                ],
              },
              {
                title: "Nearest Transit",
                lines: [
                  "A/C/E — 14th St/8th Ave",
                  "1/2/3 — 14th St",
                  "L — 14th St/8th Ave",
                ],
              },
              {
                title: "Parking",
                lines: [
                  "Street parking available",
                  "Chelsea Piers Garage (0.3mi)",
                  "Icon Parking (0.4mi)",
                ],
              },
            ].map(({ title, lines }) => (
              <div key={title} className="px-6 py-5">
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wide text-sage-500">
                  {title}
                </p>

                {lines.map((line) => (
                  <p key={line} className="font-body text-sm text-sage-700">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}