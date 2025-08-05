import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import networkVisual from "@/assets/network-visual.jpg";

const RoleDetails = () => {
  const roles = [
    {
      letter: "A",
      name: "Agents",
      subtitle: "The Creators of Facts",
      description: "The 'doers' who take direct action to move projects toward desired outcomes. Developers, designers, marketers, salespeople—anyone whose work directly impacts the probability of success.",
      mechanism: "They internalize the upside of their labor by buying 'YES' shares before (or during) their contribution. Their work is an investment to increase the value of their shares.",
      replaces: "Responsible (in RASCI)",
      color: "bg-arlos-gradient text-white"
    },
    {
      letter: "R", 
      name: "Researchers",
      subtitle: "The Curators of Insight",
      description: "Analysts and speculators who don't act on the outcome directly—they act on the information surrounding the outcome. They aggregate data, analyze progress, and assess market sentiment.",
      mechanism: "They profit by identifying and correcting mispriced probabilities in the market. Their activity makes the market's price a more accurate signal of true likelihood of success.",
      replaces: "Consulted (in RASCI)",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
    },
    {
      letter: "L",
      name: "Liquidity Providers", 
      subtitle: "The Enablers of Capital Flow",
      description: "They provide necessary depth for the market to function efficiently. This includes both financial LPs (deploying capital for trading fees) and social LPs (staking social capital through distribution).",
      mechanism: "Financial LPs earn trading fees from market activity. Social LPs leverage their audience and reputation to bring attention and resources to projects.",
      replaces: "Net-new infrastructure role",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
    },
    {
      letter: "O",
      name: "Oracles",
      subtitle: "The Verifiers of Truth", 
      description: "Objective arbiters who determine if pre-defined outcomes were met. Their authority comes from their reputation and consistent accuracy.",
      mechanism: "A consistently accurate Oracle builds compounding social/reputational capital, making them more likely to be chosen and paid for future markets.",
      replaces: "Quality Assurance + Accountable sign-off",
      color: "bg-gradient-to-br from-orange-500 to-red-500 text-white"
    },
    {
      letter: "S",
      name: "Sponsors",
      subtitle: "The Initiators of Intent",
      description: "The entity (person, company, DAO) that has a problem to solve. They define the 'what' and the 'why' of the desired outcome.",
      mechanism: "They provide the initial scope and seed capital for the reward pool that gives outcome shares their value. Their ROI is the achievement of the outcome itself.",
      replaces: "Accountable (in RASCI)",
      color: "bg-gradient-to-br from-pink-500 to-rose-600 text-white"
    }
  ];

  return (
    <section id="roles" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 gradient-text">The ARLOS Framework</h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Five distinct roles that enable outcome-driven coordination through prediction markets
          </p>
        </div>
        
        {/* Network visualization */}
        <div className="mb-20 animate-slide-up">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-5xl mx-auto">
            <img 
              src={networkVisual} 
              alt="ARLOS Network Visualization"
              className="w-full h-auto opacity-90"
            />
            <div className="absolute inset-0 bg-arlos-gradient-subtle"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass-effect rounded-xl p-8 max-w-2xl">
                <h3 className="text-3xl font-bold gradient-text mb-4">Interconnected Ecosystem</h3>
                <p className="text-muted-foreground text-lg">
                  Each role creates value through market participation, forming a self-reinforcing network of incentives
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {roles.map((role, index) => (
            <Card 
              key={index} 
              className="group hover-lift glass-effect animate-fade-in-up shadow-card hover:shadow-elegant border-2 hover:border-arlos-blue/30 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl ${role.color} flex items-center justify-center text-3xl font-bold shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      {role.letter}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-3 group-hover:text-arlos-blue transition-colors duration-300">{role.name}</CardTitle>
                    <p className="text-xl gradient-text font-bold mb-4">{role.subtitle}</p>
                    <Badge variant="outline" className="text-sm px-4 py-2 border-arlos-blue/50 text-arlos-blue">
                      Replaces: {role.replaces}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-26">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold mb-3 text-muted-foreground uppercase tracking-wider text-sm">Function</h4>
                    <p className="text-foreground text-lg leading-relaxed">{role.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold mb-3 text-muted-foreground uppercase tracking-wider text-sm">Mechanism</h4>
                    <p className="text-foreground text-lg leading-relaxed">{role.mechanism}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="glass-effect rounded-2xl p-12 shadow-elegant hover-lift max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-6 gradient-text">Ready to Transform Your Organization?</h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
              ARLOS represents a fundamental shift from process-based to incentive-based coordination. 
              It's time to move beyond traditional hierarchies.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                variant="arlos"
                size="lg"
                className="text-lg px-8 py-6 hover-lift"
              >
                <Link to="/contact">Start Your Transition</Link>
              </Button>
              <Button
                asChild
                variant="arlos-outline"
                size="lg"
                className="text-lg px-8 py-6 hover-lift"
              >
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleDetails;