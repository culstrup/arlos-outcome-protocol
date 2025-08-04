import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does ARLOS handle complex projects with multiple dependencies?",
      answer: "ARLOS creates interconnected markets for dependent outcomes. If Project A depends on Project B, the market for A will price in the probability of B's success. This creates natural coordination between teams without requiring explicit project management oversight."
    },
    {
      question: "What prevents market manipulation or gaming of the system?",
      answer: "Several mechanisms prevent manipulation: (1) Oracle verification ensures outcomes are objectively measured, (2) Skin-in-the-game means manipulators lose money if they're wrong, (3) Multiple participants create market depth that's hard to manipulate, (4) Reputation systems track Oracle accuracy over time."
    },
    {
      question: "How do we transition from our current RASCI-based structure?",
      answer: "Start with pilot projects: choose non-critical outcomes with clear success metrics. Run ARLOS alongside existing processes initially. As teams see the efficiency gains, gradually expand to larger projects. The transition can be incremental and reversible."
    },
    {
      question: "What happens to traditional management roles in ARLOS?",
      answer: "Traditional managers often become Sponsors (defining outcomes and providing funding) or Oracles (verifying results). The need for coordination-heavy middle management decreases, but strategic and verification roles remain crucial."
    },
    {
      question: "How are participants compensated in ARLOS markets?",
      answer: "Compensation comes from share appreciation when outcomes are achieved. Agents typically buy YES shares before contributing work. Researchers profit from correcting mispriced probabilities. Liquidity Providers earn trading fees. Oracles receive verification fees."
    },
    {
      question: "Can ARLOS work for long-term projects or just short sprints?",
      answer: "ARLOS works for both. Long-term projects can have milestone markets and final outcome markets. Interim markets provide feedback and course correction opportunities. The key is defining verifiable intermediate outcomes along the way."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Common questions about implementing ARLOS in your organization
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-effect rounded-xl px-6 border hover:shadow-card transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-arlos-blue transition-colors duration-300 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;