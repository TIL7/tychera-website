import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThreePillars from "@/components/ThreePillars";
import PrincipalVision from "@/components/PrincipalVision";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ThreePillars />
        <PrincipalVision />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
