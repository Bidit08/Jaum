import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CarShowcase from "@/components/CarShowcase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CarShowcase />
      <Footer />
    </div>
  );
}
