// app/how-it-works/page.tsx
"use client";
import Link from "next/link";
import "../../../components/Theme/styles/theme.css";

type Step = { title: string; desc: string; n: number };
type Role = { id: string; label: string; kicker: string; steps: Step[] };

const roles: Role[] = [
  {
    id: "universities",
    label: "For Universities",
    kicker: "Institution setup",
    steps: [
      { n: 1, title: "Create university account", desc: "Add departments and set global policies." },
      { n: 2, title: "Onboard admins", desc: "Invite department heads and define permissions." },
      { n: 3, title: "Configure branding", desc: "Logo, colors, and domain options." },
    ],
  },
  {
    id: "teachers",
    label: "For Teachers",
    kicker: "Author & monitor",
    steps: [
      { n: 1, title: "Build your test", desc: "Use MCQ, descriptive, or coding items." },
      { n: 2, title: "Schedule & secure", desc: "Set windows, randomization, and controls." },
      { n: 3, title: "Monitor live", desc: "Track attempts and anomalies in real time." },
    ],
  },
  {
    id: "students",
    label: "For Students",
    kicker: "Attempt & review",
    steps: [
      { n: 1, title: "Join exam", desc: "Launch secure mode and verify identity if required." },
      { n: 2, title: "Answer confidently", desc: "Auto‑save enabled, clear timers and status." },
      { n: 3, title: "View results", desc: "Instant feedback or post‑review release." },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="theme-bg">
      {/* Hero */}
      <section className="border-b border-(--color-border)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-secondary) ring-1 ring-(--color-border) text-sm">
            How It Works
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple flows for every role
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-(--color-text-muted)">
            Universities configure, teachers conduct, and students attempt exams with clear steps and controls. 
          </p>
        </div>
      </section>

      {/* Role tabs */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4" aria-label="Roles">
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <a
              key={r.id}
              href={`#${r.id}`}
              className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm text-(--color-text) hover:bg-(--color-surface)/80 focus-visible:outline-2 focus-visible:outline-(--color-primary)"
            >
              {r.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {roles.map((role) => (
          <div key={role.id} id={role.id} className="scroll-mt-24">
            <header className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold">{role.label}</h2>
              <span className="text-(--color-text-muted)">{role.kicker}</span>
            </header>

            <div className="mt-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-5">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 sm:gap-5">
                {role.steps.map((s) => (
                  <article
                    key={s.n}
                    className="flex items-start gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md outline-none focus-within:outline-2 focus-within:outline-(--color-primary)"
                    tabIndex={0}
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-(--color-primary)/15 text-(--color-primary) font-semibold">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="text-base font-medium">{s.title}</h3>
                      <p className="mt-1 text-(--color-text-muted)">{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* CTA row */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/register/university"
                  className="inline-flex items-center rounded-md bg-(--color-primary) px-4 py-2 text-(--color-primary-contrast) hover:saturate-110 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                >
                  Get Started
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-2 text-(--color-text) hover:bg-(--color-surface)/80 focus-visible:outline-2 focus-visible:outline-(--color-border)"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
