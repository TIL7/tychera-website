import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThreePillars from "@/components/ThreePillars";
import PrincipalVision from "@/components/PrincipalVision";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ThreePillars />
        <PrincipalVision />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
