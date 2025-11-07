import '../Theme/styles/theme.css'

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">What Educators Say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <figure className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <blockquote className="text-base leading-relaxed">
              “TestPad transformed our examination process. We now conduct 100+ tests per semester seamlessly.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-[var(--color-text-muted)]">
              — Dr. Rajesh Kumar, HOD Computer Science, ABC University
            </figcaption>
          </figure>
          <figure className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <blockquote className="text-base leading-relaxed">
              “The anti‑cheating features and live monitoring give us complete confidence in online assessments.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-[var(--color-text-muted)]">
              — Prof. Sarah Williams, Dean, XYZ College
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
