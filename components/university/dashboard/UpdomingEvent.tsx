// components/university/dashboard/UpcomingEvents.tsx
"use client";

const events = [
  { title: "Semester Registration", date: "Nov 20", time: "9:00 AM", color: "var(--color-primary)" },
  { title: "Faculty Meeting", date: "Nov 22", time: "2:00 PM", color: "var(--color-secondary)" },
  { title: "Final Exams Begin", date: "Dec 1", time: "All Day", color: "var(--color-danger)" },
];

export default function UpcomingEvents() {
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
        Upcoming Events
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {events.map((event, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                width: "3px",
                borderRadius: "2px",
                background: event.color,
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.25rem" }}>
                {event.title}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                {event.date} • {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
