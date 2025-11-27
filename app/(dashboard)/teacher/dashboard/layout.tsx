"use client";
import "@/components/Theme/styles/theme.css";
import Sidebar from '@/components/university/dashboard/Sidebar';
import Header from '@/components/ui/Header';
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Explicitly type sidebarOpen as boolean, default false
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    // Example user data, replace with auth/user context as needed
    const user = {
        userRole: "teacher",
        userName: "ved chaobey",
        userEmail: "ved2223@univ.edu",
    };

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
                <Sidebar
                    onClose={() => setSidebarOpen(false)}
                    userRole={user.userRole as any} // cast or get valid role dynamically
                    userName={user.userName}
                    userEmail={user.userEmail}
                />
            </aside>

            {/* Main Content */}
            <section
                className="flex-1 flex flex-col"
                style={{ marginLeft: 0 }}
            >
                <div
                    className="md:ml-0"
                    style={{ width: "100%" }}
                >
                    <Header
                        title="Professor's Desk"
                        userRole="teacher"
                        onMenuClick={() => setSidebarOpen(true)}
                        searchPlaceholder="Search assignments..."
                    />

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
