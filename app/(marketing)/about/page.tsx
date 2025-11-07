// app/about/page.tsx
"use client";
import "../../../components/Theme/styles/theme.css";

export default function AboutPage() {
  return (
    <main className="theme-bg">
      {/* Hero */}
      <section className="border-b border-(--color-border)">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-primary) ring-1 ring-(--color-border) text-sm">
            About TestPad
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Secure. Scalable. Student‑first.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-(--color-text-muted)">
            TestPad helps universities run reliable assessments with strong integrity and insightful analytics.
          </p>
        </div>
      </section>

      {/* Mission + Stats */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-(--color-border) bg-(--color-surface) p-6">
            <h2 className="text-xl font-semibold">Mission</h2>
            <p className="mt-2 text-(--color-text-muted)">
              Empower educators with tools that make exams fair, accessible, and data‑driven.
            </p>
            <h3 className="mt-6 text-lg font-semibold">What we value</h3>
            <ul className="mt-2 space-y-2">
              <li>Integrity by design: secure proctoring and robust controls.</li>
              <li>Accessibility: keyboard‑friendly, color‑contrast aware UI.</li>
              <li>Performance: low‑latency, reliable experience worldwide.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6">
            <h3 className="text-lg font-semibold">At a glance</h3>
            <dl className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-(--color-text-muted) text-sm">Tests delivered</dt>
                <dd className="text-2xl font-semibold">1M+</dd>
              </div>
              <div>
                <dt className="text-(--color-text-muted) text-sm">Uptime</dt>
                <dd className="text-2xl font-semibold">99.9%</dd>
              </div>
              <div>
                <dt className="text-(--color-text-muted) text-sm">Avg. latency</dt>
                <dd className="text-2xl font-semibold">120ms</dd>
              </div>
              <div>
                <dt className="text-(--color-text-muted) text-sm">Regions</dt>
                <dd className="text-2xl font-semibold">12</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
