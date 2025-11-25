"use client"
import Stats from "@/components/teacher/dashboard/Stats";
import QuickActions from "@/components/teacher/dashboard/QuickAction";
import RecentActivity from "@/components/teacher/dashboard/RecentActivity";
import TestPerformanceChart from "@/components/teacher/dashboard/TestPerformanceChart";
import UpcomingTests from "@/components/teacher/dashboard/UpcomingTests";
import TopStudents from "@/components/teacher/dashboard/TopStudents";
import MyClasses from "@/components/teacher/dashboard/MyClasses";



export default function TeacherDashboardPage() {
  return (
    <div style={{ display: "grid", gap: "1.5rem", padding: "0.5rem" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
            Welcome back, Professor! 👨‍🏫
          </h1>
          <p style={{ opacity: 0.9, fontSize: "1rem" }}>
            Here's an overview of your classes and student performance today.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      </div>

      {/* Stats Cards */}
      <Stats />

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="lg:grid-cols-3">
        {/* Left Column - Charts & Activity (2/3 width on desktop) */}
        <div style={{ display: "grid", gap: "1.5rem" }} className="lg:col-span-2">
          <TestPerformanceChart />
          <RecentActivity />
          <MyClasses />
        </div>

        {/* Right Column - Quick Actions & Widgets (1/3 width on desktop) */}
        <div style={{ display: "grid", gap: "1.5rem", alignContent: "start" }}>
          <QuickActions />
          <UpcomingTests />
          <TopStudents />
        </div>
      </div>
    </div>
  );
}
