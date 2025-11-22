"use client";

import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  score: number;
  class: string;
  avatar: string;
}

export default function TopStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents([
      { id: "1", name: "Alice Johnson", score: 98.5, class: "CS101", avatar: "A" },
      { id: "2", name: "Bob Williams", score: 96.2, class: "CS201", avatar: "B" },
      { id: "3", name: "Carol Davis", score: 94.8, class: "CS301", avatar: "C" },
      { id: "4", name: "David Miller", score: 93.5, class: "CS101", avatar: "D" },
      { id: "5", name: "Eve Garcia", score: 92.1, class: "CS201", avatar: "E" },
    ]);
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

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
        Top Performers 🏆
      </h2>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {students.map((student, index) => (
          <div
            key={student.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: index < 3 ? "var(--color-bg)" : "transparent",
              border: index < 3 ? "1px solid var(--color-border)" : "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = index < 3 ? "var(--color-bg)" : "transparent";
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
                position: "relative",
              }}
            >
              {student.avatar}
              {index < 3 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    fontSize: "1rem",
                  }}
                >
                  {medals[index]}
                </span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "0.125rem",
                }}
              >
                {student.name}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {student.class}
              </p>
            </div>
            <div
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "var(--color-primary)",
              }}
            >
              {student.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
