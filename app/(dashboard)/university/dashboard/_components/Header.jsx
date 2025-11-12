export default function Header() {
  return (
    <header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>University Dashboard</h1>
        <span className="badge" style={{ background: "color-mix(in oklch, var(--color-secondary), transparent 85%)", color: "var(--color-secondary)" }}>
          Live
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Search students, courses..."
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            height: 36,
            padding: "0 12px",
            width: 260,
          }}
        />
        <button className="btn btn-primary">New</button>
      </div>
    </header>
  );
}
