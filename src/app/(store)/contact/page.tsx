import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/src/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MJA Bags team. We're here to help with orders, custom requests, wholesale enquiries, and anything else on your mind.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@mjabags.com",
    href: "mailto:ibnballo@gmail.com",
    description: "We respond within 24 hours on business days.",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+234 803 566 0208",
    href: "https://wa.me/2348035660208",
    description: "Available Monday – Friday, 9am – 6pm WAT.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Victoria Island, Lagos",
    href: "https://maps.google.com",
    description: "Visits by appointment only. DM us to book.",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 9am – 6pm WAT",
    href: null,
    description: "Closed on Nigerian public holidays.",
  },
];

export default function ContactPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello MAJ Bags, I am reaching out from your website. I am interested in your premium collection and would like to inquire about your latest designs and availability. Looking forward to hearing from you!",
  );
  const whatsappUrl = `https://wa.me/2348035660208?text=${whatsappMessage}`;
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-olive-950 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-noise" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs text-gold-300 uppercase tracking-[0.3em] mb-5">
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight mb-6">
            We&apos;d Love to
            <br />
            <span className="text-gold-400">Hear From You</span>
          </h1>
          <p className="text-olive-200 text-lg leading-relaxed max-w-xl mx-auto">
            Whether it&apos;s a question about your order, a custom request, or
            just a compliment — our team is always happy to talk.
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
                Contact Details
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Reach out through whichever channel suits you best. We aim to
                respond to every message personally.
              </p>
            </div>

            <ul className="space-y-6">
              {contactDetails.map(
                ({ icon: Icon, label, value, href, description }) => (
                  <li key={label} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-olive-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-5 w-5 text-olive-700" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-medium text-[#1E1E1E] hover:text-olive-700 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium text-[#1E1E1E]">{value}</p>
                      )}
                      <p className="text-xs text-[#6B7280] mt-1">
                        {description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>

            {/* Social */}
            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/mjabags"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#1E1E1E] hover:border-olive-400 hover:text-olive-700 transition-all shadow-soft"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                {/* WhatsApp Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#1E1E1E] hover:border-olive-400 hover:text-olive-700 transition-all shadow-soft"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Response time callout */}
            <div className="bg-olive-50 border border-olive-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-olive-800 mb-1">
                Average response time
              </p>
              <p className="font-serif text-3xl font-bold text-olive-700">
                &lt; 4 hours
              </p>
              <p className="text-xs text-olive-600 mt-1">
                During business hours, Monday to Friday
              </p>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-cream-200">
              <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[#6B7280] text-sm mb-8">
                Fill in the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
