import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "@/styles/globals.css";

const lato = Inter({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flora & Grace — Premium Flower Shop",
    template: "%s | Flora & Grace",
  },
  description:
    "Handcrafted luxury bouquets delivered fresh to your door. Shop roses, peonies, sunflowers, mixed bouquets and more. Same-day delivery available.",
  keywords: [
    "flower shop",
    "bouquets",
    "roses",
    "peonies",
    "flower delivery",
    "luxury flowers",
    "same-day delivery",
    "wedding flowers",
    "birthday flowers",
  ],
  authors: [
    {
      name: "Flora & Grace",
    },
  ],
  creator: "Flora & Grace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://floraandgrace.com",
    siteName: "Flora & Grace",
    title: "Flora & Grace — Premium Flower Shop",
    description: "Handcrafted luxury bouquets delivered fresh to your door.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Flora & Grace Premium Flowers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flora & Grace — Premium Flower Shop",
    description: "Handcrafted luxury bouquets delivered fresh to your door.",
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="font-body text-sage-900 bg-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blush-600 text-white px-4 py-2 rounded-xl font-body text-sm font-medium"
        >
          Skip to main content
        </a>

        <AnnouncementBar />

        <Header />

        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "var(--font-lato)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            },
          }}
        />
      </body>
    </html>
  );
}