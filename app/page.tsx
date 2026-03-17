import Navbar from "@/components/Navbar";
import HeroCanvasAnimation from "@/components/HeroCanvasAnimation";
import PillarsSection from "@/components/PillarsSection";
import ConnectSection from "@/components/ConnectSection";
import ServiceProSection from "@/components/ServiceProSection";
import SchemicAISection from "@/components/SchemicAISection";
import GlobalNetwork from "@/components/GlobalNetwork";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroCanvasAnimation />
      <PillarsSection />
      <ConnectSection />
      <ServiceProSection />
      <SchemicAISection />
      <GlobalNetwork />
      <ContactSection />
      <FinalCTA />
    </main>
  );
}
