// src/app/admin/orders/page.tsx

import type { Metadata } from "next";
import { getAllOrdersAdmin } from "@/src/actions/orders";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { formatPrice, formatDate } from "@/src/lib/utils";
import OrderStatusSelect from "@/src/components/admin/order-status-select";
import { User, Package, CreditCard, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Orders | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Orders
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          {orders.length} {orders.length === 1 ? "order" : "orders"} in total
        </p>
      </div>

      {/* Mobile View: Order Cards (Visible on < md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">
            No orders found.
          </p>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="border-border bg-card rounded-2xl overflow-hidden shadow-sm"
            >
              <CardContent className="p-5 space-y-4">
                {/* Top Row: Order # and Date */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-1 bg-primary/5 rounded-md self-start">
                      #{order.orderNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-bold">
                      <Calendar className="h-3 w-3" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground truncate">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {order.customerEmail}
                    </p>
                  </div>
                </div>

                {/* Actions: Payment & Status Update */}
                <div className="pt-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.1em] font-black text-muted-foreground flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      Payment
                    </span>
                    <Badge
                      variant={
                        order.payment?.status === "success"
                          ? "default"
                          : order.payment?.status === "failed"
                            ? "destructive"
                            : "secondary"
                      }
                      className="rounded-md font-bold uppercase text-[9px] tracking-tighter"
                    >
                      {order.payment?.status ?? "pending"}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.1em] font-black text-muted-foreground flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Fulfillment Status
                    </span>
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Desktop View: Table (Visible on md+) */}
      <Card className="hidden md:block border-border shadow-sm rounded-2xl overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
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
                      className="text-left text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-bold px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-20 text-muted-foreground text-sm"
                    >
                      No orders found in the database.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-primary/[0.01] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                          #{order.orderNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {order.customerEmail}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground">
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
                          className="rounded-md font-bold uppercase text-[10px]"
                        >
                          {order.payment?.status ?? "pending"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="min-w-[140px]">
                          <OrderStatusSelect
                            orderId={order.id}
                            currentStatus={order.status}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
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
