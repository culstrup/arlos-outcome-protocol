import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Users, Target } from "lucide-react";

const Metrics = () => {
  const stats = [
    {
      icon: Clock,
      value: "85%",
      label: "Reduction in Meeting Time",
      description: "Eliminate coordination overhead through market signals"
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Faster Decision Making",
      description: "Real-time price discovery vs. committee consensus"
    },
    {
      icon: Users,
      value: "60%",
      label: "Higher Engagement",
      description: "Direct financial incentive alignment increases participation"
    },
    {
      icon: Target,
      value: "92%",
      label: "Outcome Achievement",
      description: "Clear, verifiable goals with skin-in-the-game motivation"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 gradient-text">The ARLOS Advantage</h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Measurable improvements over traditional project management approaches
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center hover-lift glass-effect animate-fade-in-up shadow-card hover:shadow-elegant group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-arlos-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={32} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-5xl font-black gradient-text mb-4">{stat.value}</div>
                <div className="font-bold text-xl text-foreground mb-3">{stat.label}</div>
                <div className="text-muted-foreground leading-relaxed">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;