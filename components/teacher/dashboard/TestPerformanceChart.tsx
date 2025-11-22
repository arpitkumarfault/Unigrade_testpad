"use client";

import { useEffect, useState } from "react";

export default function TestPerformanceChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Dummy data - replace with API call
    setChartData([
      { month: "Jan", avgScore: 72 },
      { month: "Feb", avgScore: 75 },
      { month: "Mar", avgScore: 78 },
      { month: "Apr", avgScore: 76 },
      { month: "May", avgScore: 80 },
      { month: "Jun", avgScore: 82 },
    ]);
  }, []);

  const maxScore = 100;

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--color-text)",
          }}
        >
          Student Performance Trends
        </h2>
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
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Simple Bar Chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: "200px" }}>
        {chartData.map((data, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-primary)",
              }}
            >
              {data.avgScore}%
            </span>
            <div
              style={{
                width: "100%",
                height: `${(data.avgScore / maxScore) * 180}px`,
                background: "linear-gradient(180deg, var(--color-primary), var(--color-secondary))",
                borderRadius: "0.5rem 0.5rem 0 0",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
              }}
            >
              {data.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
