import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import NetworkDemo from "@/components/NetworkDemo";
import RoleDetails from "@/components/RoleDetails";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Metrics />
      <HowItWorks />
      <Comparison />
      <NetworkDemo />
      <RoleDetails />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
