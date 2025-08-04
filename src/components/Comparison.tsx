import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">RASCI vs ARLOS</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional project management relies on process and hierarchy. 
            ARLOS coordinates through market incentives and economic alignment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* RASCI Column */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">RASCI Model</CardTitle>
                <Badge variant="outline" className="text-red-600 border-red-600">Traditional</Badge>
              </div>
              <p className="text-muted-foreground">
                Responsible, Accountable, Consulted, Informed
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {rasciFeatures.map((feature, index) => (
                <div key={index} className="border-l-4 border-red-500/20 pl-4">
                  <div className="font-semibold text-sm text-muted-foreground">{feature.label}</div>
                  <div className="text-foreground">{feature.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ARLOS Column */}
          <Card className="relative border-arlos-blue/50 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl bg-arlos-gradient bg-clip-text text-transparent">ARLOS Model</CardTitle>
                <Badge className="bg-arlos-gradient text-white">Revolutionary</Badge>
              </div>
              <p className="text-muted-foreground">
                Agents, Researchers, Liquidity Providers, Oracles, Sponsors
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {arlosFeatures.map((feature, index) => (
                <div key={index} className="border-l-4 border-arlos-blue pl-4">
                  <div className="font-semibold text-sm text-muted-foreground">{feature.label}</div>
                  <div className="text-foreground">{feature.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Key insight */}
        <div className="mt-12 text-center">
          <div className="bg-arlos-gradient-subtle rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">The Paradigm Shift</h3>
            <p className="text-lg text-muted-foreground">
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