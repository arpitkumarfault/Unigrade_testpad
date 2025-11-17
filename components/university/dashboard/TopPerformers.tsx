// components/university/dashboard/TopPerformers.tsx
"use client";

const performers = [
  { name: "Sarah Wilson", score: "98.5%", dept: "Computer Science", rank: 1 },
  { name: "Michael Chen", score: "97.2%", dept: "Engineering", rank: 2 },
  { name: "Emily Brown", score: "96.8%", dept: "Business", rank: 3 },
];

export default function TopPerformers() {
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
        Top Performers 🏆
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {performers.map((student, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: idx === 0 ? "color-mix(in oklch, var(--color-primary), transparent 90%)" : "var(--color-bg)",
              border: idx === 0 ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: ["#FFD700", "#C0C0C0", "#CD7F32"][idx] || "var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "white",
                flexShrink: 0,
              }}
            >
              {student.rank}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "0.875rem", marginBottom: "0.125rem" }}>
                {student.name}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{student.dept}</p>
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--color-success)",
              }}
            >
              {student.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
