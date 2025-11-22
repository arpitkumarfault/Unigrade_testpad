"use client";

import { useEffect, useState } from "react";

interface Class {
  id: string;
  name: string;
  code: string;
  students: number;
  tests: number;
  avgScore: number;
}

export default function MyClasses() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    setClasses([
      { id: "1", name: "Introduction to Programming", code: "CS101", students: 45, tests: 8, avgScore: 78 },
      { id: "2", name: "Data Structures & Algorithms", code: "CS201", students: 38, tests: 6, avgScore: 82 },
      { id: "3", name: "Web Development", code: "CS301", students: 52, tests: 5, avgScore: 85 },
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
        My Classes
      </h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {classItem.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {classItem.code}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.5rem",
                  background: `rgba(39, 174, 96, 0.1)`,
                  color: "#27ae60",
                  fontWeight: 600,
                }}
              >
                {classItem.avgScore}% avg
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Students
                </p>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {classItem.students}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Tests
                </p>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {classItem.tests}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
