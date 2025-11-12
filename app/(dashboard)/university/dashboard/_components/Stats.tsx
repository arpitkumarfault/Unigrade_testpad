import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Stats() {
  return (
    <section
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      <Card>
        <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Total Students</p>
        <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>12,438</h3>
        <Badge tone="success">+3.2% MoM</Badge>
      </Card>

      <Card>
        <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Active Courses</p>
        <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>356</h3>
        <Badge tone="primary">On track</Badge>
      </Card>

      <Card>
        <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Exams Scheduled</p>
        <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>42</h3>
        <Progress value={64} />
        <p style={{ marginTop: 6, fontSize: 12, color: "var(--color-text-muted)" }}>64% of term complete</p>
      </Card>

      <Card>
        <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Pending Approvals</p>
        <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>18</h3>
        <Badge tone="warning">Review needed</Badge>
      </Card>
    </section>
  );
}
