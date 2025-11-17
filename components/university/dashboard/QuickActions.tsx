// components/university/dashboard/QuickActions.tsx
"use client";

const actions = [
  { label: "Add Student", icon: "➕", color: "var(--color-primary)" },
  { label: "Create Course", icon: "📝", color: "var(--color-secondary)" },
  { label: "Schedule Exam", icon: "📅", color: "var(--color-tertiary)" },
  { label: "View Reports", icon: "📊", color: "var(--color-success)" },
];

export default function QuickActions() {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
    >
      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
        Quick Actions
      </h3>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-bg)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                background: `color-mix(in oklch, ${action.color}, transparent 85%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              {action.icon}
            </div>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
