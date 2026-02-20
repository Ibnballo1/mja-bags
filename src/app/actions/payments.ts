"use server";

import { db } from "@/src/index";
import { orders, payments } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { verifyPaystackTransaction } from "@/src/lib/payment/paystack";

export async function verifyAndUpdatePayment(reference: string) {
  // Check if already processed (idempotency)
  const existingPayment = await db.query.payments.findFirst({
    where: eq(payments.paystackReference, reference),
    with: { order: { with: { items: true } } },
  });

  if (!existingPayment) {
    throw new Error("Payment record not found");
  }

  if (existingPayment.status === "success") {
    return { success: true, payment: existingPayment };
  }

  // Verify with Paystack
  const transaction = await verifyPaystackTransaction(reference);

  const isSuccess = transaction.status === "success";

  // Update payment
  await db
    .update(payments)
    .set({
      status: isSuccess ? "success" : "failed",
      paystackTransactionId: String(transaction.id),
      gatewayResponse: {
        gateway_response: transaction.gateway_response,
        channel: transaction.channel,
        currency: transaction.currency,
      },
      paidAt: isSuccess ? new Date(transaction.paid_at) : null,
      updatedAt: new Date(),
    })
    .where(eq(payments.paystackReference, reference));

  // Update order status
  if (isSuccess) {
    await db
      .update(orders)
      .set({ status: "paid", updatedAt: new Date() })
      .where(eq(orders.id, existingPayment.orderId));
  }

  return { success: isSuccess, payment: existingPayment };
}

export async function getOrderByPaystackReference(reference: string) {
  const payment = await db.query.payments.findFirst({
    where: eq(payments.paystackReference, reference),
  });

  if (!payment) return null;

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, payment.orderId),
    with: { items: true },
  });

  if (!order) return null;

  return { order, payment };
}
