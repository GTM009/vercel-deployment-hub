import { Globe, Tv, Play, Music } from "lucide-react";
import { useState } from "react";

type Platform = "amazon" | "google" | "itunes";

const platformData: Record<
  Platform,
  {
    label: string;
    icon: typeof Tv;
    description: string;
    discount: string;
    countries: string[];
  }
> = {
  amazon: {
    label: "Amazon & Prime Video",
    icon: Tv,
    description: "70-80% of original rental price",
    discount: "70-80%",
    countries: [
      "United States",
      "United Kingdom",
      "Germany",
      "Japan",
      "Italy",
      "Spain",
      "Sweden",
      "Belgium",
      "Poland",
      "Australia",
      "Mexico",
      "Portugal",
      "Finland",
      "New Zealand",
      "Brazil",
      "Canada",
      "Denmark",
    ],
  },
  google: {
    label: "Google Play",
    icon: Play,
    description: "Full payment, discount varies by movie",
    discount: "Conditional",
    countries: ["India", "United States"],
  },
  itunes: {
    label: "iTunes / Apple TV",
    icon: Music,
    description: "Full payment, discount varies by movie",
    discount: "Conditional",
    countries: ["Germany", "United Kingdom", "Poland"],
  },
};

const tabs: { id: Platform; label: string }[] = [
  { id: "amazon", label: "Amazon & Prime Video" },
  { id: "google", label: "Google Play" },
  { id: "itunes", label: "iTunes / Apple TV" },
];

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    Germany: "🇩🇪",
    Japan: "🇯🇵",
    Italy: "🇮🇹",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Belgium: "🇧🇪",
    Poland: "🇵🇱",
    Australia: "🇦🇺",
    Mexico: "🇲🇽",
    Portugal: "🇵🇹",
    Finland: "🇫🇮",
    "New Zealand": "🇳🇿",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Denmark: "🇩🇰",
    India: "🇮🇳",
  };
  return flags[country] || "🌐";
}

const AvailabilitySection = () => {
  const [active, setActive] = useState<Platform>("amazon");
  const data = platformData[active];
  const Icon = data.icon;

  return (
    <section id="availability" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Worldwide Service
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Available Countries
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            We offer rental services across multiple platforms and countries. Choose a platform below to see where we operate.
          </p>
        </div>

        {/* Platform tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                active === tab.id
                  ? "bg-gradient-gold text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active platform card */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-card p-8 glow-gold">
          <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-heading text-xl font-bold text-foreground">
                {data.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {data.description}
              </p>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Discount: {data.discount}
              </span>
            </div>
          </div>

          {/* Country grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {data.countries.map((country) => (
              <div
                key={country}
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 transition-all hover:border-primary/30"
              >
                <span className="text-sm text-primary">
                  {getFlag(country)}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {country}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {data.countries.length} {data.countries.length === 1 ? "country" : "countries"} available
          </p>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
