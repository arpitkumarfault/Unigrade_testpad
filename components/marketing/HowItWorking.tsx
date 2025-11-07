import '../Theme/styles/theme.css'



const steps = [
  { title: "Register Your University", items: ["Get code", "Setup profile", "Add departments & courses"] },
  { title: "Onboard Teachers & Students", items: ["Share code", "Teachers create tests", "Students register"] },
  { title: "Conduct & Monitor Exams", items: ["Schedule", "Live monitoring", "Auto‑grading & analytics"] },
];

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-20 bg-(--color-surface)/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-(--color-text-muted)">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--color-primary)" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
