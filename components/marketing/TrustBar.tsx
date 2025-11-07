import Image from "next/image";
import '../Theme/styles/theme.css'

export default function TrustBar() {
  return (
    <section className="border-t border-b border-(--color-border) bg-(--color-surface)/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-(--color-text-muted)">
          <span>✅ 500+ Universities Trust</span>
          <span>✅ 100,000+ Tests Conducted</span>
          <span>✅ 99.9% Uptime Guaranteed</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-80">
          <Image src="/images/university1.png" alt="University 1 logo" width={96} height={32} />
          <Image src="/images/university2.png" alt="University 2 logo" width={96} height={32} />
          <Image src="/images/university3.png" alt="University 3 logo" width={96} height={32} />
        </div>
      </div>
    </section>
  );
}
