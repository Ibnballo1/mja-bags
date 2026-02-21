import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Package } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { getOrderByPaystackReference } from "../../../../actions/payments";
import { formatPrice, formatDate } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";

interface OrderConfirmPageProps {
  searchParams: Promise<{ reference?: string }>;
}

async function OrderConfirmContent({ reference }: { reference: string }) {
  const result = await getOrderByPaystackReference(reference);

  if (!result) {
    return (
      <div className="text-center py-16">
        <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
          Order Not Found
        </h2>
        <p className="text-[#6B7280] mb-6">
          We could not find this order. Please contact support.
        </p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const { order, payment } = result;
  const isSuccess = payment?.status === "success";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Status */}
      <div className="text-center mb-10">
        {isSuccess ? (
          <>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-2">
              Payment Successful!
            </h1>
            <p className="text-[#6B7280]">
              Thank you for your order. We&apos;ll send a confirmation to{" "}
              <strong>{order.customerEmail}</strong>.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <Package className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-2">
              Order Received
            </h1>
            <p className="text-[#6B7280]">
              Your order is pending payment confirmation.
            </p>
          </>
        )}
      </div>

      {/* Order details */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-cream-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280] uppercase tracking-widest">
              Order Number
            </p>
            <p className="font-mono font-semibold text-[#1E1E1E] mt-0.5">
              {order.orderNumber}
            </p>
          </div>
          <Badge
            variant={
              order.status === "paid" || order.status === "delivered"
                ? "default"
                : order.status === "cancelled"
                  ? "destructive"
                  : "secondary"
            }
            // className={order.status === "paid" || order.status === "delivered" && "bg-green-400"}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#6B7280]">Date</p>
            <p className="font-medium text-[#1E1E1E] mt-0.5">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-[#6B7280]">Total</p>
            <p className="font-semibold text-olive-700 mt-0.5">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-serif font-semibold text-[#1E1E1E] mb-4">
            Items Ordered
          </h3>
          <ul className="space-y-3">
            {order.items.map((item: (typeof order.items)[number]) => (
              <li
                key={item.id}
                className="flex justify-between items-start text-sm"
              >
                <div>
                  <p className="font-medium text-[#1E1E1E]">
                    {item.productName}
                  </p>
                  <p className="text-[#6B7280]">
                    Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                  </p>
                </div>
                <p className="font-semibold text-[#1E1E1E]">
                  {formatPrice(item.totalPrice)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping address */}
        <div>
          <h3 className="font-serif font-semibold text-[#1E1E1E] mb-2">
            Shipping To
          </h3>
          <p className="text-sm text-[#6B7280]">
            {order.customerName}
            <br />
            {order.shippingAddress.street}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/account/orders">View All Orders</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function OrderConfirmPage({
  searchParams,
}: OrderConfirmPageProps) {
  const { reference } = await searchParams;

  if (!reference) {
    redirect("/shop");
  }

  return (
    <div className="pt-24 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-olive-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          }
        >
          <OrderConfirmContent reference={reference} />
        </Suspense>
      </div>
    </div>
  );
}
