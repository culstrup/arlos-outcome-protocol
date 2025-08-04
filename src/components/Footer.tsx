const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-muted/80 to-background border-t border-arlos-blue/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-4xl font-bold gradient-text mb-6">
              ARLOS
            </div>
            <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
              The future of outcome-driven work. Replace traditional corporate hierarchies 
              with prediction markets and economic incentives.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg gradient-text">Framework</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#agents" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Agents</a></li>
              <li><a href="#researchers" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Researchers</a></li>
              <li><a href="#liquidity" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Liquidity Providers</a></li>
              <li><a href="#oracles" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Oracles</a></li>
              <li><a href="#sponsors" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Sponsors</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg gradient-text">Resources</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#whitepaper" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Whitepaper</a></li>
              <li><a href="#case-studies" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">Case Studies</a></li>
              <li><a href="#comparison" className="hover:text-arlos-blue transition-colors duration-300 hover:scale-105 inline-block">RASCI vs ARLOS</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-arlos-blue/20 mt-12 pt-8 text-center text-muted-foreground">
          <p className="text-lg">&copy; 2025 ARLOS.pro. The future of work is outcome-driven.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;