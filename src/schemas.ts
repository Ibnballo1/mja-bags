import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const addressSchema = z.object({
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required").default("Nigeria"),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().optional(),
  shippingAddress: addressSchema,
  notes: z.string().max(500).optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required").max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens",
    ),
  description: z.string().min(10, "Description is required"),
  shortDescription: z.string().max(300).optional(),
  price: z.coerce.number().positive("Price must be positive"),
  compareAtPrice: z.coerce.number().positive().optional().nullable(),
  sku: z.string().max(100).optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0),
  categoryId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens",
    ),
  description: z.string().max(500).optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const orderStatusUpdateSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum([
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ]),
});

export const productFiltersSchema = z.object({
  categoryId: z.string().uuid().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sortBy: z
    .enum(["newest", "price_asc", "price_desc", "name_asc"])
    .default("newest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().max(100).optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
