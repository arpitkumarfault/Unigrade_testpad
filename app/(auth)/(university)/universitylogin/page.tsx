"use client";
import { useEffect, useId, useState } from "react";
import { isAxiosError } from "axios";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import "@/components/Theme/styles/theme.css";
import "./style/style.css"

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const theme = localStorage.getItem("theme");
    if (theme === "dark") root.classList.add("dark");
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
      <span>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}

export default function UniversityLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ universityCode: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.universityCode.trim()) newErrors.universityCode = "University code required";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fix errors");

    const toastId = toast.loading("Signing in...");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/university/login", 
        { universityCode: form.universityCode, password: form.password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data?.message || "Login successful!", { id: toastId });
      setTimeout(() => router.push("/university/dashboard"), 800);
    } catch (err: any) {
      const msg = isAxiosError(err) 
        ? err.response?.data?.message || err.response?.data?.error || 
          (err.response?.status === 401 ? "Invalid credentials" : "Login failed")
        : "Network error";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: "🔐", title: "Secure Login", desc: "Protected access" },
    { icon: "📊", title: "Exam Management", desc: "Full control" },
    { icon: "📈", title: "Analytics", desc: "Performance insights" },
    { icon: "⚡", title: "Fast Access", desc: "Instant dashboard" },
  ];

  return (
    <div className="auth-container">
      <ThemeToggle />
      
      <div className="auth-wrapper">
        <div className="auth-grid">
          {/* Hero Section */}
          <div className="auth-hero">
            <div className="hero-badge">
              <span className="hero-icon">🏛️</span>
              <span>University Portal</span>
            </div>

            <h1 className="hero-title">
              Welcome to <span className="highlight">TestPad</span>
            </h1>

            <p className="hero-subtitle">
              Access your university dashboard to manage examinations and track academic performance
            </p>

            <div className="features-grid">
              {features.map((feat, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{feat.icon}</div>
                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="auth-form-section">
            <div className="auth-card">
              <div className="auth-header">
                <div className="auth-icon">🔐</div>
                <h2>University Login</h2>
                <p>Sign in to access your TestPad dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <Field
                  label="University Code"
                  name="universityCode"
                  value={form.universityCode}
                  onChange={handleChange}
                  error={errors.universityCode || false}
                  placeholder="e.g., STA1234"
                  icon="🏛️"
                  autoFocus
                  autoComplete="username"
                />

                <div className="field-wrapper">
                  <Field
                    label="Password"
                    name="password"
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password || false}
                    placeholder="••••••••"
                    icon="🔒"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="pwd-toggle"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>

                <div className="form-footer">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                    />
                    <span>Remember me</span>
                  </label>
                  <Link href="/university/forgot-password" className="link-primary">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="form-text">
                  Don't have an account?{" "}
                  <Link href="/universityregister" className="link-primary">
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
