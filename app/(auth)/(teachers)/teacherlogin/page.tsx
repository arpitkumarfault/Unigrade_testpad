"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Field } from "@/components/ui/Field";
import "@/components/Theme/styles/theme.css";
import ThemeToggleFab from "@/components/teacher/ThemeToggle";
import loginImage from '@/public/images/login.jpg'
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type LoginForm = {
  universityCode: string;
  email: string;
  password: string;
  remember: boolean;
};

export default function TeacherLoginPage() {
  const [form, setForm] = useState<LoginForm>({
    universityCode: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDark, setIsDark] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>(""); // For UI error display
  const router = useRouter();

  // Detect theme
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Calculate errors as a function for latest state
  const errors = {
    universityCode: !form.universityCode.trim() && touched.universityCode ? "University code required" : false,
    email: !form.email
      ? touched.email && "Email required"
      : !/^\S+@\S+\.\S+$/.test(form.email) && touched.email
        ? "Valid email required"
        : false,
    password: form.password.length < 6 && touched.password ? "Min 6 characters" : false,
  };

  const onChange = (k: keyof LoginForm) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.type === "checkbox" ? ev.currentTarget.checked : ev.currentTarget.value;
    setForm((f) => ({ ...f, [k]: val }));
    setErrorMsg(""); // Clear error on change
  };

  const onBlur = (k: keyof LoginForm) => () => setTouched((t) => ({ ...t, [k]: true }));


const submit = async (ev: React.FormEvent) => {
  ev.preventDefault();
  setLoading(true);
  setTouched({
    universityCode: true,
    email: true,
    password: true,
    remember: true,
  });

  if (errors.universityCode || errors.email || errors.password) {
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(
      '/api/teachers/auth/login',
      {
        universityCode: form.universityCode,
        email: form.email,
        password: form.password,
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    if (response.data.status) {
      toast.success(response.data.message || "Login successful");
      setTimeout(() => {
        router.push('/teacher/dashboard');
      }, 200);
    } else {
      toast.error(response.data.message || "Login failed");
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || "Login failed";
    toast.error(message);
    setErrorMsg(message);
  } finally {
    setLoading(false);
  }
};


  // Main return block INSIDE the component
  return (
    <main className="theme-bg" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
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
      <div className="login-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
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
              maxWidth: 460,
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px color-mix(in oklch, var(--color-text), transparent 92%)",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>Welcome Back</h1>
              <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14 }}>
                Sign in to your teacher account to continue
              </p>
            </div>

            {/* Error display */}
            {errorMsg && (
              <div style={{ color: "var(--color-danger)", marginBottom: 12, fontSize: 14 }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={submit} noValidate>
              <div style={{ display: "grid", gap: 18 }}>
                <Field
                  label="University Code"
                  name="universityCode"
                  value={form.universityCode}
                  onChange={onChange("universityCode")}
                  onBlur={onBlur("universityCode")}
                  error={errors.universityCode}
                  placeholder="e.g., UNI2025"
                  icon="🏛️"
                  autoFocus
                  autoComplete="organization"
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  error={errors.email}
                  placeholder="jane.doe@uni.edu"
                  icon="📧"
                  autoComplete="email"
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
                      border: `1px solid ${errors.password ? "var(--color-danger)" : "var(--color-border)"}`,
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
                  {errors.password && (
                    <small style={{ color: "var(--color-danger)", fontSize: 12 }}>⚠️ {errors.password}</small>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      id="remember"
                      type="checkbox"
                      checked={form.remember}
                      onChange={onChange("remember")}
                      style={{
                        accentColor: "var(--color-primary)",
                        width: 16,
                        height: 16,
                        cursor: "pointer",
                      }}
                    />
                    <label
                      htmlFor="remember"
                      style={{
                        fontSize: 13,
                        color: "var(--color-text-muted)",
                        cursor: "pointer",
                      }}
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/teacher/forgot-password"
                    style={{
                      fontSize: 13,
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    marginTop: 4,
                    fontSize: 15,
                    fontWeight: 600,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                    marginTop: 8,
                  }}
                >
                  Don't have an account?{" "}
                  <a
                    href="/teacherregister"
                    style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Create account
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
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${loginImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: isDark ? "brightness(0.9)" : "brightness(1)",
              transition: "filter 0.3s",
            }}
          />
          {/* Overlay */}
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
          {/* Content */}
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
                  ? "color-mix(in oklch, black, transparent 80%)"
                  : "color-mix(in oklch, white, transparent 90%)",
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
                Continue to
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
                  margin: "0 0 24px",
                  fontSize: "clamp(14px, 2vw, 16px)",
                  lineHeight: 1.6,
                  color: isDark ? "color-mix(in oklch, white, transparent 15%)" : "oklch(30% 0.03 255)",
                  transition: "color 0.3s",
                }}
              >
                Access your teacher dashboard to create exams, manage question banks, and review student
                performance.
              </p>

              {/* Feature list */}
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { icon: "✓", text: "Real-time grading analytics" },
                  { icon: "✓", text: "Collaborative question banks" },
                  { icon: "✓", text: "Secure exam management" },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: isDark ? "color-mix(in oklch, white, transparent 10%)" : "oklch(28% 0.03 255)",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "color 0.3s",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: isDark
                          ? "color-mix(in oklch, var(--color-primary), transparent 40%)"
                          : "var(--color-primary)",
                        color: isDark ? "white" : "var(--color-primary-contrast)",
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                        transition: "background 0.3s",
                      }}
                    >
                      {feature.icon}
                    </span>
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
