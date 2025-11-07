import '../Theme/styles/theme.css'

const stats = [
  { label: "Universities", value: "500+" },
  { label: "Tests Taken", value: "100K+" },
  { label: "Active Users", value: "50K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "User Rating", value: "4.8/5" },
  { label: "Support", value: "24/7" },
];

export default function Stats() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">TestPad by Numbers</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
              <div className="text-3xl font-semibold">{s.value}</div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
