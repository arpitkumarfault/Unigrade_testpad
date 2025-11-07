"use client";

import { useTheme } from "./ThemeProvider";
import './styles/theme.css'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-2">
      <label className="text-sm text-(--color-text-muted)">Theme</label>
      <select
        aria-label="Theme"
        className="rounded-md border border-(--color-border) bg-(--color-surface) px-2 py-1 text-(--color-text)"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
