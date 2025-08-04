import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-arlos-gradient-subtle" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-arlos-gradient bg-clip-text text-transparent mb-6">
            ARLOS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            The Future of Outcome-Driven Work
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Replace traditional corporate hierarchies with prediction markets. 
            Coordinate work through economic incentives, not meetings.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="arlos" size="lg" className="text-lg px-8 py-6">
            Learn the Framework
          </Button>
          <Button variant="arlos-outline" size="lg" className="text-lg px-8 py-6">
            See the Comparison
          </Button>
        </div>
        
        {/* ARLOS acronym breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {[
            { letter: "A", role: "Agents", desc: "Create facts through action" },
            { letter: "R", role: "Researchers", desc: "Curate and analyze information" },
            { letter: "L", role: "Liquidity Providers", desc: "Enable capital and attention flow" },
            { letter: "O", role: "Oracles", desc: "Verify outcomes objectively" },
            { letter: "S", role: "Sponsors", desc: "Initiate and fund outcomes" }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 h-full hover:shadow-elegant transition-all duration-300 group-hover:scale-105">
                <div className="text-3xl font-bold text-arlos-blue mb-2">{item.letter}</div>
                <div className="font-semibold text-foreground mb-2">{item.role}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-arlos-blue/20 blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-arlos-purple/20 blur-xl" />
    </section>
  );
};

export default Hero;