"use client";

import Link from "next/link";
import "../../../components/Theme/styles/theme.css";

type Item = { title: string; desc: string; tone?: "primary" | "secondary" | "tertiary" };
type Section = { id: string; title: string; hint: string; tone: Item["tone"]; items: Item[] };

const sections: Section[] = [
  {
    id: "exam",
    title: "Examination Management",
    hint: "Create, schedule, randomize",
    tone: "primary",
    items: [
      { title: "Create unlimited tests", desc: "MCQ, descriptive, and coding types supported.", tone: "primary" },
      { title: "Question bank 10,000+", desc: "Start fast with preloaded, curated items.", tone: "secondary" },
      { title: "Excel/CSV import", desc: "Bulk add with smart mapping and validation.", tone: "tertiary" },
      { title: "Randomize questions", desc: "Unique order per student to reduce bias.", tone: "primary" },
      { title: "Flexible time limits", desc: "Per-question or test-wide timers.", tone: "secondary" },
      { title: "Scheduling", desc: "Start/end windows with timezone support.", tone: "tertiary" },
    ],
  },
  {
    id: "security",
    title: "Security & Anti‑Cheating",
    hint: "Proctoring & controls",
    tone: "secondary",
    items: [
      { title: "Secure browser mode", desc: "Disable copy, paste, and right‑click.", tone: "secondary" },
      { title: "Tab switching detection", desc: "Auto warnings and attempt flags.", tone: "tertiary" },
      { title: "AI face detection", desc: "Optional identity checks and alerts.", tone: "primary" },
      { title: "Randomized sets", desc: "Variant pools per cohort.", tone: "secondary" },
      { title: "IP logging", desc: "Network fingerprinting for audits.", tone: "tertiary" },
      { title: "Screenshot prevention", desc: "Screen capture signals and blocks.", tone: "primary" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    hint: "Real‑time & exports",
    tone: "tertiary",
    items: [
      { title: "Live monitoring", desc: "See attempts, status, and anomalies.", tone: "tertiary" },
      { title: "Student analysis", desc: "Strengths, weaknesses, improvement paths.", tone: "primary" },
      { title: "Class comparisons", desc: "Cohort and department overviews.", tone: "secondary" },
      { title: "Question difficulty", desc: "Item‑level metrics and discrimination.", tone: "tertiary" },
      { title: "PDF/Excel export", desc: "Share reports with one click.", tone: "primary" },
      { title: "Auto results", desc: "Instant grading and publishing.", tone: "secondary" },
    ],
  },
  {
    id: "access",
    title: "Multi‑Level Access Control",
    hint: "Scoped roles",
    tone: "primary",
    items: [
      { title: "University admin", desc: "Global policies and oversight.", tone: "primary" },
      { title: "Department managers", desc: "Scoped control by department.", tone: "secondary" },
      { title: "Teacher access", desc: "Courses they own, nothing more.", tone: "tertiary" },
      { title: "Student access", desc: "Only enrolled course materials.", tone: "primary" },
      { title: "Role permissions", desc: "Granular, auditable capabilities.", tone: "secondary" },
    ],
  },
  {
    id: "realtime",
    title: "⚡ Real‑Time Features",
    hint: "Low latency",
    tone: "secondary",
    items: [
      { title: "Live student count", desc: "See active participants instantly.", tone: "secondary" },
      { title: "Instant notifications", desc: "Test start/end alerts in‑app.", tone: "tertiary" },
      { title: "Real‑time auto‑save", desc: "Every answer is preserved.", tone: "primary" },
      { title: "Live proctoring", desc: "Optional streaming supervision.", tone: "secondary" },
      { title: "Instant messaging", desc: "Resolve doubts without leaving.", tone: "tertiary" },
    ],
  },
  {
    id: "responsive",
    title: "Responsive Design",
    hint: "Mobile‑first",
    tone: "tertiary",
    items: [
      { title: "All devices", desc: "Desktop, tablet, and mobile ready.", tone: "tertiary" },
      { title: "Native feel", desc: "Touch targets and gestures tuned.", tone: "primary" },
      { title: "Low bandwidth", desc: "Optimized requests and payloads.", tone: "secondary" },
      { title: "Offline viewing", desc: "Questions cached for resilience.", tone: "tertiary" },
    ],
  },
];

function toneChip(tone?: "primary" | "secondary" | "tertiary") {
  if (tone === "secondary") return "bg-(--color-secondary)/15 text-(--color-secondary)";
  if (tone === "tertiary") return "bg-(--color-tertiary)/15 text-(--color-tertiary)";
  return "bg-(--color-primary)/15 text-(--color-primary)";
}

export default function FeaturesPage() {
  return (
    <main className="theme-bg" role="main">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-(--color-border)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-secondary) ring-1 ring-(--color-border) text-sm">
              TestPad Features
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need for secure, scalable university exams
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-(--color-text-muted)">
              Proctoring, flexible test creation, and real‑time analytics, all powered by a token‑driven theme with instant light/dark. 
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register/university"
                className="inline-flex items-center rounded-md bg-(--color-primary) px-5 py-3 text-(--color-primary-contrast) shadow hover:saturate-110 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
              >
                Register Your University
              </Link>
              <Link
                href="/book-demo"
                className="inline-flex items-center rounded-md border border-(--color-border) bg-(--color-surface) px-5 py-3 text-(--color-text) hover:bg-(--color-surface)/80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--color-border)"
              >
                Book a Demo
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center text-(--color-primary) underline underline-offset-4 hover:opacity-90"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 bg-(--color-primary)/10 blur-2xl"
        />
      </section>

      {/* Tabs anchor links */}
      <nav aria-label="Feature categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm text-(--color-text) hover:bg-(--color-surface)/80 focus-visible:outline-2 focus-visible:outline-(--color-primary)"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {sections.map((section) => (
          <div id={section.id} key={section.id} className="scroll-mt-24">
            <header className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold">{section.title}</h2>
              <span className="text-(--color-text-muted)">{section.hint}</span>
            </header>

            <div className="mt-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-5">
              {/* Responsive auto-fit/minmax grid */}
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(100%,_280px),_1fr))] gap-4 sm:gap-5 lg:gap-6">
                {section.items.map((it) => (
                  <article
                    key={it.title}
                    className="group flex items-start gap-3 rounded-lg border border-(--color-border) bg-(--color-surface) p-4 shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md focus-within:-translate-y-0.5 outline-none focus-within:outline-2 focus-within:outline-(--color-primary)"
                    tabIndex={0}
                    aria-label={it.title}
                  >
                    <div
                      className={[
                        "grid h-9 w-9 place-items-center rounded-md text-sm font-semibold",
                        toneChip(it.tone),
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ★
                    </div>
                    <div>
                      <h3 className="text-base font-medium">{it.title}</h3>
                      <p className="mt-1 text-(--color-text-muted)">{it.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
