// app/register/page.tsx
"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import "@/components/Theme/styles/theme.css";
import { useRouter } from "next/navigation";
function ThemeToggleFab() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
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
    error,
    children,
    required,
    hint,
}: {
    id: string;
    label: string;
    error?: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
                {required ? " *" : ""}
            </label>
            {children}
            {hint && <p className="text-(--color-text-muted) text-xs">{hint}</p>}
            {error && <p className="text-(--color-danger) text-xs">{error}</p>}
        </div>
    );
}

export default function RegisterPage() {
    const nameId = useId();
    const emailId = useId();
    const phoneId = useId();
    const addrId = useId();
    const passId = useId();
    const pass2Id = useId();
  const router = useRouter();
    const [universityName, setUniversityName] = useState("");
    const [universityEmail, setUniversityEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!universityName.trim()) errs.universityName = "Please enter university name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(universityEmail))
            errs.universityEmail = "Please enter a valid email.";
        if (!/^\+?\d{7,15}$/.test(contactNumber))
            errs.contactNumber = "Please enter a valid phone (7-15 digits, optional +).";
        if (!address.trim()) errs.address = "Please enter address.";
        if (password.length < 8) errs.password = "Password must be at least 8 characters.";
        if (password !== confirm) errs.confirm = "Passwords do not match.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) {
            toast.error("Please fix the highlighted fields.");
            return;
        }
        
        let tId: string | undefined;
        try {
            setSubmitting(true);
            tId = toast.loading("Creating university...");
            
            const res = await axios.post(
                "/api/university/register",
                { universityName, universityEmail, contactNumber, address, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            
            const code = res?.data?.data?.universityCode;
            const msg = code ? `Registered successfully. Code: ${code}` : "Registered successfully.";
            toast.success(msg, { id: tId });
            
            // Optional reset
            setUniversityName(""); setUniversityEmail(""); setContactNumber("");
            setAddress(""); setPassword(""); setConfirm("");
            
            setTimeout(() => {
                
                router.push("/universitylogin");
            }, 2000)
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed. Please try again.";
            toast.error(msg, { id: tId });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="theme-bg min-h-screen">
            <ThemeToggleFab />
            <section className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
                    <div className="mx-auto w-full max-w-lg">
                        <p className="inline-flex items-center rounded-full bg-(--color-surface) px-3 py-1 text-(--color-primary) ring-1 ring-(--color-border) text-sm">
                            Create your university account
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Register for TestPad
                        </h1>
                        <p className="mt-2 text-(--color-text-muted)">
                            You will receive a unique university code to share with staff/students.
                        </p>

                        <form onSubmit={handleRegister} noValidate className="mt-8 space-y-5">
                            <Field id={nameId} label="University name" required error={errors.universityName}>
                                <input
                                    id={nameId}
                                    name="universityName"
                                    value={universityName}
                                    onChange={(e) => setUniversityName(e.target.value)}
                                    required
                                    className={[
                                        "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                                        errors.universityName ? "border-(--color-danger)" : "border-(--color-border)",
                                        "text-(--color-text) placeholder:text-(--color-text-muted)",
                                        "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                                    ].join(" ")}
                                    placeholder="Stanford University"
                                />
                            </Field>

                            <Field id={emailId} label="University email" required error={errors.universityEmail}>
                                <input
                                    id={emailId}
                                    name="universityEmail"
                                    type="email"
                                    value={universityEmail}
                                    onChange={(e) => setUniversityEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className={[
                                        "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                                        errors.universityEmail ? "border-(--color-danger)" : "border-(--color-border)",
                                        "text-(--color-text) placeholder:text-(--color-text-muted)",
                                        "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                                    ].join(" ")}
                                    placeholder="admin@university.edu"
                                />
                            </Field>

                            <Field id={phoneId} label="Contact number" required error={errors.contactNumber}>
                                <input
                                    id={phoneId}
                                    name="contactNumber"
                                    inputMode="tel"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    required
                                    className={[
                                        "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                                        errors.contactNumber ? "border-(--color-danger)" : "border-(--color-border)",
                                        "text-(--color-text) placeholder:text-(--color-text-muted)",
                                        "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                                    ].join(" ")}
                                    placeholder="+1 650 723 2300"
                                />
                            </Field>

                            <Field id={addrId} label="Address" required error={errors.address}>
                                <textarea
                                    id={addrId}
                                    name="address"
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className={[
                                        "w-full rounded-md border bg-(--color-surface) px-3 py-2",
                                        errors.address ? "border-(--color-danger)" : "border-(--color-border)",
                                        "text-(--color-text) placeholder:text-(--color-text-muted)",
                                        "focus-visible:outline-2 focus-visible:outline-(--color-primary)",
                                    ].join(" ")}
                                    placeholder="450 Serra Mall, Stanford, CA 94305"
                                />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field id={passId} label="Password" required error={errors.password}>
                                    <div
                                        className={[
                                            "relative rounded-md border bg-(--color-surface)",
                                            errors.password ? "border-(--color-danger)" : "border-(--color-border)",
                                        ].join(" ")}
                                    >
                                        <input
                                            id={passId}
                                            name="password"
                                            type={showPwd ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                            className="w-full bg-transparent px-3 py-2 pr-10 text-(--color-text) placeholder:text-(--color-text-muted) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPwd((v) => !v)}
                                            aria-label={showPwd ? "Hide password" : "Show password"}
                                            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-(--color-text-muted) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                        >
                                            {showPwd ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </Field>

                                <Field id={pass2Id} label="Confirm password" required error={errors.confirm}>
                                    <div
                                        className={[
                                            "relative rounded-md border bg-(--color-surface)",
                                            errors.confirm ? "border-(--color-danger)" : "border-(--color-border)",
                                        ].join(" ")}
                                    >
                                        <input
                                            id={pass2Id}
                                            name="confirm"
                                            type={showPwd2 ? "text" : "password"}
                                            value={confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                            className="w-full bg-transparent px-3 py-2 pr-10 text-(--color-text) placeholder:text-(--color-text-muted) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPwd2((v) => !v)}
                                            aria-label={showPwd2 ? "Hide password" : "Show password"}
                                            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-(--color-text-muted) hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                                        >
                                            {showPwd2 ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </Field>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-(--color-primary) px-4 py-2.5 text-(--color-primary-contrast) font-medium shadow hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) disabled:opacity-70"
                                >
                                    {submitting ? "Creating..." : "Create account"}
                                </button>
                            </div>

                            <p className="text-sm text-(--color-text-muted)">
                                Already have an account?{" "}
                                <Link
                                    href="/universitylogin"
                                    className="text-(--color-primary) underline underline-offset-4 hover:opacity-90"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <aside className="hidden lg:block border-l border-(--color-border)">
                    <div className="h-full p-10 bg-(--color-surface)">
                        <div className="mx-auto max-w-md space-y-6">
                            <h2 className="mt-3 text-2xl font-semibold">Built for universities</h2>
                            <ul className="space-y-3 text-(--color-text-muted)">
                                <li>• Secure by design</li>
                                <li>• Insights that matter</li>
                                <li>• Built to scale</li>
                            </ul>
                            <Link
                                href="/book-demo"
                                className="inline-flex items-center rounded-md bg-(--color-secondary) px-3 py-2 text-(--color-secondary-contrast) hover:brightness-95 focus-visible:outline-2 focus-visible:outline-(--color-primary)"
                            >
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}
