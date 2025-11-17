// app/dashboard/layout.tsx
"use client"
import "@/components/Theme/styles/theme.css";
import Sidebar from '@/components/university/dashboard/Sidebar'
import Header from '@/components/university/dashboard/Header'
import { useState } from "react";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen,setSidebarOpen] = useState()

  return (
    <div className="theme-bg min-h-screen flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px",
          width: 280,
          height: "100vh",
          background: "var(--color-bg)",
          borderRight: "1px solid var(--color-border)",
          zIndex: 50,
          transition: "left 0.3s ease",
          overflowY: "auto",
        }}
        className="md:left-0 md:static md:block"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col" style={{ marginLeft: 0 }}>
        <div className="md:ml-0" style={{ width: "100%" }}>
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main style={{ padding: "1rem" }}>{children}</main>
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 768px) {
          section {
            margin-left: 280px;
          }
        }
      `}</style>
    </div>
  );
}
