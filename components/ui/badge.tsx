type Tone = "primary" | "secondary" | "success" | "warning" | "danger";

const toneColor: Record<Tone, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
};

export function Badge({ children, tone = "primary" }: { children: React.ReactNode; tone?: Tone }) {
  const c = toneColor[tone];
  return (
    <span className="badge" style={{ background: `color-mix(in oklch, ${c}, transparent 85%)`, color: c }}>
      {children}
    </span>
  );
}
