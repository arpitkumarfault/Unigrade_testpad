// components/ui/Button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
};

export default function Button({ variant = "primary", style, ...rest }: Props) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.625rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: 500,
    border: "1px solid transparent",
    cursor: "pointer",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--color-primary)", color: "var(--color-primary-contrast)" },
    secondary: { background: "var(--color-secondary)", color: "var(--color-secondary-contrast)" },
    tertiary: { background: "var(--color-tertiary)", color: "var(--color-tertiary-contrast)" },
    ghost: { background: "transparent", color: "var(--color-text)", borderColor: "var(--color-border)" },
  };

  return (
    <button
      {...rest}
      style={{
        ...base,
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => ((e.currentTarget.style.filter = "saturate(1.05) brightness(0.98)"))}
      onMouseLeave={(e) => ((e.currentTarget.style.filter = "none"))}
    />
  );
}
