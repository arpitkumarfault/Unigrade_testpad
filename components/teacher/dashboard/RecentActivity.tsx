"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  type: "submission" | "grade" | "test" | "message";
  student: string;
  action: string;
  timestamp: string;
  icon: string;
  color: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Dummy data - replace with API call
    setActivities([
      {
        id: "1",
        type: "submission",
        student: "John Doe",
        action: "submitted Test 3 - Data Structures",
        timestamp: "2 minutes ago",
        icon: "📄",
        color: "#3498db",
      },
      {
        id: "2",
        type: "grade",
        student: "Sarah Smith",
        action: "scored 95% in Quiz 5",
        timestamp: "15 minutes ago",
        icon: "🌟",
        color: "#27ae60",
      },
      {
        id: "3",
        type: "test",
        student: "Michael Brown",
        action: "started Final Exam - React",
        timestamp: "1 hour ago",
        icon: "▶️",
        color: "#e67e22",
      },
      {
        id: "4",
        type: "message",
        student: "Emma Wilson",
        action: "sent you a message",
        timestamp: "2 hours ago",
        icon: "💬",
        color: "#9b59b6",
      },
      {
        id: "5",
        type: "submission",
        student: "David Lee",
        action: "submitted Assignment 2",
        timestamp: "3 hours ago",
        icon: "📄",
        color: "#3498db",
      },
    ]);
  }, []);

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
          marginBottom: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--color-text)",
          }}
        >
          Recent Activity
        </h2>
        <button
          style={{
            fontSize: "0.875rem",
            color: "var(--color-primary)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          View All
        </button>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = activity.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                background: `${activity.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                flexShrink: 0,
              }}
            >
              {activity.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text)",
                  marginBottom: "0.25rem",
                }}
              >
                <strong>{activity.student}</strong> {activity.action}
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
