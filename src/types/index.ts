export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categorySlug: string;
  occasions: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  sizes: ProductSize[];
  customizable: boolean;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  careInstructions: string[];
  deliveryInfo: DeliveryInfo;
  colors: string[];
  flowerTypes: string[];
  createdAt: string;
}

export interface ProductSize {
  id: string;
  name: string;
  label: string;
  price: number;
  description: string;
}

export interface DeliveryInfo {
  sameDayAvailable: boolean;
  expressAvailable: boolean;
  standardDays: string;
  freeDeliveryThreshold: number;
}

export interface ProductCustomization {
  wrapping?: string;
  ribbon?: string;
  addOns?: string[];
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  occasion: string;
  date: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSize: ProductSize;
  giftMessage?: string;
  deliveryDate?: string;
  customizations?: ProductCustomization;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftMessage?: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSize: ProductSize;
  unitPrice: number;
  total: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface FilterOptions {
  categories: string[];
  occasions: string[];
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
  onSale: boolean;
  colors: string[];
  flowerTypes: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CouponCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiresAt: string;
  isValid: boolean;
}

export interface DeliverySlot {
  id: string;
  label: string;
  timeRange: string;
  available: boolean;
  price: number;
}

export interface CheckoutFormData {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: Address;
  deliveryDate: string;
  deliverySlot: string;
  giftMessage?: string;
  paymentMethod: "card" | "paypal" | "cod";
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  couponCode?: string;
  specialInstructions?: string;
}