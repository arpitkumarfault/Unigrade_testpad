"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Classroom {
  _id: string;
  className: string;
  classCode: string;
  teacherName: string;
  upcomingTestsCount: number;
  assignmentsDue: number;
}

export default function StudentDashboard() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  async function fetchClassrooms() {
    try {
      setLoading(true);
      const res = await axios.get("/api/student/classrooms");
      setClassrooms(res.data.data || []);
      toast.success("Classrooms loaded");
    } catch {
      toast.error("Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "1rem", maxWidth: 900, margin: "auto" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
          borderRadius: "1rem",
          color: "white",
          padding: "2rem",
          marginBottom: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
          Welcome back, Student! 🎓
        </h1>
        <p style={{ opacity: 0.9, fontSize: "1rem" }}>
          Here's your classroom overview and pending tasks.
        </p>
      </div>

      {/* Classroom Cards */}
      {loading && <p>Loading your classrooms...</p>}

      {!loading && classrooms.length === 0 && <p>You haven't joined any classrooms yet.</p>}

      <div style={{ display: "grid", gap: "1rem" }}>
        {classrooms.map((cls) => (
          <div
            key={cls._id}
            className="card"
            style={{
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2 style={{ margin: 0, marginBottom: "0.5rem", color: "var(--color-text)" }}>{cls.className}</h2>
            <p style={{ margin: 0, marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              <strong>Code:</strong> {cls.classCode} | <strong>Teacher:</strong> {cls.teacherName}
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-contrast)",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Upcoming Tests: {cls.upcomingTestsCount}
              </div>
              <div
                style={{
                  backgroundColor: "var(--color-tertiary)",
                  color: "var(--color-tertiary-contrast)",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                Assignments Due: {cls.assignmentsDue}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
