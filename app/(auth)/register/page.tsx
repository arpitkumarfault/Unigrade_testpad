// app/register/page.tsx
"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import "../../../components/Theme/styles/theme.css"

function ThemeToggleFab() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize from html class
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDark(el.classList.contains("dark"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-(--color-surface) text-(--color-text) border border-(--color-border) shadow hover:bg-(--color-surface)/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
      title={isDark ? "Light" : "Dark"}
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
  required,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">{label}{required ? " *" : ""}</label>
      {children}
      {hint && <p id={hintId} className="text-(--color-text-muted) text-xs">{hint}</p>}
      {error && <p id={errId} className="text-(--color-danger) text-xs">{error}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const emailId = useId();
  const nameId = useId();
  const univId = useId();
  const passId = useId();
  const pass2Id = useId();

  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  // Simple client‑side validation example
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const university = String(data.get("university") || "");
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const confirm = String(data.get("confirm") || "");
    const errs: Record<string, string> = {};

    if (!name) errs.name = "Please enter your full name.";
    if (!university) errs.university = "Please enter your university.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Please enter a valid email.";
    if (password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (password !== confirm) errs.confirm = "Passwords do not match.";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // TODO: connect to API
      alert("Registration submitted!");
    }
  };

  return (
    <main className="theme-bg min-h-screen">
      <ThemeToggleFab />

      <section className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left: form */}
        <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="mx-auto w-full max-w-lg">
            <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-primary) ring-1 ring-(--color-border) text-sm">
              Create your account
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Register for TestPad
            </h1>
            <p className="mt-2 text-(--color-text-muted)">
              Start your 30‑day trial and invite your team. No credit card required.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <Field
                id={nameId}
                label="Full name"
                required
                hint="Your legal name for account records."
                error={errors.name}
              >
                <input
                  id={nameId}
                  name="name"
                  autoComplete="name"
                  required
                  className={[
                    "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                    errors.name ? "border-(--color-danger)" : "border-(--color-border)",
                    "text-(--color-text) placeholder:text-(--color-text-muted)",
                    "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                  ].join(" ")}
                  placeholder="Ada Lovelace"
                />
              </Field>

              <Field
                id={univId}
                label="University"
                required
                hint="Official university or organization name."
                error={errors.university}
              >
                <input
                  id={univId}
                  name="university"
                  required
                  className={[
                    "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                    errors.university ? "border-(--color-danger)" : "border-(--color-border)",
                    "text-(--color-text) placeholder:text-(--color-text-muted)",
                    "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                  ].join(" ")}
                  placeholder="Stanford University"
                />
              </Field>

              <Field
                id={emailId}
                label="Work email"
                required
                hint="Use your university email for faster approval."
                error={errors.email}
              >
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={[
                    "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                    errors.email ? "border-(--color-danger)" : "border-(--color-border)",
                    "text-(--color-text) placeholder:text-(--color-text-muted)",
                    "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                  ].join(" ")}
                  placeholder="you@university.edu"
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id={passId}
                  label="Password"
                  required
                  hint="Use 8+ characters with a mix of letters and numbers."
                  error={errors.password}
                >
                  <div className={[
                    "relative rounded-md border bg-(--color-surface)",
                    errors.password ? "border-(--color-danger)" : "border-(--color-border)",
                  ].join(" ")}>
                    <input
                      id={passId}
                      name="password"
                      type={showPwd ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="w-full bg-transparent px-3 py-2 pr-10 text-(--color-text) placeholder:text-(--color-text-muted) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 grid w-10 place-items-center text-(--color-text-muted) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                      tabIndex={0}
                    >
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                </Field>

                <Field
                  id={pass2Id}
                  label="Confirm password"
                  required
                  error={errors.confirm}
                >
                  <div className={[
                    "relative rounded-md border bg-(--color-surface)",
                    errors.confirm ? "border-(--color-danger)" : "border-(--color-border)",
                  ].join(" ")}>
                    <input
                      id={pass2Id}
                      name="confirm"
                      type={showPwd2 ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="w-full bg-transparent px-3 py-2 pr-10 text-(--color-text) placeholder:text-(--color-text-muted) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd2(v => !v)}
                      aria-label={showPwd2 ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 grid w-10 place-items-center text-(--color-text-muted) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                    >
                      {showPwd2 ? "🙈" : "👁️"}
                    </button>
                  </div>
                </Field>
              </div>

              <div className="flex items-start gap-2">
                <input id="terms" name="terms" type="checkbox" required className="mt-1 h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus-visible:outline-2 focus-visible:outline-(--color-primary)" />
                <label htmlFor="terms" className="text-sm text-(--color-text)">
                  I agree to the Terms and Privacy Policy.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-(--color-primary) px-4 py-2.5 text-(--color-primary-contrast) font-medium shadow hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
                >
                  Create account
                </button>
              </div>

              <p className="text-sm text-(--color-text-muted)">
                Already have an account?{" "}
                <Link href="/login" className="text-(--color-primary) underline underline-offset-4 hover:opacity-90">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right: trust & benefits panel */}
        <aside className="hidden lg:block border-l border-(--color-border)">
          <div className="h-full p-10 bg-(--color-surface)">
            <div className="mx-auto max-w-md space-y-6">
              <div>
                <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-secondary) ring-1 ring-(--color-border) text-sm">
                  Why TestPad
                </p>
                <h2 className="mt-3 text-2xl font-semibold">Built for universities</h2>
                <p className="mt-2 text-(--color-text-muted)">
                  Secure exams, real‑time analytics, and flexible workflows in a theme that adapts to light and dark instantly.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-5 w-5 grid place-items-center rounded bg-(--color-success)/20 text-(--color-success)">✓</span>
                  <div>
                    <p className="font-medium">Secure by design</p>
                    <p className="text-sm text-(--color-text-muted)">Anti‑cheating, proctoring, and audit trails baked in.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-5 w-5 grid place-items-center rounded bg-(--color-secondary)/20 text-(--color-secondary)">✓</span>
                  <div>
                    <p className="font-medium">Insights that matter</p>
                    <p className="text-sm text-(--color-text-muted)">Class comparisons, difficulty analysis, and exports.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-5 w-5 grid place-items-center rounded bg-(--color-tertiary)/20 text-(--color-tertiary)">✓</span>
                  <div>
                    <p className="font-medium">Built to scale</p>
                    <p className="text-sm text-(--color-text-muted)">From pilots to enterprise‑grade deployments worldwide.</p>
                  </div>
                </li>
              </ul>

              <div className="rounded-lg border border-(--color-border) p-4">
                <p className="text-sm text-(--color-text-muted)">Need help?</p>
                <p className="mt-1">Book a demo with the onboarding team.</p>
                <Link
                  href="/book-demo"
                  className="mt-3 inline-flex items-center rounded-md bg-(--color-secondary) px-3 py-2 text-(--color-secondary-contrast) hover:brightness-95 focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
