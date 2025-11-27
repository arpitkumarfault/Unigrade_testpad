"use client";
import { useParams } from "next/navigation";

export default function ClassroomManagementPage() {
  const { id } = useParams();

  // Static sections for demo (replace with API data later)
  const sections = [
    { id: "attendance", title: "Attendance", icon: "📋", desc: "Track daily presence" },
    { id: "practice", title: "Practice", icon: "📝", desc: "Self-learning quizzes" },
    { id: "assignments", title: "Assignments", icon: "📚", desc: "Homework & Grading" },
    { id: "testpad", title: "TestPad Exams", icon: "🧪", desc: "Proctored Exams" },
    { id: "classwork", title: "Classwork", icon: "📖", desc: "Notes & Materials" },
    { id: "reports", title: "Reports", icon: "📊", desc: "Performance Analytics" },
    { id: "livequiz", title: "Live Quiz", icon: "⚡", desc: "Real-time Polling" },
    { id: "collaboration", title: "Collaboration", icon: "🤝", desc: "Group Chat Rooms" },
    { id: "ai-insights", title: "AI Insights", icon: "🤖", desc: "Student Performance Tips" },
    { id: "resource-hub", title: "Resource Hub", icon: "📂", desc: "Shared Files" },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Classroom Dashboard</h1>
        <p style={{ color: "var(--color-text-muted)" }}>ID: {id}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {sections.map((section) => (
          <div
            key={section.id}
            className="card"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{section.icon}</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>{section.title}</h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>{section.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
