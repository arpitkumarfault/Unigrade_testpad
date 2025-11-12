import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rows = [
  { name: "Ananya Rao", program: "B.Tech CSE", sem: "V", status: "Verified", id: "U-2025-10453", tone: "success" as const },
  { name: "Rohit Verma", program: "MBA", sem: "III", status: "Pending", id: "U-2025-10454", tone: "warning" as const },
  { name: "Sara Khan", program: "B.Sc Physics", sem: "I", status: "Hold", id: "U-2025-10455", tone: "danger" as const },
];

export default function RecentTable() {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ fontWeight: 700 }}>Recent Registrations</h4>
        <button className="btn btn-secondary">View all</button>
      </div>
      <div style={{ overflowX: "auto", marginTop: 8 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Program</th>
              <th>Semester</th>
              <th>Status</th>
              <th align="right">ID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.program}</td>
                <td>{s.sem}</td>
                <td><Badge tone={s.tone}>{s.status}</Badge></td>
                <td align="right">{s.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
