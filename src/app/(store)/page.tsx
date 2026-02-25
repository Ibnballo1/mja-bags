// src/app/(store)/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import ProductCard from "@/src/components/product/product-card";
import { getFeaturedProducts } from "@/src/actions/product";
import { getCategories } from "@/src/actions/categories";
import { formatPrice } from "@/src/lib/utils";

export const metadata: Metadata = {
  title: "MAJ Bags — Premium Lifestyle Bags",
  description:
    "Discover MAJ Bags — premium handcrafted bags for those who appreciate quality, craftsmanship, and timeless elegance.",
};

export const revalidate = 3600; // ISR every hour

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(true),
  ]);

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-primary pt-20 overflow-hidden">
        {/* Background noise texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-noise" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-background/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Text Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-secondary/20 rounded-full px-4 py-1.5 mb-6 lg:mb-8 border border-secondary/30">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary text-xs lg:text-sm font-medium tracking-widest uppercase">
                  New Collection 2026
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6 lg:mb-8 text-balance">
                Carry Your <span className="text-secondary italic">Story</span>{" "}
                With Grace
              </h1>

              <p className="text-primary-foreground/80 text-base lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0">
                Premium handcrafted bags designed for those who move through
                life with intention. Each piece is a testament to enduring
                style.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-secondary text-foreground hover:bg-secondary/90 border-none px-8 h-14"
                >
                  <Link href="/shop" className="flex items-center gap-2">
                    Shop Collection
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 h-14"
                >
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>

              {/* Stats - Responsive Grid */}
              <div className="mt-12 lg:mt-16 grid grid-cols-3 gap-4 lg:gap-8 border-t border-primary-foreground/10 pt-8">
                {[
                  { label: "Handcrafted", value: "100%" },
                  { label: "Happy Clients", value: "2,000+" },
                  { label: "Founded", value: "2019" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-xl lg:text-3xl font-bold text-secondary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] lg:text-xs uppercase tracking-widest text-primary-foreground/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image / Brand Card */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] max-w-md mx-auto transform hover:rotate-2 transition-transform duration-700">
                <div className="absolute inset-0 rounded-3xl bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 shadow-2xl" />
                <div className="absolute inset-0 flex items-center justify-center bg-noise opacity-10" />
                <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center">
                  <div className="text-center text-primary-foreground/20">
                    <div className="font-serif text-8xl font-bold tracking-tighter">
                      MAJ
                    </div>
                    <div className="text-sm tracking-[0.3em] mt-2 font-light">
                      BAGS
                    </div>
                  </div>
                </div>
                {/* Floating Price Badge */}
                <div className="absolute -right-8 top-1/4 bg-card rounded-2xl p-5 shadow-2xl border border-border animate-bounce-slow">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    Starting from
                  </p>
                  <p className="font-serif text-2xl font-bold text-primary">
                    {formatPrice(15000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-24 overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-full"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60L48 52.5C96 45 192 30 288 22.5C384 15 480 15 576 22.5C672 30 768 45 864 48.75C960 52.5 1056 45 1152 37.5C1248 30 1344 22.5 1392 18.75L1440 15V60H0Z"
              fill="currentColor"
              className="text-background"
            />
          </svg>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "Complimentary delivery on all orders within Nigeria",
            },
            {
              icon: Shield,
              title: "Quality Assured",
              desc: "Every bag undergoes rigorous quality inspection",
            },
            {
              icon: RefreshCw,
              title: "Easy Returns",
              desc: "30-day hassle-free return policy",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-8 rounded-3xl bg-card border border-border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-card/30 rounded-[3rem] my-12 border border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-3">
                Curated Selection
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">
                Featured Pieces
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/shop" className="flex items-center gap-2">
                View All Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Shop By Category */}
      {categories.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4">
                Browse By Type
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground">
                Shop by Category
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?categoryId=${category.id}`}
                  className="group relative aspect-square rounded-[2rem] overflow-hidden bg-muted border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-serif text-2xl font-bold text-primary-foreground">
                      {category.name}
                    </h3>
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore Category
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Philosophy CTA */}
      <section className="py-24 lg:py-32 bg-noise relative">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.4em] mb-6">
            Our Philosophy
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Crafted for the{" "}
            <span className="italic text-primary">Discerning Few</span>
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Every MAJ bag is a testament to meticulous craftsmanship, premium
            materials, and thoughtful design. We believe that what you carry
            reflects who you are.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground px-10 h-14"
          >
            <Link href="/about" className="flex items-center gap-2 text-base">
              Discover Our Story
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
