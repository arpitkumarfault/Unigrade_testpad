// components/university/dashboard/Header.tsx
"use client";
import { useState } from "react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchVisible, setSearchVisible] = useState(false);

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
        gap: 12,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h1
            style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: 700,
              color: "var(--color-text)",
            }}
          >
            University Dashboard
          </h1>
          <span
            className="badge hidden sm:inline-flex"
            style={{
              background: "color-mix(in oklch, var(--color-success), transparent 85%)",
              color: "var(--color-success)",
              padding: "4px 8px",
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            Live
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Search - Hidden on very small screens */}
        <div className="hidden sm:block">
          <input
            placeholder="Search..."
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              height: 36,
              padding: "0 12px",
              width: "clamp(140px, 20vw, 260px)",
              fontSize: 14,
            }}
          />
        </div>

        {/* Mobile Search Toggle */}
        <button
          onClick={() => setSearchVisible(!searchVisible)}
          className="sm:hidden"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          🔍
        </button>

        <button
          className="btn btn-primary"
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <span className="hidden sm:inline">New</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>

      {/* Mobile Search Dropdown */}
      {searchVisible && (
        <div
          className="sm:hidden"
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            padding: 16,
            background: "var(--color-bg)",
            borderBottom: "1px solid var(--color-border)",
            zIndex: 30,
          }}
        >
          <input
            placeholder="Search students, courses..."
            autoFocus
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              height: 40,
              padding: "0 12px",
              width: "100%",
              fontSize: 14,
            }}
          />
        </div>
      )}
    </header>
  );
}
