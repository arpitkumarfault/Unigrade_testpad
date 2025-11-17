import React, { HTMLAttributes } from "react";

type Tone = "primary" | "secondary" | "success" | "warning" | "danger";

const toneColor: Record<Tone, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: Tone;
}

export function Badge({ children, tone = "primary", style, ...rest }: BadgeProps) {
  const c = toneColor[tone];
  return (
    <span
      {...rest}
      className="badge"
      style={{
        background: `color-mix(in oklch, ${c}, transparent 85%)`,
        color: c,
        ...style, // Merge custom styles
      }}
    >
      {children}
    </span>
  );
}
