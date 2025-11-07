"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import './styles/theme.css'
type Theme = "light" | "dark" | "system";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  // Apply theme to <html> using class "dark" for dark mode
  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: Theme) => {
      const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const effective =
        t === "system" ? (systemPrefersDark ? "dark" : "light") : t;

      if (effective === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    };

    apply(theme);
    localStorage.setItem("theme", theme);

    // Sync on system changes when using "system"
    if (theme === "system" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => apply("system");
      mq.addEventListener?.("change", listener);
      return () => mq.removeEventListener?.("change", listener);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
