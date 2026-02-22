import type { Metadata } from "next";
import { TrendingUp, ShoppingBag, Package, Users } from "lucide-react";
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

  // 2. Fallback if stats are missing to prevent UNDEFINED_VALUE errors
  if (!stats) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Dashboard Unavailable</h1>
        <p className="text-gray-500">
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
    | "default"
    | "link"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost"
    | null
    | undefined
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
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
          Dashboard
        </h1>
        <p className="text-[#6B7280] mt-1">Welcome back to MJA Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] font-medium">{label}</p>
                  <p className="font-serif text-2xl font-bold text-[#1E1E1E] mt-1">
                    {value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link
            href="/admin/orders"
            className="text-sm text-olive-700 hover:underline font-medium"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Order
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Customer
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Items
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Total
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {stats.recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-[#6B7280] text-sm"
                    >
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  stats.recentOrders.map(
                    (order: (typeof stats.recentOrders)[number]) => (
                      <tr
                        key={order.id}
                        className="hover:bg-cream-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-mono text-sm font-medium text-olive-700 hover:underline"
                          >
                            {order.orderNumber}
                          </Link>
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
                            variant={statusVariant[order.status] || "default"}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
