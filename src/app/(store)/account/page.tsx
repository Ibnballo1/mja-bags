import type { Metadata } from "next";
import { requireAuth } from "@/src/lib/auth/helpers";
import { getOrdersByUser } from "@/src/actions/orders";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/src/lib/utils";
import SignOutButton from "@/src/components/account/sign-out-button";
import Link from "next/link";
import { Package, User } from "lucide-react";

interface OrderItem {
  productName: string;
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: Date;
  status: string;
  total: string | number;
  items: OrderItem[];
}

export const metadata: Metadata = {
  title: "My Account | MJA Bags",
};

export const dynamic = "force-dynamic";

const statusVariant: Record<
  string,
  "default" | "destructive" | "secondary" | "outline"
> = {
  pending: "secondary",
  paid: "default",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
  refunded: "outline",
};

export default async function AccountPage() {
  const session = await requireAuth();
  const orders = await getOrdersByUser(session.user.id);

  return (
    <div className="pt-24 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-[#1E1E1E]">
            My Account
          </h1>
          <p className="text-[#6B7280] mt-1">
            Welcome back, {session.user.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-olive-600" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">
                    Name
                  </p>
                  <p className="font-medium text-[#1E1E1E]">
                    {session.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="font-medium text-[#1E1E1E]">
                    {session.user.email}
                  </p>
                </div>
                <Separator />
                <SignOutButton />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-olive-700">
                    {orders.length}
                  </p>
                  <p className="text-sm text-[#6B7280] mt-1">Total Orders</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-olive-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {orders.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <Package className="h-12 w-12 text-cream-300 mx-auto mb-3" />
                    <p className="font-serif text-lg font-semibold text-[#1E1E1E] mb-1">
                      No orders yet
                    </p>
                    <p className="text-sm text-[#6B7280] mb-4">
                      Your order history will appear here
                    </p>
                    <Link
                      href="/shop"
                      className="text-olive-700 text-sm font-medium hover:underline"
                    >
                      Start Shopping →
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-cream-100">
                    {orders.map((order: Order) => (
                      <li
                        key={order.id}
                        className="p-6 hover:bg-cream-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-mono text-sm font-semibold text-olive-700">
                              {order.orderNumber}
                            </p>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={statusVariant[order.status] ?? "default"}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                            <p className="font-semibold text-[#1E1E1E]">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                          {order.items.length > 0 && (
                            <>
                              {" "}
                              —{" "}
                              {order.items
                                .slice(0, 2)
                                .map((i) => i.productName)
                                .join(", ")}
                              {order.items.length > 2 &&
                                ` +${order.items.length - 2} more`}
                            </>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
