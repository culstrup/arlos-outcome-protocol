import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-arlos-gradient bg-clip-text text-transparent">
              ARLOS
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              .pro
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#framework" className="text-muted-foreground hover:text-foreground transition-colors">
              Framework
            </a>
            <a href="#comparison" className="text-muted-foreground hover:text-foreground transition-colors">
              Comparison
            </a>
            <a href="#roles" className="text-muted-foreground hover:text-foreground transition-colors">
              Roles
            </a>
          </nav>
          
          <Button variant="arlos-outline" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;