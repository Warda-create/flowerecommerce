import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80"
            alt="Wilted flowers — page not found"
            fill
            className="object-cover rounded-full opacity-60"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/60 to-transparent" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="font-display text-5xl font-bold text-sage-300">404</span>
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-sage-900 mb-3">
          Oops! This page wilted away
        </h1>
        <p className="font-body text-sage-500 leading-relaxed mb-8">
          The page you&apos;re looking for has disappeared, like petals in the wind.
          Let&apos;s get you back to something beautiful.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="luxury" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg" leftIcon={<Search className="w-4 h-4" />}>
              Browse Flowers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}