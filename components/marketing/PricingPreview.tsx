import Link from "next/link";
import '../Theme/styles/theme.css'

const tiers = [
  { name: "Free", price: "$0/month", meta1: "100 Students", meta2: "2 Admins", cta: "Try Free", href: "/pricing" },
  { name: "Starter", price: "$99/month", meta1: "500 Students", meta2: "10 Admins", cta: "Buy Now", href: "/pricing" },
  { name: "Growth", price: "$299/month", meta1: "2000 Students", meta2: "50 Admins", cta: "Buy Now", href: "/pricing" },
  { name: "Enterprise", price: "Custom", meta1: "Unlimited Students", meta2: "Unlimited Admins", cta: "Contact", href: "/pricing#enterprise" },
];

export default function PricingPreview() {
  return (
    <section className="py-14 sm:py-20 bg-[var(--color-surface)]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Pricing Preview</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="text-lg font-semibold">{t.name}</div>
              <div className="mt-2 text-2xl font-semibold">{t.price}</div>
              <ul className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
                <li>{t.meta1}</li>
                <li>{t.meta2}</li>
              </ul>
              <Link
                href={t.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-[var(--color-primary-contrast)] hover:saturate-110 hover:brightness-95"
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
