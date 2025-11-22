"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Create Test",
      icon: "➕",
      color: "#3498db",
      path: "/teacher/tests/create",
    },
    {
      title: "Grade Submissions",
      icon: "✏️",
      color: "#e67e22",
      path: "/teacher/grading",
    },
    {
      title: "View Analytics",
      icon: "📈",
      color: "#9b59b6",
      path: "/teacher/analytics",
    },
    {
      title: "Manage Classes",
      icon: "🗂️",
      color: "#27ae60",
      path: "/teacher/classes",
    },
  ];

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "1rem",
        }}
      >
        Quick Actions
      </h2>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => router.push(action.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = action.color;
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                background: `${action.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              {action.icon}
            </div>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
