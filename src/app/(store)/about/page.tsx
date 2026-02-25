import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Award, Users } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn the story behind MAJ Bags — a Lagos-born brand built on the belief that what you carry should reflect who you are.",
};

const values = [
  {
    icon: Heart,
    title: "Made with Intention",
    description:
      "Every stitch, every clasp, every detail is considered. We don't rush craft — we let it breathe.",
  },
  {
    icon: Leaf,
    title: "Sustainably Minded",
    description:
      "We source responsibly and work with artisans who share our commitment to the environment.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Premium materials, rigorous quality control, and a 1-year guarantee on every piece.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Rooted in Lagos. Every bag sold supports local craftspeople and their families.",
  },
];

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    body: "MAJ was born in a small Lagos workshop. Our founder, frustrated by the lack of premium, locally-made bags, decided to create them herself — starting with ten totes sold to friends.",
  },
  {
    year: "2021",
    title: "A Community Forms",
    body: "Word spread quietly, organically. No ads, just women passing our bags across boardrooms, markets, and airports. By year two we had a waitlist for every drop.",
  },
  {
    year: "2023",
    title: "Refining the Vision",
    body: "We moved into a larger studio, brought on master leather workers, and launched our signature Olive Collection — the range that defined the MAJ aesthetic.",
  },
  {
    year: "2024",
    title: "Going Digital",
    body: "Our online store opened to the world. The same care and craft, now accessible from anywhere — with every order packed by hand in our Lagos atelier.",
  },
  {
    year: "2025",
    title: "Still Growing",
    body: "Over 2,000 bags carried across Nigeria and beyond. We remain independent, intentional, and deeply committed to the original vision: beautiful things, made right.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-olive-950 text-white py-32 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-noise" />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs text-gold-300 uppercase tracking-[0.3em] mb-6">
            Our Story
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8 text-balance">
            Rooted in Lagos.
            <br />
            <span className="text-gold-400">Built for the World.</span>
          </h1>
          <p className="text-olive-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            MAJ is not a fashion label chasing trends. We are a craft house
            obsessed with one thing: making the most considered bags on the
            continent — and eventually, the world.
          </p>
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

      {/* Opening statement */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-2xl sm:text-3xl text-[#1E1E1E] leading-relaxed text-center">
            &ldquo;I wanted a bag that felt like it understood me — the
            meetings, the markets, the late flights. I couldn&apos;t find one.
            So I made it.&rdquo;
          </p>
          <p className="text-center text-[#6B7280] mt-6 text-sm">
            — Founder, MAJ Bags
          </p>
        </div>
      </section>

      {/* The story — alternating layout */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-[0.2em] mb-4">
                Where It Began
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#1E1E1E] mb-6 leading-tight">
                A workshop, ten totes, and a refusal to settle
              </h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  In 2019, our founder set up a small workbench in a Lagos
                  apartment with one mission: craft a bag worthy of the Nigerian
                  woman — one that could move from Balogun Market to a boardroom
                  on Victoria Island without missing a beat.
                </p>
                <p>
                  The first collection was ten pieces. No store, no marketing.
                  Ten bags shared with ten women. Within a week, all ten had
                  passed our number to someone else. That was the beginning.
                </p>
                <p>
                  Five years later, the mission hasn&apos;t changed. The
                  workshop is bigger, the team has grown, but every bag still
                  leaves our studio having been touched by hands that care about
                  what they make.
                </p>
              </div>
            </div>

            {/* Visual block */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-olive-100 to-cream-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-8xl font-bold text-olive-300">
                    MAJ
                  </p>
                  <p className="text-olive-400 text-sm tracking-[0.4em] mt-2">
                    EST. 2019
                  </p>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-product max-w-[200px]">
                <p className="font-serif text-3xl font-bold text-olive-700">
                  2,000+
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  Bags carried across Nigeria and beyond
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-[#6B7280] uppercase tracking-[0.2em] mb-3">
              The Journey
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#1E1E1E]">
              Five years of quiet growth
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-cream-300 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex gap-8 sm:gap-0 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pb-0 pl-16 sm:pl-0 ${
                      index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-soft border border-cream-200 inline-block w-full sm:max-w-sm ${
                        index % 2 === 0 ? "sm:ml-auto" : ""
                      }`}
                    >
                      <p className="font-serif text-3xl font-bold text-gold-500 mb-2">
                        {milestone.year}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {milestone.body}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-8 sm:left-1/2 top-6 w-4 h-4 rounded-full bg-olive-600 border-4 border-cream-50 -translate-x-1/2 shadow-soft" />

                  {/* Empty half for alternating */}
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-olive-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-gold-300 uppercase tracking-[0.2em] mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl font-bold">Our Principles</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-olive-800 border border-olive-700 flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-6 w-6 text-gold-400" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-3">
                  {title}
                </h3>
                <p className="text-sm text-olive-300 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft detail section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-olive-200 to-olive-300 col-span-2" />
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-cream-200 to-cream-300" />
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
                <p className="font-serif text-4xl font-bold text-gold-600 opacity-50">
                  MAJ
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-[0.2em] mb-4">
                The Craft
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#1E1E1E] mb-6 leading-tight">
                Every detail is a decision
              </h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  We use full-grain and top-grain leathers sourced from
                  tanneries that meet our ethical standards. Hardware is solid
                  brass — the kind that develops a patina rather than peeling.
                </p>
                <p>
                  Interior linings are hand-stitched. Zips are YKK. Handles are
                  reinforced at every stress point. These aren&apos;t just specs
                  — they&apos;re commitments.
                </p>
                <p>
                  Each bag is inspected by at least two artisans before it
                  leaves our studio. If something isn&apos;t right, it goes
                  back. That has never changed and it never will.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-cream-200">
                {[
                  { label: "Artisans", value: "12" },
                  { label: "Quality Checks", value: "2×" },
                  { label: "Guarantee", value: "1 yr" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-2xl font-bold text-olive-700">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-cream-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-[#6B7280] uppercase tracking-[0.2em] mb-4">
            Ready to Find Yours?
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E1E1E] mb-6 leading-tight">
            A bag made for the life you actually live
          </h2>
          <p className="text-[#6B7280] leading-relaxed mb-10">
            Browse the collection and discover a piece that will be with you for
            years — not seasons.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Shop the Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
