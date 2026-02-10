import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const examples = [
  { title: "New Release Movie", original: "$5.99", discounted70: "$4.19", discounted80: "$4.79" },
  { title: "Latest TV Episode", original: "$3.99", discounted70: "$2.79", discounted80: "$3.19" },
  { title: "Premium 4K Movie", original: "$19.99", discounted70: "$13.99", discounted80: "$15.99" },
];

const SavingsSection = () => {
  return (
    <section className="py-24 px-4" id="savings">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Your <span className="text-gradient-gold">Savings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            See how much you save on every rental. The more you rent, the more you save.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 group"
            >
              <h3 className="font-display text-lg font-semibold mb-4">{item.title}</h3>

              {/* Original price */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-muted-foreground text-sm">Original Price</span>
                <span className="text-muted-foreground line-through">{item.original}</span>
              </div>

              {/* Discounted prices */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">At 70%</span>
                  </div>
                  <span className="text-primary font-bold text-lg">{item.discounted70}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">At 80%</span>
                  </div>
                  <span className="text-primary font-bold text-lg">{item.discounted80}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  <span>You save up to 30%</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;
