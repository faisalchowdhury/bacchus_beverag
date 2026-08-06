import { useMemo, useState } from "react";
import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { CATEGORY_GROUPS, INVENTORY, INVENTORY_CATEGORIES } from "../../utils/inventory";
import type { InventoryCategory, InventoryTier } from "../../types";
import { Search, ArrowRight, Info } from "lucide-react";

const ALL = "All" as const;
type Filter = typeof ALL | InventoryCategory;

/** Tier badge styling — richer tiers read warmer. */
function tierStyle(tier: InventoryTier) {
  switch (tier) {
    case "Platinum":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Top Shelf":
      return "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/25";
    case "Call":
      return "bg-blue-400/10 text-blue-300 border-blue-400/20";
    case "Well":
      return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    case "Tier 3":
      return "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/25";
    case "Tier 2":
      return "bg-blue-400/10 text-blue-300 border-blue-400/20";
    case "Tier 1":
      return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
    case "Toast":
      return "bg-rose-300/10 text-rose-200 border-rose-300/20";
    default:
      return "bg-white/5 text-white/40 border-white/10";
  }
}

export default function Inventory() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVENTORY.filter((item) => {
      const inCategory = filter === ALL || item.category === filter;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tier.toLowerCase().includes(q) ||
        (item.origin?.toLowerCase().includes(q) ?? false) ||
        (item.format?.toLowerCase().includes(q) ?? false) ||
        (item.vintage?.includes(q) ?? false)
      );
    });
  }, [filter, query]);

  /** Group the results so long lists stay readable. */
  const grouped = useMemo(
    () =>
      CATEGORY_GROUPS.map((group) => ({
        label: group.label,
        categories: group.categories
          .map((category) => ({
            category,
            items: matches.filter((item) => item.category === category),
          }))
          .filter((c) => c.items.length > 0),
      })).filter((g) => g.categories.length > 0),
    [matches],
  );

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            The Current Stock List
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Beer, Wine <span className="gradient-text-gold font-serif">& Spirits</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Everything we pour, with the shelf tier each bottle belongs to. Your selected tier
            unlocks every shelf beneath it, and liqueurs are poured across all programs as cocktail
            modifiers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="px-4 py-2 rounded-full bg-luxury-charcoal/60 border border-white/5 text-[11px] uppercase tracking-widest text-white/50 font-semibold">
              {INVENTORY.length} items in stock
            </span>
            <Link
              to="/important-information#liquor"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/[0.06] text-[11px] uppercase tracking-widest font-semibold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              <Info size={12} /> How shelf tiers are priced
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-luxury-charcoal/30 border-b border-white/5 sticky top-[72px] lg:top-[88px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-5">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search the stock list (e.g. Blanton's, Rombauer, Rye)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-luxury-black border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm focus:border-luxury-gold outline-none transition-all placeholder-white/30 text-white"
            />
          </div>

          <div className="w-full overflow-x-auto flex gap-2.5 pb-1">
            {[ALL, ...INVENTORY_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Filter)}
                className={`px-4 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase transition-all whitespace-nowrap border ${
                  filter === cat
                    ? "bg-luxury-gold text-luxury-black border-luxury-gold font-semibold shadow-lg shadow-luxury-gold/5"
                    : "bg-luxury-black/40 border-white/5 hover:border-white/20 text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {matches.length === 0 ? (
            <div className="text-center py-20 bg-luxury-charcoal/20 rounded-3xl border border-white/5 max-w-lg mx-auto">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-serif text-xl font-bold mb-2">Nothing Matches</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed px-6">
                We couldn't find anything for "{query}". Try a different spelling, or reset the
                category filter.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {grouped.map((group) => (
                <div key={group.label}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold">{group.label}</h2>
                    <span className="h-[1px] flex-1 bg-white/5" />
                  </div>

                  <div className="space-y-10">
                    {group.categories.map(({ category, items }) => (
                      <div key={category}>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
                            {category}
                          </h3>
                          <span className="text-[10px] text-white/30 font-medium tabular-nums">
                            {items.length}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="glass-card glass-card-hover rounded-2xl border-white/5 px-5 py-4 flex items-start justify-between gap-3"
                            >
                              <div className="min-w-0">
                                <div className="font-serif text-base font-semibold leading-snug text-luxury-ivory">
                                  {item.name}
                                </div>
                                {(item.origin || item.vintage || item.format) && (
                                  <div className="text-[11px] text-white/40 font-light mt-1">
                                    {[item.origin, item.vintage, item.format]
                                      .filter(Boolean)
                                      .join(" · ")}
                                  </div>
                                )}
                              </div>
                              <span
                                className={`px-2.5 py-0.5 rounded text-[9px] tracking-widest font-sans font-semibold uppercase border whitespace-nowrap flex-shrink-0 ${tierStyle(
                                  item.tier,
                                )}`}
                              >
                                {item.tier}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specialty orders note */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="glass-card rounded-[32px] border-luxury-gold/20 p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Looking for something <span className="gradient-text-gold font-serif">not listed?</span>
            </h3>
            <p className="text-white/50 text-sm font-light max-w-xl mx-auto mb-8 leading-relaxed">
              You may request specialty beer or wine orders. We make every reasonable effort to
              obtain requested products, though availability cannot be guaranteed. Approved
              specialty orders are purchased in advance and billed on your final invoice.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-10 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300"
            >
              Request It In Your Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
