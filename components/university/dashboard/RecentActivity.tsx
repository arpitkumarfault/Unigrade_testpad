// components/university/dashboard/RecentActivity.tsx
"use client";

const activities = [
  { user: "John Doe", action: "enrolled in Computer Science 101", time: "5 min ago", avatar: "👤" },
  { user: "Jane Smith", action: "submitted assignment for Physics", time: "12 min ago", avatar: "👩" },
  { user: "Prof. Johnson", action: "created new course material", time: "1 hour ago", avatar: "👨‍🏫" },
  { user: "Admin", action: "approved 15 student applications", time: "2 hours ago", avatar: "⚙️" },
];

export default function RecentActivity() {
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
        Recent Activity
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {activities.map((activity, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--color-bg)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                background: "color-mix(in oklch, var(--color-primary), transparent 85%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                flexShrink: 0,
              }}
            >
              {activity.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text)", marginBottom: "0.125rem" }}>
                <strong>{activity.user}</strong> {activity.action}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
