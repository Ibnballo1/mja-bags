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
  title: "MJA Bags — Premium Lifestyle Bags",
  description:
    "Discover MJA Bags — premium handcrafted bags for those who appreciate quality, craftsmanship, and timeless elegance.",
};

export const revalidate = 3600; // ISR every hour

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(true),
  ]);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-olive-950 via-olive-800 to-olive-600 pt-20">
        {/* Background noise texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-noise" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-olive-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gold-400/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-300 text-sm font-medium tracking-wide">
                  New Collection 2025
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
                Carry Your <span className="text-gold-400">Story</span> With
                Grace
              </h1>

              <p className="text-olive-200 text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                Premium handcrafted bags designed for those who move through
                life with intention. Each piece tells a story of craftsmanship
                and enduring style.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" variant="default">
                  <Link href="/shop">
                    Shop Collection
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                {[
                  { label: "Handcrafted", value: "100%" },
                  { label: "Happy Clients", value: "2,000+" },
                  { label: "Year Founded", value: "2019" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="font-serif text-2xl font-bold text-gold-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-olive-300 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-olive-700/50 backdrop-blur-sm border border-white/10" />
                <div className="absolute inset-0 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white/30">
                    <div className="font-serif text-6xl font-bold">MJA</div>
                    <div className="text-sm tracking-widest mt-2">BAGS</div>
                  </div>
                </div>
                {/* Floating price tag */}
                <div className="absolute -right-6 top-1/3 bg-white rounded-2xl p-4 shadow-product">
                  <p className="text-xs text-[#6B7280] font-medium">
                    Starting from
                  </p>
                  <p className="font-serif text-xl font-bold text-olive-700">
                    {formatPrice(15000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60L48 52.5C96 45 192 30 288 22.5C384 15 480 15 576 22.5C672 30 768 45 864 48.75C960 52.5 1056 45 1152 37.5C1248 30 1344 22.5 1392 18.75L1440 15V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z"
              fill="#F8F9F6"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8">
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
              className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-soft border border-cream-200"
            >
              <div className="w-10 h-10 rounded-xl bg-olive-100 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-olive-700" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-[#1E1E1E] mb-1">
                  {title}
                </h3>
                <p className="text-sm text-[#6B7280]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-3">
                Curated Selection
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#1E1E1E]">
                Featured Pieces
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/shop">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map(
              (product: (typeof featuredProducts)[number]) => (
                <ProductCard key={product.id} product={product} />
              ),
            )}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-3">
                Browse By Type
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#1E1E1E]">
                Shop by Category
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category: (typeof categories)[number]) => (
                <Link
                  key={category.id}
                  href={`/shop?categoryId=${category.id}`}
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 hover:shadow-card transition-all duration-300"
                >
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-olive-100 to-cream-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-950/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Story CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-[#6B7280] uppercase tracking-widest mb-4">
            Our Philosophy
          </p>
          <h2 className="font-serif text-5xl font-bold text-[#1E1E1E] mb-6 leading-tight">
            Crafted for the
            <br />
            <span className="text-olive-600">Discerning Few</span>
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Every MJA bag is a testament to meticulous craftsmanship, premium
            materials, and thoughtful design. We believe that what you carry
            reflects who you are.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">
              Discover Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
