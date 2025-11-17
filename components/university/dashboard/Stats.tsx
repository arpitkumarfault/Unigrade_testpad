// components/university/dashboard/Stats.tsx
"use client";

const stats = [
  {
    label: "Total Students",
    value: "12,450",
    change: "+12.5%",
    positive: true,
    icon: "👥",
    color: "var(--color-primary)",
  },
  {
    label: "Active Courses",
    value: "248",
    change: "+5.2%",
    positive: true,
    icon: "📚",
    color: "var(--color-secondary)",
  },
  {
    label: "Faculty Members",
    value: "856",
    change: "+8.3%",
    positive: true,
    icon: "👨‍🏫",
    color: "var(--color-tertiary)",
  },
  {
    label: "Avg. Attendance",
    value: "94.2%",
    change: "-1.2%",
    positive: false,
    icon: "📊",
    color: "var(--color-success)",
  },
];

export default function Stats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "1rem",
            padding: "1.5rem",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>
                {stat.value}
              </h3>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: stat.positive
                    ? "color-mix(in oklch, var(--color-success), transparent 85%)"
                    : "color-mix(in oklch, var(--color-danger), transparent 85%)",
                  color: stat.positive ? "var(--color-success)" : "var(--color-danger)",
                }}
              >
                <span>{stat.positive ? "↗" : "↘"}</span>
                {stat.change}
              </div>
            </div>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: `color-mix(in oklch, ${stat.color}, transparent 85%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
