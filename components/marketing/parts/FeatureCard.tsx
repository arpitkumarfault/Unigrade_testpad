export function FeatureCard({
  title,
  lines,
  footer,
}: {
  title: string;
  lines: string[];
  footer: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
        {lines.map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            {l}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">{footer}</p>
    </div>
  );
}
