// components/university/dashboard/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/university/dashboard", label: "Overview", icon: "📊" },
  { href: "/university/students", label: "Students", icon: "👥" },
  { href: "/university/courses", label: "Courses", icon: "📚" },
  { href: "/university/exams", label: "Exams", icon: "📝" },
  { href: "/university/faculty", label: "Faculty", icon: "👨‍🏫" },
  { href: "/university/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    try {
      localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
    } catch {}
  };

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 8,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 20, color: "var(--color-primary)" }}>
          TestPad
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
            title="Toggle Theme"
          >
            🌓
          </button>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="md:hidden"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
            title="Close Menu"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 8,
                textDecoration: "none",
                background: isActive
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
                color: isActive
                  ? "var(--color-primary-contrast)"
                  : "var(--color-text)",
                border: `1px solid ${isActive ? "transparent" : "var(--color-border)"}`,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card */}
      <div
        className="card"
        style={{
          padding: 16,
          borderRadius: 12,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="badge"
          style={{
            background: "color-mix(in oklch, var(--color-primary), transparent 85%)",
            color: "var(--color-primary)",
            display: "inline-flex",
            padding: "4px 12px",
            borderRadius: 16,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Admin
        </div>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          John Doe
        </p>
        <p
          style={{
            marginTop: 2,
            fontSize: 12,
            color: "var(--color-text-muted)",
          }}
        >
          admin@univ.edu
        </p>
        <button
          className="btn btn-primary"
          style={{
            width: "100%",
            marginTop: 12,
            padding: "10px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
