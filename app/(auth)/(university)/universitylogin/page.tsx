"use client";

import { useEffect, useId, useState } from "react";
import  { AxiosError, isAxiosError } from "axios";
import Link from "next/link";
import "@/components/Theme/styles/theme.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function ThemeToggleFab() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => setIsDark(document.documentElement.classList.contains("dark")), []);
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
}: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    children: React.ReactNode;
}) {
    const hintId = hint ? `${id}-hint` : undefined;
    const errId = error ? `${id}-error` : undefined;
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            {children}
            {hint && <p id={hintId} className="text-(--color-text-muted) text-xs">{hint}</p>}
            {error && <p id={errId} className="text-(--color-danger) text-xs">{error}</p>}
        </div>
    );
}

export default function UniversityLoginPage() {
    const uniId = useId();
    const pwdId = useId();
    const router = useRouter()
    const [universityCode, setUniversityCode] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPwd, setShowPwd] = useState(false);
    const [autoHide, setAutoHide] = useState<NodeJS.Timeout | null>(null);



type ApiError = {
  message?: string;
  error?: string;
  errors?: string[]; 
};

const handleLoginSubmission = async (e:any) => {
    e.preventDefault();

    
    try {
        const response = await axios.post(
            "/api/university/login",
            { universityCode, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status < 300,
            }
        )
        
    const successMsg = response.data?.message || "Login successfully";
    toast.success(successMsg);
    setTimeout(() => {
      router.push("/university/dashboard");
    }, 800);
  } catch (e) {
    if (isAxiosError(e)) {
      const err = e as AxiosError<ApiError>;
      const apiMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors) &&
          err.response?.data?.errors[0]) ||
        undefined;

      if (err.response) {
        const fallback =
          err.response.status === 401
            ? "Invalid credentials"
            : err.response.status === 403
            ? "Access denied"
            : "Something went wrong";
        toast.error(apiMsg || fallback);
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(err.message || "Unexpected error occurred.");
      }
    } else {
      const unknownMsg =
        (e as Error)?.message || "Unexpected error occurred.";
      toast.error(unknownMsg);
    }
  }
};

    const togglePassword = () => {
        setShowPwd((prev) => {
            const next = !prev;
            if (next) {
                if (autoHide) clearTimeout(autoHide);
                const t = setTimeout(() => setShowPwd(false), 5000);
                setAutoHide(t);
            } else if (autoHide) {
                clearTimeout(autoHide);
                setAutoHide(null);
            }
            return next;
        });
    };

    return (
        <main className="theme-bg min-h-screen">
            <ThemeToggleFab />

            <section className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
                    <div className="mx-auto w-full max-w-md">
                        <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-primary) ring-1 ring-(--color-border) text-sm">
                            University Login
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Sign in to TestPad
                        </h1>
                        <p className="mt-2 text-(--color-text-muted)">
                            Enter your University ID and password to continue.
                        </p>

                        <form onSubmit={handleLoginSubmission} noValidate className="mt-8 space-y-5">
                            <Field
                                id={uniId}
                                label="University ID"
                                hint="Example: STA1234"
                                error={errors.universityId}

                            >
                                <input
                                    id={uniId}
                                    name="universityId"
                                    inputMode="text"
                                    value={universityCode}
                                    onChange={(e) => { setUniversityCode(e.target.value) }}
                                    autoComplete="username"
                                    className={[
                                        "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                                        errors.universityId ? "border-(--color-danger)" : "border-(--color-border)",
                                        "text-(--color-text) placeholder:text-(--color-text-muted)",
                                        "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                                    ].join(" ")}
                                    placeholder="STA1234"
                                />
                            </Field>

                            <Field id={pwdId} label="Password" error={errors.password}>
                                <div className={[
                                    "relative rounded-md border bg-(--color-surface)",
                                    errors.password ? "border-(--color-danger)" : "border-(--color-border)",
                                ].join(" ")}>
                                    <input
                                        id={pwdId}
                                        name="password"
                                        type={showPwd ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        autoComplete="current-password"
                                        className="w-full bg-transparent px-3 py-2 pr-10 text-(--color-text) placeholder:text-(--color-text-muted) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        aria-label={showPwd ? "Hide password" : "Show password"}
                                        aria-pressed={showPwd}
                                        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-(--color-text-muted) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                    >
                                        {showPwd ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </Field>

                            <div className="flex items-center justify-between">
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="remember" className="h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus-visible:outline-2 focus-visible:outline-(--color-primary)" />
                                    Remember me
                                </label>
                                <Link href="/forgot-password" className="text-sm text-(--color-primary) underline underline-offset-4 hover:opacity-90">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-(--color-primary) px-4 py-2.5 text-(--color-primary-contrast) font-medium shadow hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
                            >
                                Sign in
                            </button>

                            <p className="text-sm text-(--color-text-muted)">
                                New to TestPad?{" "}
                                <Link href="/universityregister" className="text-(--color-primary) underline underline-offset-4 hover:opacity-90">
                                    Create an account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <aside className="hidden lg:block border-l border-(--color-border)">
                    <div className="h-full p-10 bg-(--color-surface)">
                        <div className="mx-auto max-w-md space-y-6">
                            <div>
                                <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-secondary) ring-1 ring-(--color-border) text-sm">
                                    Secure Access
                                </p>
                                <h2 className="mt-3 text-2xl font-semibold">Trusted university login</h2>
                                <p className="mt-2 text-(--color-text-muted)">
                                    Strong theme contrast, keyboard-first navigation, and clear errors help your team sign in quickly.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-5 w-5 grid place-items-center rounded bg-(--color-success)/20 text-(--color-success)">✓</span>
                                    <div>
                                        <p className="font-medium">Secure sessions</p>
                                        <p className="text-sm text-(--color-text-muted)">Best practices for form inputs and focus states.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 h-5 w-5 grid place-items-center rounded bg-(--color-secondary)/20 text-(--color-secondary)">✓</span>
                                    <div>
                                        <p className="font-medium">Fast recovery</p>
                                        <p className="text-sm text-(--color-text-muted)">Reset links and help are easy to find.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}
