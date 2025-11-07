"use client";
import Link from "next/link";
import '../Theme/styles/theme.css'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-primary) ring-1 ring-(--color-border) text-sm">
          Smart Online Examination Platform
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Conduct Secure Online Exams with Real‑Time Analytics
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-(--color-text-muted)">
          Create tests, monitor students, and analyze performance — all in one platform.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 bg-(--color-primary)/10 blur-2xl"
      />
    </section>
  );
}
