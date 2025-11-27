// app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "../../../../components/Theme/styles/theme.css";
import { Field } from "@/components/ui/Field";
import '../universityregister/style.css'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
    localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
        height: "3.5rem",
        width: "3.5rem",
        borderRadius: "50%",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        border: "2px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text)",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      aria-label="Toggle theme"
    >
      <span style={{ fontSize: "1.5rem" }}>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    universityName: "",
    universityEmail: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.universityName.trim()) newErrors.universityName = "University name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.universityEmail)) newErrors.universityEmail = "Valid email required";
    if (!/^\+?\d{7,15}$/.test(formData.contactNumber)) newErrors.contactNumber = "Valid phone number required (7-15 digits)";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.password.length < 8) newErrors.password = "Minimum 8 characters required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    const toastId = toast.loading("Creating your account...");
    setLoading(true);

    try {
      const res = await axios.post("/api/university/auth/register", {
        universityName: formData.universityName,
        universityEmail: formData.universityEmail,
        contactNumber: formData.contactNumber,
        address: formData.address,
        password: formData.password,
      });

      const code = res.data?.data?.universityCode;
      toast.success(code ? `Success! Your University Code: ${code}` : "Registration successful!", { id: toastId, duration: 5000 });
      setTimeout(() => router.push("/universitylogin"), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen theme-bg"
      style={{
        background: "linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%)",
        minHeight: "100vh",
      }}
    >
      <ThemeToggle />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <div className="responsive-grid">
          {/* Left - Hero Section */}
          <div className="hero-section">
            <div style={{ marginBottom: "2rem" }}>
              <div
                className="badge"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-primary)",
                  marginBottom: "1.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>🎓</span>
                <span style={{ fontWeight: 600 }}>Trusted by 500+ Universities</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Welcome to <span style={{ color: "var(--color-primary)" }}>TestPad</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "var(--color-text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Modern examination platform built for educational excellence
              </p>
            </div>

            {/* Features Grid */}
            <div className="features-grid">
              {[
                { icon: "🔒", title: "Secure & Reliable", desc: "Bank-grade security" },
                { icon: "📊", title: "Real-time Analytics", desc: "Instant insights" },
                { icon: "⚡", title: "Lightning Fast", desc: "Built to scale" },
                { icon: "🎯", title: "Easy to Use", desc: "Intuitive interface" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="card card-hover"
                  style={{
                    background: "var(--color-surface)",
                    padding: "1.25rem",
                    borderRadius: "1rem",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{feature.icon}</div>
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "0.25rem",
                      fontSize: "1rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="form-section">
            <div
              className="card"
              style={{
                background: "var(--color-surface)",
                borderRadius: "1.5rem",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              }}
            >
              {/* Form Header */}
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "4rem",
                    height: "4rem",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>🏛️</span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Create Account
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                  Register your university in minutes
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <Field
                  label="University Name"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  error={errors.universityName || false}
                  placeholder="Stanford University"
                  icon="🏛️"
                  autoComplete="organization"
                />

                <Field
                  label="University Email"
                  name="universityEmail"
                  type="email"
                  value={formData.universityEmail}
                  onChange={handleChange}
                  error={errors.universityEmail || false}
                  placeholder="admin@university.edu"
                  icon="📧"
                  help="Official university email address"
                  autoComplete="email"
                />

                <Field
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber || false}
                  placeholder="+1 650 723 2300"
                  icon="📞"
                  autoComplete="tel"
                />

                <Field
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address || false}
                  placeholder="450 Serra Mall, Stanford, CA 94305"
                  icon="📍"
                  autoComplete="street-address"
                />

                <div className="password-grid">
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password || false}
                    placeholder="••••••••"
                    icon="🔒"
                    autoComplete="new-password"
                  />

                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword || false}
                    placeholder="••••••••"
                    icon="🔒"
                    autoComplete="new-password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    marginTop: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Footer Link */}
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    marginTop: "1rem",
                  }}
                >
                  Already have an account?{" "}
                  <Link
                    href="/universitylogin"
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Sign in here
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
