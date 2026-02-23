// src/app/admin/page.tsx
import type { Metadata } from "next";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowRight,
} from "lucide-react";
import { getAdminStats } from "../../actions/orders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { formatPrice, formatDate } from "@/src/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | MJA Bags",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats;
  try {
    stats = await getAdminStats();
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <h1 className="text-xl font-bold">Dashboard Unavailable</h1>
        <p className="text-gray-500 max-w-sm mx-auto mt-2">
          Please check your database connection and environment variables.
        </p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Active Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: "bg-olive-100 text-olive-700",
    },
    {
      label: "Customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: "bg-gold-100 text-gold-700",
    },
  ];

  const statusVariant: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    pending: "secondary",
    paid: "default",
    processing: "outline",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
    refunded: "secondary",
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
          Dashboard
        </h1>
        <p className="text-[#6B7280] mt-1">Welcome back to MJA Admin</p>
      </div>

      {/* Stats - Grid adjustments for tiny screens */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="overflow-hidden">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-[#6B7280] font-medium uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="font-serif text-xl md:text-2xl font-bold text-[#1E1E1E]">
                    {value}
                  </p>
                </div>
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="border-none shadow-sm md:border md:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle className="text-lg md:text-xl">Recent Orders</CardTitle>
          <Link
            href="/admin/orders"
            className="text-sm text-olive-700 hover:text-olive-800 flex items-center gap-1 font-semibold group"
          >
            View all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile View: List layout */}
          <div className="block md:hidden divide-y divide-gray-100">
            {stats.recentOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No orders yet</div>
            ) : (
              stats.recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-4 active:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-sm font-bold text-olive-700">
                      {order.orderNumber}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-medium">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariant[order.status] || "default"}
                      className="text-[10px] h-5"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Desktop View: Table layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200 bg-cream-50/50">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Order
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Customer
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Items
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Total
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {stats.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-cream-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono text-sm font-medium text-olive-700 group-hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-medium text-[#1E1E1E]">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {order.customerEmail}
                      </p>
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
                        variant={statusVariant[order.status] || "default"}
                        className="capitalize"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
