import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, Sun, Wind, Star, AlertTriangle, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Bag Care Guide",
  description:
    "Learn how to care for your MAJ Bag — cleaning, conditioning, storage, and repair tips to keep your bag beautiful for years.",
};

const leatherSteps = [
  {
    step: "01",
    title: "Daily Wipe-Down",
    body: "After each use, lightly wipe your bag with a dry, soft microfibre cloth to remove dust and surface oils. This takes 30 seconds and makes a visible difference over time.",
  },
  {
    step: "02",
    title: "Spot Cleaning",
    body: "For small marks and dirt, dampen a clean cloth with plain water (never soaking wet) and gently blot — never rub — the affected area. Allow to air-dry naturally, away from heat.",
  },
  {
    step: "03",
    title: "Conditioning",
    body: "Every 3–6 months, apply a small amount of leather conditioner with a soft cloth using circular motions. This replenishes natural oils, prevents cracking, and deepens the leather's patina.",
  },
  {
    step: "04",
    title: "Deep Clean",
    body: "For thorough cleaning, use a pH-balanced leather cleaner. Test on a hidden area first. Apply gently with a soft brush or cloth, working in small sections. Allow to dry fully before conditioning.",
  },
];

const storageRules = [
  {
    icon: Wind,
    label: "Breathe",
    desc: "Store in the dust bag provided or a breathable cotton pillowcase. Never in plastic — leather needs airflow.",
  },
  {
    icon: Sun,
    label: "Stay Cool",
    desc: "Keep away from direct sunlight and heat sources. UV and heat dry out leather and fade colours prematurely.",
  },
  {
    icon: Droplets,
    label: "Stay Dry",
    desc: "Store in a dry environment. Damp conditions cause mould and mildew. If your bag gets wet, let it air-dry naturally — never use a hairdryer.",
  },
  {
    icon: Star,
    label: "Keep Shape",
    desc: "Stuff your bag loosely with acid-free tissue paper when storing to maintain its structure. Do not overstuff.",
  },
];

const doNotList = [
  "Submerge in water or machine wash",
  "Use baby wipes, alcohol-based cleaners, or household sprays",
  "Expose to prolonged direct sunlight",
  "Store in a plastic bag or airtight container",
  "Overload beyond the bag's designed capacity",
  "Apply aerosol sprays directly onto the leather",
  "Rub aggressively when wet — pat dry instead",
  "Leave in a hot car for extended periods",
];

const canvasTips = [
  {
    title: "Spot Cleaning",
    body: "Use a soft brush or damp cloth with a small amount of mild soap. Work in gentle circular motions, then rinse with a clean damp cloth. Air-dry only.",
  },
  {
    title: "Stain Removal",
    body: "For tougher stains, mix lukewarm water with a tiny drop of washing-up liquid. Apply with a soft toothbrush, scrub lightly, wipe clean. Act quickly — the faster you treat a stain, the better.",
  },
  {
    title: "Storage",
    body: "Keep in a cool, dry place. Canvas can be loosely folded for storage but avoid heavy creasing. Air it out if it's been stored for a while before using.",
  },
];

export default function CareGuidePage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-900 to-olive-700 py-24 px-4 text-white">
        <div className="absolute inset-0 opacity-10 bg-noise" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs text-gold-300 uppercase tracking-[0.3em] mb-5">
            Care &amp; Maintenance
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight mb-6">
            A Bag That Lasts a Lifetime
          </h1>
          <p className="text-olive-200 text-lg leading-relaxed max-w-xl mx-auto">
            Quality leather improves with age when cared for properly. Follow
            this guide and your MAJ bag will become more beautiful with every
            passing year.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50L1440 50L1440 20C1200 50 720 0 0 30L0 50Z"
              fill="#F8F9F6"
            />
          </svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Leather care steps */}
        <section>
          <div className="mb-10">
            <p className="text-xs text-[#6B7280] uppercase tracking-[0.25em] mb-2">
              For Leather Bags
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1E1E1E]">
              Cleaning Your Leather Bag
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {leatherSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-7 shadow-soft border border-cream-200"
              >
                <span className="font-serif text-4xl font-bold text-olive-200 block mb-4">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#1E1E1E] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Storage rules */}
        <section>
          <div className="mb-10">
            <p className="text-xs text-[#6B7280] uppercase tracking-[0.25em] mb-2">
              Long-Term Care
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1E1E1E]">
              Storing Your Bag
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {storageRules.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex gap-4 bg-cream-50 border border-cream-200 rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-olive-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-olive-700" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E1E1E] mb-1">{label}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Canvas bags */}
        <section>
          <div className="mb-10">
            <p className="text-xs text-[#6B7280] uppercase tracking-[0.25em] mb-2">
              For Canvas Bags
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1E1E1E]">
              Caring for Canvas
            </h2>
          </div>
          <div className="space-y-5">
            {canvasTips.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-5 bg-white border border-cream-200 rounded-2xl p-6 shadow-soft"
              >
                <span className="font-serif text-2xl font-bold text-gold-400 flex-shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif font-semibold text-[#1E1E1E] mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {tip.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do not do */}
        <section className="bg-red-50 border border-red-100 rounded-3xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                What to Avoid
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                These common mistakes shorten your bag&apos;s life
                significantly.
              </p>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {doNotList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-[#1E1E1E]"
              >
                <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Recommended products */}
        <section className="bg-white border border-cream-200 rounded-3xl p-8 shadow-soft">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-olive-100 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-olive-700" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                Recommended Products
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Products we trust and use ourselves in our studio.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: "Leather Conditioner",
                brand: "Leather Honey",
                use: "Conditioning & moisture",
              },
              {
                name: "Leather Cleaner",
                brand: "Chamberlain's Leather Milk",
                use: "Deep cleaning",
              },
              {
                name: "Microfibre Cloth",
                brand: "Any soft brand",
                use: "Daily wiping",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-cream-50 rounded-2xl p-4 border border-cream-200"
              >
                <p className="font-medium text-[#1E1E1E] text-sm">
                  {product.name}
                </p>
                <p className="text-xs text-olive-700 font-medium mt-0.5">
                  {product.brand}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">{product.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Repairs */}
        <section className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-olive-100 flex items-center justify-center mx-auto mb-5">
            <Wrench className="h-6 w-6 text-olive-700" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-3">
            Need a Repair?
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-sm leading-relaxed mb-6">
            All MAJ bags come with a 1-year quality guarantee covering
            manufacturing defects. If something goes wrong, we want to fix it.
            Contact our team with your order number and photos of the issue.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-olive-600 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-olive-700 transition-colors"
          >
            Contact Us About a Repair
          </Link>
        </section>
      </div>
    </div>
  );
}
