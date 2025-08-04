const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-arlos-gradient bg-clip-text text-transparent mb-4">
              ARLOS
            </div>
            <p className="text-muted-foreground max-w-md">
              The future of outcome-driven work. Replace traditional corporate hierarchies 
              with prediction markets and economic incentives.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Framework</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#agents" className="hover:text-foreground transition-colors">Agents</a></li>
              <li><a href="#researchers" className="hover:text-foreground transition-colors">Researchers</a></li>
              <li><a href="#liquidity" className="hover:text-foreground transition-colors">Liquidity Providers</a></li>
              <li><a href="#oracles" className="hover:text-foreground transition-colors">Oracles</a></li>
              <li><a href="#sponsors" className="hover:text-foreground transition-colors">Sponsors</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#whitepaper" className="hover:text-foreground transition-colors">Whitepaper</a></li>
              <li><a href="#case-studies" className="hover:text-foreground transition-colors">Case Studies</a></li>
              <li><a href="#comparison" className="hover:text-foreground transition-colors">RASCI vs ARLOS</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ARLOS.pro. The future of work is outcome-driven.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;