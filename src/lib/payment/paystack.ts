import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface PaystackHeaders {
  [key: string]: string;
  Authorization: string;
  "Content-Type": string;
}

function getHeaders(): PaystackHeaders {
  return {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

export interface InitializePaymentParams {
  email: string;
  amount: number; // in kobo (smallest unit)
  reference: string;
  metadata?: Record<string, string | number>;
  callback_url?: string;
}

export interface PaystackTransaction {
  id: number;
  status: string;
  reference: string;
  amount: number;
  gateway_response: string;
  paid_at: string;
  channel: string;
  currency: string;
  customer: {
    email: string;
    name: string;
  };
}

export async function initializePaystackPayment(
  params: InitializePaymentParams,
): Promise<{
  authorization_url: string;
  access_code: string;
  reference: string;
}> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email: params.email,
      amount: Math.round(params.amount * 100), // convert to kobo
      reference: params.reference,
      metadata: params.metadata,
      callback_url: params.callback_url,
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return data.data;
}

export async function verifyPaystackTransaction(
  reference: string,
): Promise<PaystackTransaction> {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: getHeaders(),
    },
  );

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || "Failed to verify transaction");
  }

  return data.data;
}

export function verifyPaystackWebhook(
  payload: string,
  signature: string,
): boolean {
  const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET!;
  const hash = crypto
    .createHmac("sha512", webhookSecret)
    .update(payload)
    .digest("hex");

  return hash === signature;
}

export function generatePaymentReference(orderId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MJA-${orderId.slice(0, 8).toUpperCase()}-${timestamp}-${random}`;
}
