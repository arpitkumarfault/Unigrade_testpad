import { Card } from "@/components/ui/card";

export default function QuickActions() {
  return (
    <Card>
      <h4 style={{ fontWeight: 700 }}>Quick Actions</h4>
      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        <button className="btn btn-primary">Create Exam</button>
        <button className="btn btn-secondary">Add Course</button>
        <button className="btn btn-tertiary">Invite Faculty</button>
      </div>
    </Card>
  );
}
