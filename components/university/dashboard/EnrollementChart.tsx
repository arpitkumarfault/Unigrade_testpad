// components/university/dashboard/EnrollmentChart.tsx
"use client";

export default function EnrollmentChart() {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.25rem" }}>
            Enrollment Trend
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Monthly student enrollment growth
          </p>
        </div>
        <select
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg)",
            color: "var(--color-text)",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>

      {/* Chart Placeholder */}
      <div
        style={{
          height: "280px",
          background: "var(--color-bg)",
          borderRadius: "0.75rem",
          border: "2px dashed var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "3rem" }}>📈</div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
          Chart visualization (integrate Chart.js or Recharts)
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
        {["Total Enrolled", "New Students", "Transfers"].map((label, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
                background: ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)"][idx],
              }}
            />
            <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
