import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4" id="contact">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />

          <div className="relative bg-card/80 border border-border rounded-3xl p-10 sm:p-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Quick Response</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient-gold">Save?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Drop us a message with the movie or show you want, and we'll get you the best deal within minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl">
                <MessageCircle className="w-5 h-5 mr-1" />
                Contact Us Now
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">No subscriptions • No hidden fees • Pay per rental</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
