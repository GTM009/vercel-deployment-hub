import { Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-gold flex items-center justify-center">
            <Film className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-sm">RentSave</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} RentSave. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
