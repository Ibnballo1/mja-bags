import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Globe,
  Clock,
  RefreshCw,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "MAJ Bags shipping policy — delivery times, costs, and returns. Free shipping within Nigeria.",
};

const nigeriaZones = [
  {
    zone: "Lagos (Island & Mainland)",
    time: "Same day – 1 business day",
    cost: "Free",
  },
  { zone: "Lagos (Outskirts)", time: "1–2 business days", cost: "Free" },
  { zone: "Abuja", time: "2–3 business days", cost: "Free" },
  { zone: "Port Harcourt", time: "2–3 business days", cost: "Free" },
  { zone: "Other major cities", time: "2–4 business days", cost: "Free" },
  { zone: "Remote / rural areas", time: "4–7 business days", cost: "Free" },
];

const internationalZones = [
  { zone: "United Kingdom", time: "5–7 business days", cost: "From ₦25,000" },
  {
    zone: "United States & Canada",
    time: "7–10 business days",
    cost: "From ₦30,000",
  },
  { zone: "Rest of Africa", time: "5–10 business days", cost: "From ₦15,000" },
  { zone: "Europe", time: "7–12 business days", cost: "From ₦28,000" },
  {
    zone: "Other regions",
    time: "10–14 business days",
    cost: "Calculated at checkout",
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-cream-100 border-b border-cream-200 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#6B7280] uppercase tracking-[0.3em] mb-4">
            Delivery Information
          </p>
          <h1 className="font-serif text-5xl font-bold text-[#1E1E1E] mb-4">
            Shipping &amp; Returns
          </h1>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            Free shipping on all Nigerian orders. Every bag packed by hand in
            Lagos.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Key highlights */}
        <section className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Truck,
              title: "Free Domestic Shipping",
              desc: "All orders within Nigeria ship free, regardless of order value.",
            },
            {
              icon: Clock,
              title: "Order Cut-Off",
              desc: "Orders placed before 2pm WAT on business days are dispatched same day.",
            },
            {
              icon: RefreshCw,
              title: "30-Day Returns",
              desc: "Not in love? Return unused items within 30 days for a full refund.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-cream-200 rounded-3xl p-7 shadow-soft text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-olive-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-olive-700" />
              </div>
              <h3 className="font-serif font-semibold text-[#1E1E1E] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        {/* Nigeria shipping */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-5 w-5 text-olive-700" />
            <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
              Nigeria Delivery
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
            We partner with GIG Logistics, DHL, and local dispatch for domestic
            deliveries. Business days exclude weekends and Nigerian public
            holidays.
          </p>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-cream-50 border-b border-cream-200">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Destination
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Estimated Time
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {nigeriaZones.map((row) => (
                  <tr key={row.zone}>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">
                      {row.zone}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {row.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-700">
                        {row.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* International shipping */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Globe className="h-5 w-5 text-olive-700" />
            <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
              International Shipping
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
            We ship internationally via DHL Express. Customs duties and import
            taxes, where applicable, are the responsibility of the customer and
            are not included in the shipping cost.
          </p>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-cream-50 border-b border-cream-200">
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Destination
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Estimated Time
                  </th>
                  <th className="text-left text-xs text-[#6B7280] uppercase tracking-wider px-6 py-4">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {internationalZones.map((row) => (
                  <tr key={row.zone}>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">
                      {row.zone}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {row.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              International orders may be subject to customs inspection, which
              can add 2–5 days to delivery. We are not responsible for delays
              caused by customs authorities.
            </p>
          </div>
        </section>

        {/* Returns */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <RefreshCw className="h-5 w-5 text-olive-700" />
            <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
              Returns & Exchanges
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Eligible */}
            <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <h3 className="font-serif font-semibold text-[#1E1E1E]">
                  Eligible for Return
                </h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Unused items in original condition",
                  "All original tags and packaging intact",
                  "Returned within 30 days of delivery",
                  "Full-price items",
                  "Items with manufacturing defects",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#6B7280]"
                  >
                    <span className="text-green-500 font-bold flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not eligible */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-serif font-semibold text-[#1E1E1E]">
                  Not Eligible for Return
                </h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Items showing signs of use or wear",
                  "Custom or personalised items",
                  "Sale or discounted items",
                  "Items returned after 30 days",
                  "Items without original packaging",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#6B7280]"
                  >
                    <span className="text-red-500 font-bold flex-shrink-0">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Return process */}
          <div className="bg-white border border-cream-200 rounded-3xl p-8 shadow-soft">
            <h3 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-6">
              How to Return
            </h3>
            <ol className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Contact Us",
                  desc: "Email hello@majbags.com with your order number and reason for return. Do not send items without authorisation.",
                },
                {
                  step: "02",
                  title: "Receive Instructions",
                  desc: "We'll respond within 24 hours with a return authorisation number and return address.",
                },
                {
                  step: "03",
                  title: "Package & Ship",
                  desc: "Pack the item securely in its original packaging. We recommend using a tracked service — you are responsible for the item until we receive it.",
                },
                {
                  step: "04",
                  title: "Refund Processed",
                  desc: "Once received and inspected (2–3 business days), your refund will be processed within 3–5 business days to your original payment method.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-5">
                  <span className="font-serif text-2xl font-bold text-olive-200 flex-shrink-0 w-8">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-medium text-[#1E1E1E] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tracking */}
        <section className="bg-olive-50 border border-olive-100 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-olive-200 flex items-center justify-center flex-shrink-0">
              <Package className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#1E1E1E] mb-2">
                Tracking Your Order
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                Once your order is dispatched, you&apos;ll receive an email with
                a tracking number and link. You can also track your order from
                your account dashboard under &lsquo;Order History&rsquo;.
              </p>
              <p className="text-sm text-[#6B7280]">
                For any delivery issues, contact us at{" "}
                <a
                  href="mailto:hello@majbags.com"
                  className="text-olive-700 font-medium hover:underline"
                >
                  hello@majbags.com
                </a>{" "}
                with your order number.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#6B7280] text-sm mb-4">
            Still have questions about shipping or returns?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-olive-600 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-olive-700 transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
}
