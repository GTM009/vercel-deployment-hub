import { motion } from "framer-motion";
import { Play, Tv, Film, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gold" />
            <span className="text-sm text-muted-foreground">Save up to 30% on every rental</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
            Rent Movies &{" "}
            <span className="text-gradient-gold">Shows</span>
            <br />
            For Less
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Get the latest movies and TV shows on Amazon, Prime Video, Google Play & iTunes — 
            at <span className="text-primary font-semibold">70–80%</span> of the original price.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl" asChild>
              <a href="https://t.me/BoltRentalServices" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 mr-1" />
                Get Started
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 py-6 rounded-xl" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Platform icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-8 sm:gap-12"
          >
            {[
              { icon: Tv, label: "Amazon" },
              { icon: Film, label: "Prime Video" },
              { icon: Play, label: "Google Play" },
              { icon: Music, label: "iTunes" },
            ].map((platform) => (
              <div key={platform.label} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:glow-gold transition-all duration-300">
                  <platform.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{platform.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
