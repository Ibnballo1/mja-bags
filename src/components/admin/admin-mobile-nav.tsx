"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Store,
  LogOut,
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  dashboard: LayoutDashboard,
  products: Package,
  categories: Tag,
  orders: ShoppingBag,
};

interface NavLink {
  href: string;
  label: string;
  icon: keyof typeof ICON_MAP;
}

interface AdminMobileNavProps {
  links: NavLink[];
  userName: string;
  userEmail: string;
}

export default function AdminMobileNav({
  links,
  userName,
  userEmail,
}: AdminMobileNavProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-product transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream-200">
          <div>
            <p className="font-semibold text-[#1E1E1E] text-sm">{userName}</p>
            <p className="text-xs text-[#6B7280] truncate max-w-[180px]">
              {userEmail}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-widest px-3 mb-3 mt-1">
            Navigation
          </p>
          {links.map(({ href, label, icon }) => {
            const Icon = ICON_MAP[icon];
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-olive-50 hover:text-olive-800 transition-colors group"
              >
                <Icon className="h-4 w-4 shrink-0 group-hover:text-olive-600 transition-colors" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-cream-200 space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-cream-100 transition-colors"
          >
            <Store className="h-4 w-4 shrink-0" />
            View Store
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
