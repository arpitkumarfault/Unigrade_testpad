"use client";
import React from "react";

export function WelcomePanel({ welcomeImage }: { welcomeImage?: string }) {
  const backgroundImage = welcomeImage
    ? `url(${welcomeImage})`
    : "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0')";

  return (
    <div className="welcome-aside-inner">
      <div
        className="welcome-bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.05)",
        }}
      />
      <div
        className="welcome-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, color-mix(in oklch, black, transparent 30%) 0%, color-mix(in oklch, black, transparent 35%) 55%, color-mix(in oklch, black, transparent 18%) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="welcome-lightband"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--color-primary), white 78%) 0%, color-mix(in oklch, var(--color-primary), white 86%) 100%)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <div className="welcome-content">
        <div className="welcome-card">
          <p className="welcome-kicker">WELCOME TO</p>
          <h2 className="welcome-heading">UniGrade TestPad</h2>
          <p className="welcome-sub">
            Build secure examinations, collaborate on question banks, and streamline grading with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
