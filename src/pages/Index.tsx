import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SavingsSection from "@/components/SavingsSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <SavingsSection />
      <AvailabilitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
