import type { Metadata } from "next";
import { getAllOrdersAdmin } from "@/src/actions/orders";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/src/lib/utils";
import OrderStatusSelect from "@/src/components/admin/order-status-select";
// import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders | Admin",
};

export const dynamic = "force-dynamic";

const statusVariant: Record<
  string,
  | "default"
  | "success"
  | "warning"
  | "destructive"
  | "secondary"
  | "gold"
  | "outline"
> = {
  pending: "warning",
  paid: "success",
  processing: "secondary",
  shipped: "default",
  delivered: "success",
  cancelled: "destructive",
  refunded: "outline",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">Orders</h1>
        <p className="text-[#6B7280] mt-1">{orders.length} total orders</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  {[
                    "Order",
                    "Customer",
                    "Items",
                    "Total",
                    "Payment",
                    "Status",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-16 text-[#6B7280]"
                    >
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order: (typeof orders)[number]) => (
                    <tr
                      key={order.id}
                      className="hover:bg-cream-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-olive-700">
                          {order.orderNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-[#1E1E1E]">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1E1E1E]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            order.payment?.status === "success"
                              ? "default"
                              : order.payment?.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {order.payment?.status ?? "pending"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <OrderStatusSelect
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
