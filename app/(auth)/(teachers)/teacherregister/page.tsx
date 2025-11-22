"use client";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Field } from "@/components/ui/Field";
import "@/components/Theme/styles/theme.css";
import ThemeToggleFab from "@/components/teacher/ThemeToggle";
import welcome from "@/public/images/welcome.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Form = {
  fullName: string;
  email: string;
  department: string;
  universityEmail: string,
  universityName: string,
  password: string;
  confirmPassword: string;
  agree: boolean;
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

export default function TeacherRegisterPage() {

  const [form, setForm] = useState<Form>({
    fullName: "",
    email: "",
    department: "",
    universityEmail: "",
    universityName: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDark, setIsDark] = useState(false);
  const router = useRouter()

  // Detect theme
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const pwdStrength = useMemo(() => passwordScore(form.password), [form.password]);
  const pwdTone = pwdStrength < 40 ? "danger" : pwdStrength < 80 ? "warning" : "success";

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name required";
    if (!form.email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.department.trim()) e.department = "Department required";
    if (!form.universityEmail.trim()) e.universityEmail = "University email required";
    if (!form.universityName.trim()) e.universityName = "University name required"; // ← Added
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords don't match";
    if (!form.agree) e.agree = "Accept terms to continue";
    return e;
  }, [form]);

  const onChange = (k: keyof Form) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.type === "checkbox" ? ev.currentTarget.checked : ev.currentTarget.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const onBlur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/teachers/auth/register",
        {
          name: form.fullName,
          email: form.email,
          department: form.department,
          universityEmail: form.universityEmail,
          universityName: form.universityName,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      // ...rest of your logic
      if (response.data.status) {
        toast.success(response.data.message);

        setForm({
          fullName: "",
          email: "",
          department: "",
          universityEmail: "",
          universityName: "", // ← Added
          password: "",
          confirmPassword: "",
          agree: false,
        });
        setTouched({});
        setTimeout(() => {
          router.push('/teacherlogin')
        }, 2000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Registration failed";
        toast.error(message);
      } else {
        toast.error("Connection error. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="theme-bg" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Toaster position="top-center" />
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--color-bg)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge tone="primary">UniGrade</Badge>
          <Badge tone="secondary">Teacher</Badge>
        </div>
        <ThemeToggleFab />
      </header>

      {/* Main Grid */}
      <div className="register-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
        {/* Form Section */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            overflowY: "auto",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px color-mix(in oklch, var(--color-text), transparent 92%)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 700 }}>Create Teacher Account</h1>
              <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14 }}>
                Manage exams and streamline grading with UniGrade TestPad
              </p>
            </div>

            {/* ← FORM CALLS submit FUNCTION */}
            <form onSubmit={submit} noValidate>
              <div style={{ display: "grid", gap: 16 }}>
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  onBlur={onBlur("fullName")}
                  error={touched.fullName && errors.fullName}
                  placeholder="Dr. Jane Doe"
                  icon="👤"
                  autoFocus
                  autoComplete="name"
                />

                <Field
                  label="Institutional Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  error={touched.email && errors.email}
                  placeholder="jane.doe@uni.edu"
                  icon="📧"
                  help="Use your university-issued email"
                  autoComplete="email"
                />

                <Field
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={onChange("department")}
                  onBlur={onBlur("department")}
                  error={touched.department && errors.department}
                  placeholder="Computer Science"
                  icon="🏛️"
                  autoComplete="organization"
                />
                <Field
                  label="University Email"
                  name="universityEmail"
                  value={form.universityEmail}
                  onChange={onChange("universityEmail")}
                  onBlur={onBlur("universityEmail")}
                  error={touched.universityEmail && errors.universityEmail}
                  placeholder="jane.doe@university.edu"
                  icon="🏫"
                  autoComplete="email"
                />
                <Field
                  label="University Name"
                  name="universityName"
                  value={form.universityName}
                  onChange={onChange("universityName")}
                  onBlur={onBlur("universityName")}
                  error={touched.universityName && errors.universityName}
                  placeholder="Indian Institute of Technology"
                  icon="🏫"
                  autoComplete="organization"
                />

                {/* Password with toggle */}
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="password" style={{ fontSize: 14, fontWeight: 600 }}>
                    Password
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border: `1px solid ${touched.password && errors.password ? "var(--color-danger)" : "var(--color-border)"
                        }`,
                      borderRadius: 8,
                      padding: "0.625rem 0.875rem",
                      background: "var(--color-bg)",
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
                    <input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={onChange("password")}
                      onBlur={onBlur("password")}
                      placeholder="Min 8 characters"
                      autoComplete="new-password"
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "var(--color-text)",
                        fontSize: 15,
                        minWidth: 0,
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPwd(!showPwd)}
                      style={{ padding: "0.25rem 0.5rem", fontSize: 12, flexShrink: 0 }}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </Button>
                  </div>
                  {form.password && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Progress value={pwdStrength} />
                      <Badge tone={pwdTone as any} style={{ flexShrink: 0 }}>
                        {pwdStrength < 40 ? "Weak" : pwdStrength < 80 ? "Medium" : "Strong"}
                      </Badge>
                    </div>
                  )}
                  {touched.password && errors.password && (
                    <small style={{ color: "var(--color-danger)", fontSize: 12 }}>⚠️ {errors.password}</small>
                  )}
                </div>

                {/* Confirm Password with toggle */}
                <div style={{ display: "grid", gap: 6 }}>
                  <label htmlFor="confirmPassword" style={{ fontSize: 14, fontWeight: 600 }}>
                    Confirm Password
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border: `1px solid ${touched.confirmPassword && errors.confirmPassword
                        ? "var(--color-danger)"
                        : "var(--color-border)"
                        }`,
                      borderRadius: 8,
                      padding: "0.625rem 0.875rem",
                      background: "var(--color-bg)",
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>✓</span>
                    <input
                      id="confirmPassword"
                      type={showConfirmPwd ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={onChange("confirmPassword")}
                      onBlur={onBlur("confirmPassword")}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "var(--color-text)",
                        fontSize: 15,
                        minWidth: 0,
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      style={{ padding: "0.25rem 0.5rem", fontSize: 12, flexShrink: 0 }}
                    >
                      {showConfirmPwd ? "Hide" : "Show"}
                    </Button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <small style={{ color: "var(--color-danger)", fontSize: 12 }}>
                      ⚠️ {errors.confirmPassword}
                    </small>
                  )}
                </div>

                {/* Checkbox */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "0.5rem",
                    borderRadius: 8,
                    background:
                      touched.agree && errors.agree
                        ? "color-mix(in oklch, var(--color-danger), transparent 95%)"
                        : "transparent",
                  }}
                >
                  <input
                    id="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={onChange("agree")}
                    onBlur={onBlur("agree")}
                    style={{
                      marginTop: 4,
                      accentColor: "var(--color-primary)",
                      width: 16,
                      height: 16,
                      flexShrink: 0,
                    }}
                  />
                  <label
                    htmlFor="agree"
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-muted)",
                      lineHeight: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    I agree to the{" "}
                    <a href="/terms" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {touched.agree && errors.agree && (
                  <small style={{ color: "var(--color-danger)", fontSize: 12, marginTop: -8 }}>
                    ⚠️ {errors.agree}
                  </small>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    marginTop: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending Request..." : "Request Approval"}
                </Button>

                <div style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
                  Have an account?{" "}
                  <a href="/teacherlogin" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                    Sign in
                  </a>
                </div>
              </div>
            </form>
          </Card>
        </section>

        {/* Hero Section */}
        <aside
          style={{
            position: "relative",
            minHeight: "100%",
            background: isDark ? "oklch(20% 0.03 255)" : "oklch(96% 0.01 255)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${welcome.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: isDark ? "brightness(0.9)" : "brightness(1)",
              transition: "filter 0.3s",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(180deg, color-mix(in oklch, black, transparent 60%) 0%, color-mix(in oklch, black, transparent 10%) 100%)"
                : "linear-gradient(180deg, color-mix(in oklch, white, transparent 40%) 0%, color-mix(in oklch, var(--color-primary), transparent 60%) 100%)",
              transition: "background 0.3s",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
              padding: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            <div
              style={{
                maxWidth: 560,
                background: isDark
                  ? "color-mix(in oklch, black, transparent 60%)"
                  : "color-mix(in oklch, white, transparent 25%)",
                backdropFilter: "blur(16px)",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                borderRadius: 20,
                border: `1px solid ${isDark
                  ? "color-mix(in oklch, white, transparent 85%)"
                  : "color-mix(in oklch, white, transparent 50%)"
                  }`,
                transition: "all 0.3s",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: isDark ? "var(--color-primary)" : "var(--color-secondary)",
                  transition: "color 0.3s",
                }}
              >
                Welcome to
              </p>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: "clamp(24px, 4vw, 44px)",
                  fontWeight: 800,
                  color: isDark ? "#fff" : "oklch(22% 0.05 255)",
                  lineHeight: 1.2,
                  textShadow: isDark
                    ? "0 0 20px color-mix(in oklch, var(--color-primary), transparent 70%)"
                    : "none",
                  transition: "color 0.3s, text-shadow 0.3s",
                }}
              >
                UniGrade TestPad
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 2vw, 16px)",
                  lineHeight: 1.6,
                  color: isDark ? "color-mix(in oklch, white, transparent 15%)" : "oklch(30% 0.03 255)",
                  transition: "color 0.3s",
                }}
              >
                Build secure exams, collaborate on question banks, and streamline grading. Empower your teaching
                with modern assessment tools.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        @media (max-width: 960px) {
          .register-grid {
            grid-template-columns: 1fr !important;
          }
          .register-grid > aside {
            order: -1;
            min-height: 40vh;
          }
          .register-grid > section {
            padding: 1.5rem 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .register-grid > section {
            padding: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}
