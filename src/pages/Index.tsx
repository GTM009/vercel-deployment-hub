import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SavingsSection from "@/components/SavingsSection";
import SavingsCalculator from "@/components/SavingsCalculator";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <SavingsSection />
      <SavingsCalculator />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
