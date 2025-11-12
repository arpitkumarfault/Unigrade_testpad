import Hero from "@/components/marketing/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import KeyFeatures from "@/components/marketing/KeyFeature";
import HowItWorks from "@/components//marketing/HowItWorking";
import Stats from "@/components/marketing/Stats";
import PricingPreview from "@/components/marketing/PricingPreview";
import Testimonials from "@/components/marketing/Testimonials";
import '././../../components/Theme/styles/theme.css'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">


      <Hero />
      <TrustBar />
      <KeyFeatures />
      <HowItWorks />
      <Stats />
      <PricingPreview />
      <Testimonials />
    </main>
  );
}
