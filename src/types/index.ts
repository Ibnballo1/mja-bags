export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: string;
  compareAtPrice: string | null;
  sku: string | null;
  stockQuantity: number;
  categoryId: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  category: Category | null;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  slug: string;
  stockQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  status: OrderStatus;
  subtotal: string;
  shippingCost: string;
  total: string;
  shippingAddress: ShippingAddress;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  payment: Payment | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  productImage: string | null;
  sku: string | null;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface Payment {
  id: string;
  orderId: string;
  paystackReference: string;
  paystackTransactionId: string | null;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paidAt: Date | null;
  createdAt: Date;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  ordersByStatus: Record<OrderStatus, number>;
}
