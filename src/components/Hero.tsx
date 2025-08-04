import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-arlos-gradient-subtle" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-7xl md:text-9xl font-bold bg-arlos-gradient bg-clip-text text-transparent mb-8 animate-pulse-glow">
            ARLOS
          </h1>
          <p className="text-2xl md:text-3xl text-foreground mb-6 font-semibold">
            The Future of Outcome-Driven Work
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Replace traditional corporate hierarchies with prediction markets. 
            Coordinate work through economic incentives, not meetings.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up">
          <Button variant="arlos" size="lg" className="text-xl px-12 py-8 hover-lift shadow-soft">
            Learn the Framework
          </Button>
          <Button variant="arlos-outline" size="lg" className="text-xl px-12 py-8 hover-lift">
            See the Comparison
          </Button>
        </div>
        
        {/* ARLOS acronym breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            { letter: "A", role: "Agents", desc: "Create facts through action", delay: "0s" },
            { letter: "R", role: "Researchers", desc: "Curate and analyze information", delay: "0.1s" },
            { letter: "L", role: "Liquidity Providers", desc: "Enable capital and attention flow", delay: "0.2s" },
            { letter: "O", role: "Oracles", desc: "Verify outcomes objectively", delay: "0.3s" },
            { letter: "S", role: "Sponsors", desc: "Initiate and fund outcomes", delay: "0.4s" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="group animate-fade-in-up hover-lift"
              style={{ animationDelay: item.delay }}
            >
              <div className="glass-effect rounded-xl p-8 h-full shadow-card group-hover:shadow-elegant transition-all duration-500 group-hover:border-arlos-blue/30">
                <div className="text-4xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.letter}
                </div>
                <div className="font-bold text-foreground mb-3 text-lg">{item.role}</div>
                <div className="text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-arlos-blue/30 blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-arlos-purple/30 blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-arlos-accent/20 blur-xl animate-float" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-arlos-blue/20 blur-xl animate-float" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;