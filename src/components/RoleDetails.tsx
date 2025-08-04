import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoleDetails = () => {
  const roles = [
    {
      letter: "A",
      name: "Agents",
      subtitle: "The Creators of Facts",
      description: "The 'doers' who take direct action to move projects toward desired outcomes. Developers, designers, marketers, salespeople—anyone whose work directly impacts the probability of success.",
      mechanism: "They internalize the upside of their labor by buying 'YES' shares before (or during) their contribution. Their work is an investment to increase the value of their shares.",
      replaces: "Responsible (in RASCI)",
      color: "bg-blue-500"
    },
    {
      letter: "R", 
      name: "Researchers",
      subtitle: "The Curators of Insight",
      description: "Analysts and speculators who don't act on the outcome directly—they act on the information surrounding the outcome. They aggregate data, analyze progress, and assess market sentiment.",
      mechanism: "They profit by identifying and correcting mispriced probabilities in the market. Their activity makes the market's price a more accurate signal of true likelihood of success.",
      replaces: "Consulted (in RASCI)",
      color: "bg-green-500"
    },
    {
      letter: "L",
      name: "Liquidity Providers", 
      subtitle: "The Enablers of Capital Flow",
      description: "They provide necessary depth for the market to function efficiently. This includes both financial LPs (deploying capital for trading fees) and social LPs (staking social capital through distribution).",
      mechanism: "Financial LPs earn trading fees from market activity. Social LPs leverage their audience and reputation to bring attention and resources to projects.",
      replaces: "Net-new infrastructure role",
      color: "bg-purple-500"
    },
    {
      letter: "O",
      name: "Oracles",
      subtitle: "The Verifiers of Truth", 
      description: "Objective arbiters who determine if pre-defined outcomes were met. Their authority comes from their reputation and consistent accuracy.",
      mechanism: "A consistently accurate Oracle builds compounding social/reputational capital, making them more likely to be chosen and paid for future markets.",
      replaces: "Quality Assurance + Accountable sign-off",
      color: "bg-orange-500"
    },
    {
      letter: "S",
      name: "Sponsors",
      subtitle: "The Initiators of Intent",
      description: "The entity (person, company, DAO) that has a problem to solve. They define the 'what' and the 'why' of the desired outcome.",
      mechanism: "They provide the initial scope and seed capital for the reward pool that gives outcome shares their value. Their ROI is the achievement of the outcome itself.",
      replaces: "Accountable (in RASCI)",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The ARLOS Framework</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five distinct roles that enable outcome-driven coordination through prediction markets
          </p>
        </div>

        <div className="space-y-8">
          {roles.map((role, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center text-white text-2xl font-bold`}>
                      {role.letter}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{role.name}</CardTitle>
                    <p className="text-lg text-arlos-blue font-semibold mb-2">{role.subtitle}</p>
                    <Badge variant="outline" className="text-xs">
                      Replaces: {role.replaces}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-20">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Function</h4>
                    <p className="text-foreground">{role.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Mechanism</h4>
                    <p className="text-foreground">{role.mechanism}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Organization?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              ARLOS represents a fundamental shift from process-based to incentive-based coordination. 
              It's time to move beyond traditional hierarchies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleDetails;