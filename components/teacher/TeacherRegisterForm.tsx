"use client";
import React, { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

type Form = {
  fullName: string;
  email: string;
  universityCode: string;
  department: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

const emailInstitutional = (email: string) => {
  const pattern = /^[^\s@]+@([a-zA-Z0-9-]+\.)?(edu|ac|uni)\.[a-z.]+$/i;
  return pattern.test(email);
};

const passwordScore = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score += 20;
  if (/[A-Z]/.test(pwd)) score += 20;
  if (/[a-z]/.test(pwd)) score += 20;
  if (/[0-9]/.test(pwd)) score += 20;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 20;
  return score;
};

export function TeacherRegisterForm() {
  const [form, setForm] = useState<Form>({
    fullName: "",
    email: "",
    universityCode: "",
    department: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const pwdStrength = useMemo(() => passwordScore(form.password), [form.password]);
  const pwdTone = pwdStrength < 40 ? "danger" : pwdStrength < 80 ? "warning" : "success";

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    else if (!emailInstitutional(form.email)) e.email = "Use your institutional email (e.g., .edu/.ac/.uni)";
    if (!form.universityCode.trim()) e.universityCode = "University ID is required";
    if (!form.department.trim()) e.department = "Department is required";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "You must accept the terms";
    return e;
  }, [form]);

  const onChange =
    (k: keyof Form) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = ev.currentTarget.type === "checkbox"
        ? (ev.currentTarget as HTMLInputElement).checked
        : ev.currentTarget.value;
      setForm((f) => ({ ...f, [k]: val }));
    };

  const onBlur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      universityCode: true,
      department: true,
      password: true,
      confirmPassword: true,
      agree: true,
    });
    if (Object.keys(errors).length) return;
    setLoading(true);
    try {
      // await fetch("/api/auth/teacher/register", { method: "POST", body: JSON.stringify(form) })
      alert("Registration successful! Please verify your email.");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="theme-surface"
      style={{
        width: "100%",
        maxWidth: 560,
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        boxShadow: "0 10px 30px color-mix(in oklch, var(--color-text), transparent 90%)",
      }}
      aria-labelledby="teacher-register-title"
    >
      <header style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
        <Badge tone="secondary">Teacher</Badge>
        <Badge tone="primary">UniGrade TestPad</Badge>
      </header>

      <div style={{ marginBottom: 16 }}>
        <h1 id="teacher-register-title" style={{ margin: 0, fontSize: 24, lineHeight: 1.3 }}>
          Welcome, Educator — create your UniGrade TestPad account
        </h1>
        <p style={{ margin: "6px 0 0", color: "var(--color-text-muted)" }}>
          Securely manage exams, question banks, and grading workflows in minutes.
        </p>
      </div>

      <form onSubmit={submit} noValidate aria-describedby="form-help">
        <div style={{ display: "grid", gap: 12 }}>
          <Field
            label="Full name"
            name="fullName"
            value={form.fullName}
            onChange={onChange("fullName")}
            onBlur={onBlur("fullName")}
            error={touched.fullName && errors.fullName}
            autoFocus
            autoComplete="name"
            placeholder="Dr. Jane D. Doe"
          />
          <Field
            label="Institutional email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            onBlur={onBlur("email")}
            error={touched.email && errors.email}
            autoComplete="email"
            placeholder="jane.doe@cs.uni.edu"
            help="Use your university-issued email to unlock teacher features."
          />
          <Field
            label="University ID"
            name="universityCode"
            value={form.universityCode}
            onChange={onChange("universityCode")}
            onBlur={onBlur("universityCode")}
            error={touched.universityCode && errors.universityCode}
            autoComplete="username"
            placeholder="TCH-2025-12345"
          />
          <Field
            label="Department"
            name="department"
            value={form.department}
            onChange={onChange("department")}
            onBlur={onBlur("department")}
            error={touched.department && errors.department}
            placeholder="Computer Science"
          />

          <div className="theme-surface" style={{ display: "grid", gap: 6 }}>
            <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: "0.5rem 0.75rem",
              }}
            >
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={onChange("password")}
                onBlur={onBlur("password")}
                aria-invalid={!!(touched.password && errors.password)}
                aria-describedby="password-help"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--color-text)" }}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                style={{ padding: "0.375rem 0.5rem" }}
              >
                {showPwd ? "Hide" : "Show"}
              </Button>
            </div>

            <div aria-live="polite" id="password-help" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Progress value={pwdStrength} />
              <Badge tone={pwdTone as any}>
                {pwdStrength < 40 ? "Weak" : pwdStrength < 80 ? "Medium" : "Strong"}
              </Badge>
            </div>

            {touched.password && errors.password && (
              <small style={{ color: "var(--color-danger)" }}>{errors.password}</small>
            )}
          </div>

          <Field
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={onChange("confirmPassword")}
            onBlur={onBlur("confirmPassword")}
            error={touched.confirmPassword && errors.confirmPassword}
            autoComplete="new-password"
            placeholder="Re-enter your password"
          />

          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={onChange("agree")}
              onBlur={onBlur("agree")}
              aria-invalid={!!(touched.agree && errors.agree)}
              style={{ marginTop: 4 }}
            />
            <label htmlFor="agree" style={{ color: "var(--color-text-muted)" }}>
              I agree to the Terms and Privacy Policy
            </label>
          </div>
          {touched.agree && errors.agree && (
            <small style={{ color: "var(--color-danger)" }}>{errors.agree}</small>
          )}

          <Button type="submit" variant="primary" disabled={loading} style={{ width: "100%", marginTop: 6 }} aria-busy={loading}>
            {loading ? "Creating account..." : "Create teacher account"}
          </Button>

          <div id="form-help" style={{ color: "var(--color-text-muted)", fontSize: 13, marginTop: 4 }}>
            Already registered? <a href="/teacherlogin" style={{ color: "var(--color-primary)" }}>Sign in</a>
          </div>
        </div>
      </form>
    </Card>
  );
}

function Field(props: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  onBlur: () => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  error?: string | false;
  help?: string;
}) {
  const { label, name, value, onChange, onBlur, type = "text", placeholder, autoFocus, autoComplete, error, help } = props;
  return (
    <div className="theme-surface" style={{ display: "grid", gap: 6 }}>
      <label htmlFor={name} style={{ fontWeight: 500 }}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        style={{
          background: "transparent",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          padding: "0.625rem 0.75rem",
          outline: "2px solid transparent",
          outlineOffset: 0,
        }}
        onFocus={(e) =>
          (e.currentTarget.style.outline = `2px solid color-mix(in oklch, var(--color-primary), transparent 40%)`)
        }
        onBlurCapture={(e) => (e.currentTarget.style.outline = "2px solid transparent")}
      />
      {help && <small style={{ color: "var(--color-text-muted)" }}>{help}</small>}
      {error && <small style={{ color: "var(--color-danger)" }}>{error}</small>}
    </div>
  );
}
