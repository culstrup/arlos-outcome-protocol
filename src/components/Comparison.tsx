import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import comparisonVisual from "@/assets/comparison-visual.jpg";

const Comparison = () => {
  const rasciFeatures = [
    { label: "Core Unit", value: "Individual's assigned role" },
    { label: "Coordination", value: "Hierarchy, meetings, process docs" },
    { label: "Permission", value: "Must be hired and assigned" },
    { label: "Compensation", value: "Salary/bonus, often decoupled" },
    { label: "Information", value: "Hoarded, top-down flow" },
    { label: "Risk", value: "Concentrated on 'Accountable' person" },
    { label: "Flexibility", value: "Rigid, requires meetings to change" }
  ];

  const arlosFeatures = [
    { label: "Core Unit", value: "Outcome shares (YES/NO tokens)" },
    { label: "Coordination", value: "Market prices & economic incentives" },
    { label: "Permission", value: "Permissionless participation" },
    { label: "Compensation", value: "Direct P&L on outcome shares" },
    { label: "Information", value: "Transparently priced into market" },
    { label: "Risk", value: "Distributed among all shareholders" },
    { label: "Flexibility", value: "Dynamic, real-time role switching" }
  ];

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 gradient-text">RASCI vs ARLOS</h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Traditional project management relies on process and hierarchy. 
            ARLOS coordinates through market incentives and economic alignment.
          </p>
        </div>
        
        {/* Visual comparison image */}
        <div className="mb-16 animate-slide-up">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-4xl mx-auto">
            <img 
              src={comparisonVisual} 
              alt="RASCI vs ARLOS Comparison"
              className="w-full h-auto opacity-80"
            />
            <div className="absolute inset-0 bg-arlos-gradient-subtle"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* RASCI Column */}
          <Card className="relative hover-lift animate-fade-in-up glass-effect">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-3xl font-bold">RASCI Model</CardTitle>
                <Badge variant="outline" className="text-red-600 border-red-600 px-4 py-2">Traditional</Badge>
              </div>
              <p className="text-muted-foreground text-lg">
                Responsible, Accountable, Consulted, Informed
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {rasciFeatures.map((feature, index) => (
                <div key={index} className="border-l-4 border-red-500/30 pl-6 py-3 hover:border-red-500/60 transition-colors duration-300">
                  <div className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-1">{feature.label}</div>
                  <div className="text-foreground text-lg">{feature.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ARLOS Column */}
          <Card className="relative border-arlos-blue/50 shadow-elegant hover-lift animate-fade-in-up glass-effect" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-3xl font-bold gradient-text">ARLOS Model</CardTitle>
                <Badge className="bg-arlos-gradient text-white px-4 py-2 shadow-glow">Revolutionary</Badge>
              </div>
              <p className="text-muted-foreground text-lg">
                Agents, Researchers, Liquidity Providers, Oracles, Sponsors
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {arlosFeatures.map((feature, index) => (
                <div key={index} className="border-l-4 border-arlos-blue pl-6 py-3 hover:border-arlos-purple transition-colors duration-300">
                  <div className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-1">{feature.label}</div>
                  <div className="text-foreground text-lg">{feature.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Key insight */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-effect rounded-2xl p-12 max-w-5xl mx-auto shadow-elegant hover-lift">
            <h3 className="text-4xl font-bold mb-8 gradient-text">The Paradigm Shift</h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              ARLOS replaces the costly overhead of corporate structure and management 
              with decentralized coordination and information aggregation through financial markets. 
              It creates temporary, purpose-driven "flash organizations" that form to achieve 
              specific, verifiable goals and then dissolve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;