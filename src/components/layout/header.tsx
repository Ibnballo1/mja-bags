// src/components/layout/header.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Search } from "lucide-react";
import { useCartContext } from "@/src/lib/cart-context";
import { authClient } from "@/src/lib/auth/client";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import CartDrawer from "../cart/cart-drawer";

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/90 border-b border-border shadow-sm py-2"
            : "bg-transparent py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-1 font-serif text-2xl lg:text-3xl font-bold text-secondary tracking-tighter transition-transform active:scale-95"
            >
              MAJ
              <span className="text-secondary group-hover:animate-pulse">
                .
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[13px] uppercase tracking-[0.15em] font-semibold text-foreground/70 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-secondary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-foreground/70 hover:text-primary hover:bg-primary/5"
                asChild
              >
                <Link href="/shop">
                  <Search className="h-[22px] w-[22px]" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>

              {session ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link href="/account">
                    <User className="h-[22px] w-[22px]" />
                    <span className="sr-only">Account</span>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden lg:flex text-foreground/70 hover:text-primary font-bold tracking-tight"
                >
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground/70 hover:text-primary hover:bg-primary/5"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-[22px] w-[22px]" />
                {isHydrated && cart.itemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary text-[9px] font-black text-primary-foreground flex items-center justify-center ring-2 ring-background">
                    {cart.itemCount > 9 ? "9+" : cart.itemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>

              {/* Mobile toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground hover:bg-primary/5"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={cn(
            "fixed inset-0 top-[60px] z-50 lg:hidden bg-background/95 backdrop-blur-2xl transition-all duration-300 ease-in-out transform",
            isMobileOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0",
          )}
        >
          <nav className="flex flex-col p-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors border-b border-border pb-4"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-8 space-y-4">
              {session ? (
                <Link
                  href="/account"
                  className="flex items-center gap-3 text-lg font-bold text-primary"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <User className="h-5 w-5" />
                  My Account Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-border h-14"
                    asChild
                  >
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="rounded-xl bg-primary h-14"
                    asChild
                  >
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
