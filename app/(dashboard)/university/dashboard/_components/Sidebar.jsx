"use client";
import Link from "next/link";

const items = [
  { href: "/university/dashboard", label: "Overview" },
  { href: "/university/students", label: "Students" },
  { href: "/university/courses", label: "Courses" },
  { href: "/university/exams", label: "Exams" },
  { href: "/university/faculty", label: "Faculty" },
  { href: "/university/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <div style={{ padding: 16, display: "grid", gap: 8, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontWeight: 700 }}>TestPad</h2>
        <button
          className="btn btn-tertiary"
          onClick={() => {
            const html = document.documentElement;
            html.classList.toggle("dark");
            try { localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light"); } catch {}
          }}
        >
          Theme
        </button>
      </div>

      <nav style={{ display: "grid", gap: 6, marginTop: 8 }}>
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="btn btn-secondary">
            {it.label}
          </Link>
        ))}
      </nav>

      <div className="card" style={{ marginTop: "auto", padding: 12 }}>
        <div className="badge" style={{ background: "color-mix(in oklch, var(--color-primary), transparent 85%)", color: "var(--color-primary)" }}>
          Admin
        </div>
        <p style={{ marginTop: 6, fontSize: 12, color: "var(--color-text-muted)" }}>admin@univ.edu</p>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>Logout</button>
      </div>
    </div>
  );
}
