import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, ChevronDown, Delete, X, DollarSign, ArrowRightLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

// Full ISO 4217 currency list
const ALL_CURRENCIES: { code: string; name: string; symbol: string }[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "CLP", name: "Chilean Peso", symbol: "CL$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/." },
  { code: "COP", name: "Colombian Peso", symbol: "CO$" },
  { code: "ARS", name: "Argentine Peso", symbol: "AR$" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "ISK", name: "Icelandic Krona", symbol: "kr" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "KZT", name: "Kazakh Tenge", symbol: "₸" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "BD" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "XOF", name: "West African CFA", symbol: "CFA" },
  { code: "XAF", name: "Central African CFA", symbol: "FCFA" },
];

const KEYPAD_KEYS = ["1","2","3","4","5","6","7","8","9",".","0","⌫"];

function getCurrencyInfo(code: string) {
  return ALL_CURRENCIES.find(c => c.code === code) || { code, name: code, symbol: code };
}

function formatCurrency(value: number, code: string) {
  const info = getCurrencyInfo(code);
  return `${info.symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Currency picker popup (no rotating dial)
const CurrencyPicker = ({
  isOpen, onClose, onSelect, selected, label,
}: {
  isOpen: boolean; onClose: () => void; onSelect: (code: string) => void; selected: string; label: string;
}) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filtered = useMemo(() =>
    ALL_CURRENCIES.filter(
      c => c.code.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">{label}</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef} value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search currency..."
                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto px-2 pb-3">
            {filtered.map(c => (
              <button
                key={c.code}
                onClick={() => { onSelect(c.code); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  c.code === selected ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"
                }`}
              >
                <span className="text-lg w-8 text-center">{c.symbol}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm">{c.code}</span>
                  <span className="text-muted-foreground text-xs ml-2">{c.name}</span>
                </div>
                {c.code === selected && <span className="w-2 h-2 rounded-full bg-primary" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-6">No currencies found</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CurrencyCalculator = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("10.00");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState<"base" | "target" | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [sliderValue, setSliderValue] = useState(10);
  const [customInput, setCustomInput] = useState("10");

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleString());
    } catch {
      setError("Failed to load exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const numericAmount = parseFloat(amount) || 0;
  const targetRate = rates?.[targetCurrency] ?? 0;
  const convertedTarget = numericAmount * targetRate;
  const baseToUsdRate = baseCurrency === "USD" ? 1 : (rates?.["USD"] ?? 1);
  const convertedUSD = numericAmount * baseToUsdRate;

  const realSliderValue = parseFloat(customInput) || 0;
  const realSliderTarget = realSliderValue * targetRate;
  const realSliderUSD = realSliderValue * baseToUsdRate;
  const real70 = realSliderValue * 0.7;
  const real80 = realSliderValue * 0.8;
  const real70Target = real70 * targetRate;
  const real80Target = real80 * targetRate;
  const real70USD = real70 * baseToUsdRate;
  const real80USD = real80 * baseToUsdRate;

  const handleKeypad = (key: string) => {
    if (key === "⌫") {
      setAmount(prev => prev.length <= 1 ? "0" : prev.slice(0, -1));
    } else if (key === ".") {
      if (!amount.includes(".")) setAmount(prev => prev + ".");
    } else {
      setAmount(prev => (prev === "0" ? key : prev + key));
    }
  };

  const handleSliderChange = (val: number) => {
    setSliderValue(val);
    setCustomInput(val.toFixed(2));
  };

  const handleCustomInput = (val: string) => {
    setCustomInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setSliderValue(Math.min(num, 50));
    }
  };

  return (
    <section className="py-24 px-4" id="calculator">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Savings <span className="text-gradient-gold">Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter any amount, pick your currency, and see exactly how much you save.
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" /> Last updated: {lastUpdated}
              <button onClick={fetchRates} className="ml-1 text-primary hover:underline text-xs">Refresh</button>
            </p>
          )}
        </motion.div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
            {error}
            <button onClick={fetchRates} className="ml-2 underline">Retry</button>
          </div>
        )}

        {/* Discount Slider - always visible */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-5"
          >
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              Discount Slider
            </h3>

            {/* Currency selectors */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPickerOpen("base")}
                className="flex-1 flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCurrencyInfo(baseCurrency).symbol}</span>
                  <span className="font-semibold text-sm">{baseCurrency}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => { const t = baseCurrency; setBaseCurrency(targetCurrency); setTargetCurrency(t); }}
                className="p-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4 text-primary" />
              </button>

              <button
                onClick={() => setPickerOpen("target")}
                className="flex-1 flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCurrencyInfo(targetCurrency).symbol}</span>
                  <span className="font-semibold text-sm">{targetCurrency}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Value display */}
            <div className="bg-secondary rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Current Value ({baseCurrency})</p>
              <p className="font-display text-3xl font-bold text-foreground">
                {getCurrencyInfo(baseCurrency).symbol}{realSliderValue.toFixed(2)}
              </p>
              {baseCurrency !== "USD" && (
                <p className="text-xs text-muted-foreground mt-1">≈ {formatCurrency(realSliderUSD, "USD")} USD</p>
              )}
              {targetCurrency !== baseCurrency && (
                <p className="text-xs text-primary mt-1">= {formatCurrency(realSliderTarget, targetCurrency)} {targetCurrency}</p>
              )}
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{getCurrencyInfo(baseCurrency).symbol}0</span>
                <span>{getCurrencyInfo(baseCurrency).symbol}50</span>
              </div>
              <input
                type="range" min="0" max="50" step="0.01"
                value={Math.min(realSliderValue, 50)}
                onChange={e => handleSliderChange(parseFloat(e.target.value))}
                className="slider-gold w-full"
              />
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Custom amount:</span>
              <input
                type="number" min="0" step="0.01" value={customInput}
                onChange={e => handleCustomInput(e.target.value)}
                className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* 70% Result */}
            <div className="space-y-3">
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">At 70%</span>
                  <span className="font-display text-lg font-bold text-primary">{formatCurrency(real70, baseCurrency)}</span>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-gold"
                    initial={{ width: "0%" }} animate={{ width: "70%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {targetCurrency !== baseCurrency && <span>= {formatCurrency(real70Target, targetCurrency)}</span>}
                  {baseCurrency !== "USD" && <span>≈ {formatCurrency(real70USD, "USD")} USD</span>}
                </div>
              </div>

              {/* 80% Result */}
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">At 80%</span>
                  <span className="font-display text-lg font-bold text-primary">{formatCurrency(real80, baseCurrency)}</span>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-gold"
                    initial={{ width: "0%" }} animate={{ width: "80%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {targetCurrency !== baseCurrency && <span>= {formatCurrency(real80Target, targetCurrency)}</span>}
                  {baseCurrency !== "USD" && <span>≈ {formatCurrency(real80USD, "USD")} USD</span>}
                </div>
              </div>
            </div>

            {/* Savings summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">You save between</p>
              <p className="font-display text-xl font-bold text-primary">
                {formatCurrency(realSliderValue - real80, baseCurrency)} – {formatCurrency(realSliderValue - real70, baseCurrency)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ({formatCurrency((realSliderValue - real80) * (rates?.["USD"] ?? 1) / (rates?.[baseCurrency] ?? 1), "USD")} – {formatCurrency((realSliderValue - real70) * (rates?.["USD"] ?? 1) / (rates?.[baseCurrency] ?? 1), "USD")} USD)
              </p>
            </div>

            {/* Open Calculator Button */}
            <Button variant="hero" className="w-full" onClick={() => setCalculatorOpen(true)}>
              <Calculator className="w-5 h-5" />
              Open Calculator
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {calculatorOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setCalculatorOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Currency Converter
                </h3>
                <button onClick={() => setCalculatorOpen(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Amount display */}
              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Amount ({baseCurrency})</p>
                <p className="font-display text-3xl font-bold text-foreground">
                  {getCurrencyInfo(baseCurrency).symbol}{amount || "0"}
                </p>
              </div>

              {/* Currency selectors */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPickerOpen("base")}
                  className="flex-1 flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCurrencyInfo(baseCurrency).symbol}</span>
                    <span className="font-semibold text-sm">{baseCurrency}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                <button
                  onClick={() => { const t = baseCurrency; setBaseCurrency(targetCurrency); setTargetCurrency(t); }}
                  className="p-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4 text-primary" />
                </button>

                <button
                  onClick={() => setPickerOpen("target")}
                  className="flex-1 flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCurrencyInfo(targetCurrency).symbol}</span>
                    <span className="font-semibold text-sm">{targetCurrency}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Conversion result */}
              {loading ? (
                <div className="bg-secondary/50 rounded-xl p-4 text-center animate-pulse">
                  <div className="h-6 bg-muted rounded w-32 mx-auto mb-2" />
                  <div className="h-4 bg-muted rounded w-24 mx-auto" />
                </div>
              ) : (
                <motion.div
                  key={`${amount}-${targetCurrency}`}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center"
                >
                  <p className="text-xs text-muted-foreground mb-1">Converted ({targetCurrency})</p>
                  <p className="font-display text-2xl font-bold text-primary">
                    {formatCurrency(convertedTarget, targetCurrency)}
                  </p>
                  {baseCurrency !== "USD" && targetCurrency !== "USD" && (
                    <p className="text-xs text-muted-foreground mt-1">≈ {formatCurrency(convertedUSD, "USD")} USD</p>
                  )}
                </motion.div>
              )}

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2">
                {KEYPAD_KEYS.map(key => (
                  <button
                    key={key} onClick={() => handleKeypad(key)}
                    className={`py-3 rounded-xl font-semibold text-lg transition-all active:scale-95 ${
                      key === "⌫"
                        ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                    }`}
                  >
                    {key === "⌫" ? <Delete className="w-5 h-5 mx-auto" /> : key}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setAmount("0")}
                className="w-full py-2.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Currency Picker Modals */}
      <CurrencyPicker
        isOpen={pickerOpen === "base"} onClose={() => setPickerOpen(null)}
        onSelect={setBaseCurrency} selected={baseCurrency} label="Select Base Currency"
      />
      <CurrencyPicker
        isOpen={pickerOpen === "target"} onClose={() => setPickerOpen(null)}
        onSelect={setTargetCurrency} selected={targetCurrency} label="Select Target Currency"
      />
    </section>
  );
};

export default CurrencyCalculator;
