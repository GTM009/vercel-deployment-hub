import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, DollarSign, Crown, Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 83.5 },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", rate: 3.67 },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", rate: 3.75 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.53 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 149.5 },
  { code: "KRW", name: "South Korean Won", symbol: "₩", rate: 1320 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", rate: 4.97 },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$", rate: 17.15 },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", rate: 30.2 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1550 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.5 },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", rate: 278 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", rate: 110 },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", rate: 30.9 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", rate: 56 },
  { code: "THB", name: "Thai Baht", symbol: "฿", rate: 35.5 },
];

const SavingsCalculator = () => {
  const [price, setPrice] = useState("5.99");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [spinAngle, setSpinAngle] = useState(0);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencies;
    const q = searchQuery.toLowerCase();
    return currencies.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const priceNum = parseFloat(price) || 0;
  const price70 = priceNum * 0.7;
  const price80 = priceNum * 0.8;
  const savings70 = priceNum - price70;
  const savings80 = priceNum - price80;

  const toLocal = (usd: number) => usd * selectedCurrency.rate;

  const formatUSD = (val: number) => `$${val.toFixed(2)}`;
  const formatLocal = (val: number) =>
    selectedCurrency.code === "USD"
      ? null
      : `${selectedCurrency.symbol}${val.toFixed(2)}`;

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    setSearchQuery("");
    setSpinAngle((prev) => prev + 360);
  };

  return (
    <section className="py-24 px-4" id="calculator">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Savings <span className="text-gradient-gold">Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter any rental price and see exactly how much you save — in your currency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-[80px]" />

          {/* Price input + currency selector row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
            {/* Price input */}
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Original Price (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-10 h-14 text-lg bg-secondary border-border rounded-xl font-semibold"
                  placeholder="Enter price..."
                />
              </div>
            </div>

            {/* Currency selector */}
            <div className="sm:w-56">
              <label className="text-sm text-muted-foreground mb-2 block">Your Currency</label>
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full h-14 justify-between rounded-xl bg-secondary border-border text-base font-semibold"
                >
                  <div className="flex items-center gap-2">
                    {/* Crown rotator */}
                    <motion.div
                      animate={{ rotate: spinAngle }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Crown className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span>{selectedCurrency.symbol} {selectedCurrency.code}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </Button>

                {/* Currency popup */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 right-0 z-50 bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                      {/* Search */}
                      <div className="p-3 border-b border-border">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search currency..."
                            className="pl-9 h-10 bg-secondary border-border rounded-lg text-sm"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Currency list */}
                      <div className="max-h-64 overflow-y-auto">
                        {filteredCurrencies.length === 0 ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">No currencies found</div>
                        ) : (
                          filteredCurrencies.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => handleCurrencySelect(currency)}
                              className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-secondary/80 transition-colors ${
                                selectedCurrency.code === currency.code ? "bg-primary/10 text-primary" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 text-center font-semibold text-base">{currency.symbol}</span>
                                <div className="text-left">
                                  <span className="font-medium">{currency.code}</span>
                                  <span className="text-muted-foreground ml-2">{currency.name}</span>
                                </div>
                              </div>
                              {selectedCurrency.code === currency.code && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid sm:grid-cols-2 gap-5 relative z-10">
            {/* 70% tier */}
            <div className="bg-secondary/50 border border-border rounded-2xl p-6 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-lg">At 70%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">You Pay</span>
                  <span className="text-primary font-bold text-2xl">{formatUSD(price70)}</span>
                </div>
                {formatLocal(toLocal(price70)) && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">In {selectedCurrency.code}</span>
                    <span className="text-primary/80 font-semibold text-lg">{formatLocal(toLocal(price70))}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border/50 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">You Save</span>
                    <div className="flex items-center gap-1 text-success font-bold">
                      <ArrowRight className="w-3 h-3" />
                      <span>{formatUSD(savings70)}</span>
                      {formatLocal(toLocal(savings70)) && (
                        <span className="text-success/70 text-sm ml-1">({formatLocal(toLocal(savings70))})</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 80% tier */}
            <div className="bg-secondary/50 border border-border rounded-2xl p-6 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-lg">At 80%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">You Pay</span>
                  <span className="text-primary font-bold text-2xl">{formatUSD(price80)}</span>
                </div>
                {formatLocal(toLocal(price80)) && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">In {selectedCurrency.code}</span>
                    <span className="text-primary/80 font-semibold text-lg">{formatLocal(toLocal(price80))}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border/50 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">You Save</span>
                    <div className="flex items-center gap-1 text-success font-bold">
                      <ArrowRight className="w-3 h-3" />
                      <span>{formatUSD(savings80)}</span>
                      {formatLocal(toLocal(savings80)) && (
                        <span className="text-success/70 text-sm ml-1">({formatLocal(toLocal(savings80))})</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-muted-foreground mt-6 relative z-10">
            Exchange rates are approximate • Final price confirmed at checkout
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
