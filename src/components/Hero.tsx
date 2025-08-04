import { Button } from "@/components/ui/button";
import { Activity, Search, TrendingUp, Eye, Rocket } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Clean geometric background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--arlos-blue)/0.1),transparent_50%),radial-gradient(circle_at_80%_80%,hsl(var(--arlos-purple)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,hsl(var(--arlos-blue)/0.05)_50%,transparent_100%)]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-16 animate-fade-in-up">
          <h1 className="text-8xl md:text-[12rem] font-black gradient-text mb-8 tracking-tight">
            ARLOS
          </h1>
          <p className="text-3xl md:text-4xl text-foreground mb-8 font-light tracking-wide">
            The Future of Outcome-Driven Work
          </p>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
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
        
        {/* ARLOS acronym breakdown with icons */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            { letter: "A", role: "Agents", desc: "Create facts through action", delay: "0s", icon: Activity, color: "text-blue-500" },
            { letter: "R", role: "Researchers", desc: "Curate and analyze information", delay: "0.1s", icon: Search, color: "text-emerald-500" },
            { letter: "L", role: "Liquidity Providers", desc: "Enable capital and attention flow", delay: "0.2s", icon: TrendingUp, color: "text-purple-500" },
            { letter: "O", role: "Oracles", desc: "Verify outcomes objectively", delay: "0.3s", icon: Eye, color: "text-orange-500" },
            { letter: "S", role: "Sponsors", desc: "Initiate and fund outcomes", delay: "0.4s", icon: Rocket, color: "text-pink-500" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="group animate-fade-in-up hover-lift"
              style={{ animationDelay: item.delay }}
            >
              <div className="glass-effect rounded-xl p-8 h-full shadow-card group-hover:shadow-elegant transition-all duration-500 group-hover:border-arlos-blue/30">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <item.icon size={48} className={`${item.color} group-hover:text-arlos-blue transition-colors duration-300`} strokeWidth={1.5} />
                </div>
                <div className="font-bold text-foreground mb-3 text-xl">{item.role}</div>
                <div className="text-muted-foreground leading-relaxed">{item.desc}</div>
                <div className="mt-4 text-sm font-bold gradient-text">{item.letter}</div>
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