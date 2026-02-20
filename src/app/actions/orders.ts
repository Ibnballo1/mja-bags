"use server";

import { db } from "@/src";
import { orders, orderItems, payments, products } from "@/src/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { checkoutSchema, orderStatusUpdateSchema } from "@/src/schemas";
import {
  initializePaystackPayment,
  generatePaymentReference,
} from "@/src/lib/payment/paystack";
import { generateOrderNumber } from "@/src/utils";
import { getOptionalSession, requireAdmin } from "@/src/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import type { CartItem } from "@/src/types";

export async function createOrder(
  checkoutData: Parameters<typeof checkoutSchema.parse>[0],
  cartItems: CartItem[],
) {
  const validated = checkoutSchema.parse(checkoutData);

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const session = await getOptionalSession();

  // Validate stock and prices
  const productIds = cartItems.map((i) => i.productId);
  const dbProducts = await db.query.products.findMany({
    where: (p, { inArray }) => inArray(p.id, productIds),
  });

  for (const cartItem of cartItems) {
    const dbProduct = dbProducts.find((p) => p.id === cartItem.productId);
    if (!dbProduct || !dbProduct.isActive) {
      throw new Error(`Product "${cartItem.name}" is no longer available`);
    }
    if (dbProduct.stockQuantity < cartItem.quantity) {
      throw new Error(
        `Insufficient stock for "${cartItem.name}". Only ${dbProduct.stockQuantity} left.`,
      );
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = 0; // free shipping
  const total = subtotal + shippingCost;

  // Create order in transaction
  const order = await db.transaction(async (tx) => {
    const orderNumber = generateOrderNumber();

    const [newOrder] = await tx
      .insert(orders)
      .values({
        orderNumber,
        userId: session?.user?.id ?? null,
        customerEmail: validated.customerEmail,
        customerName: validated.customerName,
        customerPhone: validated.customerPhone ?? null,
        status: "pending",
        subtotal: String(subtotal),
        shippingCost: String(shippingCost),
        total: String(total),
        shippingAddress: validated.shippingAddress,
        notes: validated.notes ?? null,
      })
      .returning();

    await tx.insert(orderItems).values(
      cartItems.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        productName: item.name,
        productImage: item.image,
        sku: null,
        quantity: item.quantity,
        unitPrice: String(item.price),
        totalPrice: String(item.price * item.quantity),
      })),
    );

    return newOrder;
  });

  // Initialize Paystack payment
  const reference = generatePaymentReference(order.id);

  await db.insert(payments).values({
    orderId: order.id,
    paystackReference: reference,
    amount: String(total),
    currency: "NGN",
    status: "pending",
  });

  const paymentData = await initializePaystackPayment({
    email: validated.customerEmail,
    amount: total,
    reference,
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerName: validated.customerName,
    },
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/confirm?reference=${reference}`,
  });

  return {
    order,
    authorizationUrl: paymentData.authorization_url,
    reference,
  };
}

export async function getOrderByNumber(orderNumber: string) {
  return db.query.orders.findFirst({
    where: eq(orders.orderNumber, orderNumber),
    with: {
      items: true,
      payment: true,
    },
  });
}

export async function getOrdersByUser(userId: string) {
  return db.query.orders.findMany({
    where: eq(orders.userId, userId),
    with: {
      items: true,
      payment: true,
    },
    orderBy: [desc(orders.createdAt)],
  });
}

export async function getAllOrdersAdmin() {
  await requireAdmin();

  return db.query.orders.findMany({
    with: {
      items: true,
      payment: true,
    },
    orderBy: [desc(orders.createdAt)],
  });
}

export async function updateOrderStatus(
  data: Parameters<typeof orderStatusUpdateSchema.parse>[0],
) {
  await requireAdmin();
  const validated = orderStatusUpdateSchema.parse(data);

  const [order] = await db
    .update(orders)
    .set({ status: validated.status, updatedAt: new Date() })
    .where(eq(orders.id, validated.orderId))
    .returning();

  revalidatePath("/admin/orders");

  return order;
}

export async function getAdminStats() {
  await requireAdmin();

  const [revenueResult, orderCount, productCount, customerCount] =
    await Promise.all([
      db
        .select({ total: sql<number>`sum(total::numeric)` })
        .from(orders)
        .where(eq(orders.status, "paid")),
      db.select({ count: sql<number>`count(*)` }).from(orders),
      db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(eq(products.isActive, true)),
      db.select({ count: sql<number>`count(distinct user_id)` }).from(orders),
    ]);

  const recentOrders = await db.query.orders.findMany({
    with: { items: true, payment: true },
    orderBy: [desc(orders.createdAt)],
    limit: 5,
  });

  return {
    totalRevenue: Number(revenueResult[0]?.total ?? 0),
    totalOrders: Number(orderCount[0]?.count ?? 0),
    totalProducts: Number(productCount[0]?.count ?? 0),
    totalCustomers: Number(customerCount[0]?.count ?? 0),
    recentOrders,
  };
}
