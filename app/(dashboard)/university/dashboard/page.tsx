// app/dashboard/page.tsx

import Stats from "../dashboard/_components/Stats";
import QuickActions from "../dashboard/_components/QuickActions";
import RecentTable from "../dashboard/_components/RecentTable";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-4">
      <Stats />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 min-h-[280px]">
          <h4 className="font-bold">Enrollment Trend</h4>
          <p className="text-muted mt-1">Monthly enrollment growth</p>
          <div
            className="theme-surface mt-3 h-[200px] border border-dashed rounded grid place-items-center"
          >
            <span className="text-muted">Chart placeholder</span>
          </div>
        </Card>

        <QuickActions />
      </section>

      <RecentTable />
    </div>
  );
}
