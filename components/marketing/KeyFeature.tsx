import { FeatureCard } from "./parts/FeatureCard";
import '../Theme/styles/theme.css'

const features = [
  { title: "For Students", lines: ["Take Tests", "View Results", "Download Reports"], footer: "Timer, progress tracking, instant results" },
  { title: "For Teachers", lines: ["Create Exams", "Auto‑grade", "Track Progress"], footer: "MCQ, descriptive, and coding" },
  { title: "For Universities", lines: ["Manage Platform", "Analytics", "Reports"], footer: "Control with advanced analytics" },
  { title: "Secure & Reliable", lines: ["Anti‑cheat", "Auto‑save", "Cloud Backup"], footer: "Bank‑grade security, secure browser" },
];

export default function KeyFeatures() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
