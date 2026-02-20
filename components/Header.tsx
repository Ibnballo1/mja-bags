"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Search } from "lucide-react";
import { useCartContext } from "@/src/cart-context";
import { authClient } from "@/src/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?featured=true", label: "Featured" },
  { href: "/shop?category=totes", label: "Totes" },
  { href: "/shop?category=clutches", label: "Clutches" },
  { href: "/about", label: "Our Story" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, isHydrated } = useCartContext();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-cream-200"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-olive-700 tracking-tight hover:text-olive-900 transition-colors"
            >
              MJA
              <span className="text-gold-400">.</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#6B7280] hover:text-olive-700 transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                asChild
              >
                <Link href="/shop">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>

              {session ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden lg:flex"
                >
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {isHydrated && cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-olive-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {cart.itemCount > 9 ? "9+" : cart.itemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>

              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white border-t border-cream-200 px-4 py-6 space-y-4 shadow-card">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-[#1E1E1E] hover:text-olive-700 transition-colors py-1"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-cream-200">
              {session ? (
                <Link
                  href="/account"
                  className="block text-base font-medium text-[#1E1E1E] hover:text-olive-700 transition-colors py-1"
                  onClick={() => setIsMobileOpen(false)}
                >
                  My Account
                </Link>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Button variant="outline" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
