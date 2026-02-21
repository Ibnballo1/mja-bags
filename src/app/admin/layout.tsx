import type { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Store,
} from "lucide-react";
import { requireAdmin } from "@/src/lib/auth/helpers";
import AdminMobileNav from "@/src/components/admin/admin-mobile-nav";

export const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" as const },
  { href: "/admin/products", label: "Products", icon: "products" as const },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: "categories" as const,
  },
  { href: "/admin/orders", label: "Orders", icon: "orders" as const },
];

const ICONS = {
  dashboard: LayoutDashboard,
  products: Package,
  categories: Tag,
  orders: ShoppingBag,
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-cream-200 shadow-soft z-30">
        {/* Brand */}
        <div className="p-6 border-b border-cream-200">
          <Link
            href="/admin"
            className="font-serif text-2xl font-bold text-olive-700"
          >
            MJA<span className="text-gold-400">.</span>
          </Link>
          <p className="text-xs text-[#6B7280] mt-0.5 tracking-wide font-medium">
            Admin Console
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {adminNavLinks.map(({ href, label, icon }) => {
            const Icon = ICONS[icon];
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-olive-50 hover:text-olive-800 transition-colors group"
              >
                <Icon className="h-4 w-4 shrink-0 group-hover:text-olive-600 transition-colors" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom — user info + back to store */}
        <div className="p-4 border-t border-cream-200 space-y-0.5">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-[#1E1E1E] truncate">
              {session.user.name}
            </p>
            <p className="text-xs text-[#6B7280] truncate">
              {session.user.email}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-cream-100 hover:text-olive-800 transition-colors"
          >
            <Store className="h-4 w-4 shrink-0" />
            View Store
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-cream-200 px-4 py-3 flex items-center justify-between shadow-soft">
          <Link
            href="/admin"
            className="font-serif text-xl font-bold text-olive-700"
          >
            MJA<span className="text-gold-400">.</span>
            <span className="text-xs text-[#6B7280] font-sans font-normal ml-1.5">
              Admin
            </span>
          </Link>
          <AdminMobileNav
            links={adminNavLinks}
            userName={session.user.name}
            userEmail={session.user.email}
          />
        </header>

        {/* Page content */}
        <div className="flex-1 p-5 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
