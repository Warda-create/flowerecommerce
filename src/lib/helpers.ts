import { Product, CartItem, Order } from "@/types";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "./constants";

export function calculateCartTotals(items: CartItem[], couponDiscount = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );
  const discount = (subtotal * couponDiscount) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;

  return { subtotal, discount, shipping, tax, total };
}

export function getProductsByCategorySlug(products: Product[], slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductsByOccasion(products: Product[], occasion: string) {
  return products.filter((p) =>
    p.occasions.some((o) => o.toLowerCase() === occasion.toLowerCase())
  );
}

export function sortProducts(products: Product[], sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "popularity":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }
}

export function getOrderStatusStep(status: string): number {
  const steps: Record<string, number> = {
    pending: 0,
    confirmed: 1,
    preparing: 2,
    out_for_delivery: 3,
    delivered: 4,
  };
  return steps[status] ?? 0;
}

export function isProductOnSale(product: Product): boolean {
  return product.discount !== undefined && product.discount > 0;
}

export function getDiscountedPrice(originalPrice: number, discountPct: number): number {
  return originalPrice * (1 - discountPct / 100);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function buildQueryString(params: Record<string, string | string[] | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.set(key, value);
    }
  });
  const str = searchParams.toString();
  return str ? `?${str}` : "";
}