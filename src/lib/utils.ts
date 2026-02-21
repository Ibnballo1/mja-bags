import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency = "NGN",
  locale = "en-NG",
): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MJA-${timestamp}-${random}`;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getDiscountPercentage(
  price: number | string,
  compareAtPrice: number | string | null,
): number | null {
  if (!compareAtPrice) return null;
  const priceNum = typeof price === "string" ? parseFloat(price) : price;
  const compareNum =
    typeof compareAtPrice === "string"
      ? parseFloat(compareAtPrice)
      : compareAtPrice;
  if (compareNum <= priceNum) return null;
  return Math.round(((compareNum - priceNum) / compareNum) * 100);
}

export function isInStock(stockQuantity: number): boolean {
  return stockQuantity > 0;
}

export function getLowStockThreshold(stockQuantity: number): boolean {
  return stockQuantity > 0 && stockQuantity <= 5;
}
