import { motion } from "framer-motion";
import { MessageCircle, CreditCard, Download } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Tell Us What You Want",
    description: "Send us the title of the movie or show you want to rent and which platform you prefer.",
  },
  {
    icon: CreditCard,
    title: "Pay the Discounted Price",
    description: "You pay only 70–80% of the original rental price. No hidden fees, no subscriptions.",
  },
  {
    icon: Download,
    title: "Enjoy Your Rental",
    description: "We process your rental and you get access on your chosen platform within minutes.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to start saving on your digital rentals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/40 transition-all duration-300 hover:glow-gold">
                {/* Step number */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>

                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
