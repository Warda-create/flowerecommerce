export const SITE_NAME = "Flora & Grace";
export const SITE_URL = "https://floraandgrace.com";
export const SITE_DESCRIPTION =
  "Handcrafted luxury bouquets delivered fresh to your door.";

export const FREE_SHIPPING_THRESHOLD = 75;
export const TAX_RATE = 0.09;

export const DELIVERY_SLOTS = [
  { id: "morning", label: "Morning", timeRange: "8:00 AM – 12:00 PM", price: 0 },
  { id: "afternoon", label: "Afternoon", timeRange: "12:00 PM – 4:00 PM", price: 0 },
  { id: "evening", label: "Evening", timeRange: "4:00 PM – 8:00 PM", price: 4.99 },
  { id: "express", label: "Express", timeRange: "Within 3 hours", price: 14.99 },
];

export const VALID_COUPONS: Record<string, { discount: number; type: "percentage"; label: string }> = {
  BLOOM20: { discount: 20, type: "percentage", label: "20% off your order" },
  WELCOME15: { discount: 15, type: "percentage", label: "15% off for new customers" },
  ROSES10: { discount: 10, type: "percentage", label: "10% off roses and bouquets" },
  SUMMER25: { discount: 25, type: "percentage", label: "25% summer sale" },
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Order Confirmed",
  preparing: "Preparing Your Arrangement",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PRODUCT_SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const INSTAGRAM_HANDLE = "@floraandgrace";
export const SUPPORT_EMAIL = "hello@floraandgrace.com";
export const SUPPORT_PHONE = "+1 (212) 555-0100";
export const STORE_ADDRESS = "142 Blossom Street, New York, NY 10001";

export const STORE_HOURS = {
  weekdays: "8:00 AM – 8:00 PM",
  saturday: "8:00 AM – 8:00 PM",
  sunday: "9:00 AM – 6:00 PM",
};

export const PRODUCTS_PER_PAGE = 12;
export const GIFT_MESSAGE_CHAR_LIMIT = 200;
export const MAX_DELIVERY_DAYS_AHEAD = 30;
export const MIN_DELIVERY_DAYS_AHEAD = 1;