import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import WhySection from "../components/landing/WhySection";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import Manifesto from "../components/landing/Manifesto";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhySection />
      <HowItWorks />
      <Features />
      {/* <DashboardPreview /> */}
      <Manifesto />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}