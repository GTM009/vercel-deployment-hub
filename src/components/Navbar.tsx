import { Film } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">
            BoltRentalServices
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            How It Works
          </a>
          <a href="#savings" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Savings
          </a>
          <a href="#availability" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Availability
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
