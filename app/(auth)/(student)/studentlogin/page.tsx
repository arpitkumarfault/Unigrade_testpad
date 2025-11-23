"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Field } from "@/components/ui/Field";
import "@/components/Theme/styles/theme.css";
import ThemeToggleFab from "@/components/teacher/ThemeToggle";
import welcome from "@/public/images/welcome2.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import './style/style.css'

type Form = {
  email: string;
  universityCode: string;
  password: string;
};

export default function StudentLoginPage() {
  const [form, setForm] = useState<Form>({
    email: "",
    universityCode: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  // Detect theme
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.email.trim()) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.universityCode.trim()) e.universityCode = "University code required";
    if (!form.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (k: keyof Form) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const val = ev.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const onBlur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ email: true, universityCode: true, password: true });
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/students/auth/login",
        {
          email: form.email,
          universityCode: form.universityCode,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        toast.success(response.data.message || "Login successful");
        setTimeout(() => {
          router.push("/student/dashboard");
        }, 300);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
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
          <Badge tone="secondary">Student</Badge>
        </div>
        <ThemeToggleFab />
      </header>

      {/* Main Grid */}
      <div className="register-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
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
              <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 700 }}>Student Login</h1>
              <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14 }}>
                Login to access your courses, exams, and grades.
              </p>
            </div>

            <form onSubmit={submit} noValidate>
              <div style={{ display: "grid", gap: 16 }}>
                {/* University Code */}
                <Field
                  label="University Code"
                  name="universityCode"
                  value={form.universityCode}
                  onChange={onChange("universityCode")}
                  onBlur={onBlur("universityCode")}
                  error={touched.universityCode && errors.universityCode}
                  placeholder="Enter your university code"
                  icon="🏫"
                  autoComplete="off"
                />

                {/* Email */}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  error={touched.email && errors.email}
                  placeholder="your.email@example.com"
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
                      border: `1px solid ${touched.password && errors.password ? "var(--color-danger)" : "var(--color-border)"}`,
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
                  {touched.password && errors.password && (
                    <small style={{ color: "var(--color-danger)", fontSize: 12 }}>⚠️ {errors.password}</small>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: 15,
                    fontWeight: 600,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
                  Don't have an account?{" "}
                  <a href="/studentregister" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                    Register
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
                background: isDark ? "color-mix(in oklch, black, transparent 60%)" : "color-mix(in oklch, white, transparent 25%)",
                backdropFilter: "blur(16px)",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                borderRadius: 20,
                border: `1px solid ${
                  isDark ? "color-mix(in oklch, white, transparent 85%)" : "color-mix(in oklch, white, transparent 50%)"
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
                Welcome back
              </p>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: "clamp(24px, 4vw, 44px)",
                  fontWeight: 800,
                  color: isDark ? "#fff" : "oklch(22% 0.05 255)",
                  lineHeight: 1.2,
                  textShadow: isDark ? "0 0 20px color-mix(in oklch, var(--color-primary), transparent 70%)" : "none",
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
                Access your academic resources and track your progress.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
