"use client";

import { useEffect, useState } from "react";

interface Test {
  id: string;
  title: string;
  date: string;
  time: string;
  class: string;
  students: number;
}

export default function UpcomingTests() {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    setTests([
      {
        id: "1",
        title: "Midterm Exam",
        date: "Nov 25",
        time: "10:00 AM",
        class: "CS101",
        students: 45,
      },
      {
        id: "2",
        title: "Quiz 6 - Algorithms",
        date: "Nov 27",
        time: "2:00 PM",
        class: "CS201",
        students: 38,
      },
      {
        id: "3",
        title: "Final Project",
        date: "Dec 1",
        time: "9:00 AM",
        class: "CS301",
        students: 52,
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
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "1rem",
        }}
      >
        Upcoming Tests
      </h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        {tests.map((test) => (
          <div
            key={test.id}
            style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "0.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}
              >
                {test.title}
              </h3>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.375rem",
                  background: "var(--color-primary)",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {test.class}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
              }}
            >
              <span>📅 {test.date}</span>
              <span>🕐 {test.time}</span>
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
              }}
            >
              👥 {test.students} students enrolled
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          marginTop: "1rem",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          color: "var(--color-primary)",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--color-primary)";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--color-bg)";
          e.currentTarget.style.color = "var(--color-primary)";
        }}
      >
        Schedule New Test
      </button>
    </div>
  );
}
