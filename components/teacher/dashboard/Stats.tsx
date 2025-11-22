"use client";

import { useEffect, useState } from "react";

interface StatsData {
  totalStudents: number;
  activeTests: number;
  totalClasses: number;
  avgPerformance: number;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    totalStudents: 0,
    activeTests: 0,
    totalClasses: 0,
    avgPerformance: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    // For now, using dummy data
    setStats({
      totalStudents: 156,
      activeTests: 4,
      totalClasses: 6,
      avgPerformance: 78.5,
    });
  }, []);

  const statsCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👥",
      color: "#3498db",
      bgColor: "rgba(52, 152, 219, 0.1)",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Tests",
      value: stats.activeTests,
      icon: "📝",
      color: "#9b59b6",
      bgColor: "rgba(155, 89, 182, 0.1)",
      change: "+2",
      changeType: "positive",
    },
    {
      title: "My Classes",
      value: stats.totalClasses,
      icon: "📚",
      color: "#e67e22",
      bgColor: "rgba(230, 126, 34, 0.1)",
      change: "Active",
      changeType: "neutral",
    },
    {
      title: "Avg Performance",
      value: `${stats.avgPerformance}%`,
      icon: "📊",
      color: "#27ae60",
      bgColor: "rgba(39, 174, 96, 0.1)",
      change: "+5.2%",
      changeType: "positive",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {statsCards.map((stat, index) => (
        <div
          key={index}
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
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Icon Background */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              fontSize: "5rem",
              opacity: 0.1,
            }}
          >
            {stat.icon}
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.75rem",
                  background: stat.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.title}
                </p>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  {stat.value}
                </h3>
              </div>
            </div>

            {/* Change Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.375rem",
                  background:
                    stat.changeType === "positive"
                      ? "rgba(39, 174, 96, 0.1)"
                      : stat.changeType === "negative"
                      ? "rgba(231, 76, 60, 0.1)"
                      : "rgba(149, 165, 166, 0.1)",
                  color:
                    stat.changeType === "positive"
                      ? "#27ae60"
                      : stat.changeType === "negative"
                      ? "#e74c3c"
                      : "#95a5a6",
                  fontWeight: 600,
                }}
              >
                {stat.changeType === "positive" ? "↑" : stat.changeType === "negative" ? "↓" : "•"}{" "}
                {stat.change}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                vs last month
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
