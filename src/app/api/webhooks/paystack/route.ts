import { type NextRequest, NextResponse } from "next/server";
import { verifyPaystackWebhook } from "@/src/lib/payment/paystack";
import { verifyAndUpdatePayment } from "@/src/actions/payments";
// import { db } from "@/db";
// import { orders } from "@/db/schema";
// import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature") ?? "";

  // Verify webhook authenticity
  if (!verifyPaystackWebhook(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: {
    event: string;
    data: {
      reference: string;
      status: string;
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Handle charge events
  if (event.event === "charge.success" || event.event === "charge.failed") {
    try {
      await verifyAndUpdatePayment(event.data.reference);
    } catch (error) {
      console.error("Webhook processing error:", error);
      // Return 200 to acknowledge receipt even if processing failed
      // Paystack will retry on non-2xx
    }
  }

  return NextResponse.json({ received: true });
}
