// app/pricing/page.tsx
"use client";
import Link from "next/link";
import "../../../components/Theme/styles/theme.css";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  yearly?: string;
  cta: { label: string; href: string };
  popular?: boolean;
  features: { label: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    name: "FREE PLAN (Trial)",
    tagline: "Perfect for: Small Schools/Pilot Testing",
    price: "FREE · 30 days",
    cta: { label: "Start Free Trial", href: "/signup?trial=1" },
    features: [
      { label: "100 Students", included: true },
      { label: "2 Admin Users", included: true },
      { label: "50 Tests per month", included: true },
      { label: "Basic Analytics", included: true },
      { label: "Email Support", included: true },
      { label: "AI Proctoring", included: false },
      { label: "Custom Branding", included: false },
    ],
  },
  {
    name: "STARTER PLAN",
    tagline: "Perfect for: Small Colleges",
    price: "$99 / month",
    yearly: "$990 / year · Save 17%",
    cta: { label: "Buy Now", href: "/checkout?plan=starter" },
    features: [
      { label: "500 Students", included: true },
      { label: "10 Admin Users", included: true },
      { label: "Unlimited Tests", included: true },
      { label: "Advanced Analytics", included: true },
      { label: "Priority Email Support", included: true },
      { label: "Basic Anti‑Cheating", included: true },
      { label: "AI Proctoring", included: false },
    ],
  },
  {
    name: "GROWTH PLAN",
    tagline: "Perfect for: Medium Universities",
    price: "$299 / month",
    yearly: "$2990 / year · Save 17%",
    cta: { label: "Buy Now", href: "/checkout?plan=growth" },
    popular: true,
    features: [
      { label: "2000 Students", included: true },
      { label: "50 Admin Users", included: true },
      { label: "Unlimited Tests", included: true },
      { label: "Advanced Analytics + AI Insights", included: true },
      { label: "Phone + Chat Support", included: true },
      { label: "AI Proctoring (Beta)", included: true },
      { label: "Custom Branding", included: true },
      { label: "API Access", included: true },
    ],
  },
  {
    name: "ENTERPRISE PLAN",
    tagline: "Perfect for: Large Universities",
    price: "Custom Pricing",
    cta: { label: "Contact Sales", href: "/contact/sales" },
    features: [
      { label: "Unlimited Students", included: true },
      { label: "Unlimited Admin Users", included: true },
      { label: "Unlimited Tests", included: true },
      { label: "Full AI Proctoring", included: true },
      { label: "Dedicated Account Manager", included: true },
      { label: "24/7 Phone Support", included: true },
      { label: "Custom Integrations", included: true },
      { label: "White Label Solution", included: true },
      { label: "On‑Premise Deployment (Optional)", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="theme-bg">
      {/* Hero */}
      <section className="border-b border-(--color-border)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-tertiary) ring-1 ring-(--color-border) text-sm">
            Pricing
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple plans for every stage
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-(--color-text-muted)">
            Start free, scale with confidence. Switch between monthly and yearly anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5 lg:gap-6">
          {plans.map((p) => (
            <article
              key={p.name}
              className={[
                "relative rounded-xl border p-5 sm:p-6 transition",
                "border-(--color-border) bg-(--color-surface) shadow-sm hover:-translate-y-0.5 hover:shadow-md",
                p.popular ? "ring-2 ring-(--color-secondary)" : "",
              ].join(" ")}
            >
              {p.popular && (
                <span className="absolute -top-3 right-4 rounded-full bg-(--color-secondary) px-2.5 py-1 text-xs font-semibold text-(--color-secondary-contrast) shadow">
                  Popular
                </span>
              )}

              <header className="space-y-1">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-(--color-text-muted)">{p.tagline}</p>
              </header>

              <div className="mt-4">
                <p className="text-2xl font-semibold">{p.price}</p>
                {p.yearly && <p className="text-sm text-(--color-text-muted)">{p.yearly}</p>}
              </div>

              <ul className="mt-4 space-y-2">
                {p.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2">
                    <span
                      className={[
                        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded",
                        f.included ? "bg-(--color-success)/20 text-(--color-success)" : "bg-(--color-danger)/15 text-(--color-danger)",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {f.included ? "✓" : "✕"}
                    </span>
                    <span className={f.included ? "" : "text-(--color-text-muted)"}>{f.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href={p.cta.href}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-md px-4 py-2 font-medium",
                    p.popular
                      ? "bg-(--color-secondary) text-(--color-secondary-contrast) hover:brightness-95"
                      : "bg-(--color-primary) text-(--color-primary-contrast) hover:brightness-95",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)",
                  ].join(" ")}
                >
                  {p.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
