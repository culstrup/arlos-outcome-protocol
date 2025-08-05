import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-arlos-blue/20 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold gradient-text animate-pulse-glow">
              ARLOS
            </div>
            <div className="text-lg text-arlos-blue hidden sm:block font-semibold">
              .pro
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#framework" className="text-muted-foreground hover:text-arlos-blue transition-all duration-300 hover:scale-105 font-medium text-lg">
              Framework
            </a>
            <a href="#comparison" className="text-muted-foreground hover:text-arlos-blue transition-all duration-300 hover:scale-105 font-medium text-lg">
              Comparison
            </a>
            <a href="#roles" className="text-muted-foreground hover:text-arlos-blue transition-all duration-300 hover:scale-105 font-medium text-lg">
              Roles
            </a>
          </nav>
          
          <Button
            asChild
            variant="arlos-outline"
            size="lg"
            className="hover-lift text-lg px-6 py-3"
          >
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;