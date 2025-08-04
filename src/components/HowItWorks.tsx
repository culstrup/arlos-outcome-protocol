import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, DollarSign, BarChart3, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Define Outcome",
      description: "Sponsors create a market for a specific, verifiable outcome with clear success criteria and reward pool.",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02", 
      title: "Market Formation",
      description: "Agents, Researchers, and Liquidity Providers buy YES/NO shares based on their confidence in outcome achievement.",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "Coordinated Action",
      description: "Market prices signal probability of success. Participants self-organize based on economic incentives rather than hierarchy.",
      icon: ArrowRight,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      number: "04",
      title: "Oracle Verification", 
      description: "Independent Oracles verify outcome achievement. Winners are paid from the reward pool proportional to their shares.",
      icon: CheckCircle,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="framework" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 gradient-text">How ARLOS Works</h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From traditional hierarchy to market-driven coordination in four steps
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-arlos-blue via-arlos-purple to-arlos-blue transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="hover-lift glass-effect animate-fade-in-up shadow-card hover:shadow-elegant group text-center h-full"
                      style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-8">
                    {/* Step number */}
                    <div className="text-6xl font-black text-muted-foreground/20 mb-4">{step.number}</div>
                    
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                        <step.icon size={40} className="text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-arlos-blue transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-arlos-gradient flex items-center justify-center animate-float">
                      <ArrowRight size={16} className="text-white" strokeWidth={2} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;