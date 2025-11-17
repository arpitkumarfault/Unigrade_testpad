// app/dashboard/page.tsx
import Stats from "@/components/university/dashboard/Stats";
import QuickActions from "@/components/university/dashboard/QuickActions";
import RecentActivity from "@/components/university/dashboard/RecentActivity";
import EnrollmentChart from "@/components/university/dashboard/EnrollementChart";
import UpcomingEvents from "@/components/university/dashboard/UpdomingEvent";
import TopPerformers from "@/components/university/dashboard/TopPerformers";

export default function DashboardPage() {
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
            Welcome back, Admin! 👋
          </h1>
          <p style={{ opacity: 0.9, fontSize: "1rem" }}>
            Here's what's happening with your university today.
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
        {/* Left Column - Charts (2/3 width on desktop) */}
        <div style={{ display: "grid", gap: "1.5rem" }} className="lg:col-span-2">
          <EnrollmentChart />
          <RecentActivity />
        </div>

        {/* Right Column - Quick Actions & Events (1/3 width on desktop) */}
        <div style={{ display: "grid", gap: "1.5rem", alignContent: "start" }}>
          <QuickActions />
          <UpcomingEvents />
          <TopPerformers />
        </div>
      </div>
    </div>
  );
}
