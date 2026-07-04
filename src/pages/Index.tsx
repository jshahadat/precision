import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CalculatorSection from "@/components/CalculatorSection";
import LayoutPlannerSection from "@/components/LayoutPlannerSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CalculatorSection />
      <LayoutPlannerSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
