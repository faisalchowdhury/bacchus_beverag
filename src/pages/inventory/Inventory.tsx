import { useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { INVENTORY } from "../../utils/demoData";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router";

const CATEGORIES = [
  "All",
  "Whiskey",
  "Bourbon",
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Wine",
  "Champagne",
  "Beer",
  "Signature Cocktails"
];

export default function Inventory() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = INVENTORY.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Top Shelf":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Premium":
        return "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20";
      case "Call":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "Well":
        return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
      default:
        return "bg-neutral-400/10 text-neutral-400 border-neutral-400/20";
    }
  };

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            The Curation Reserve
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            The Spirits <span className="gradient-text-gold font-serif">& Beverages</span> Collection
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Browse our curated reserves. From molecular craft cocktails to rare single malts and estate-grown sommelier reserves, explore options featured inside our packages.
          </p>
        </div>
      </section>

      {/* Filters & Search section */}
      <section className="py-12 bg-luxury-charcoal/30 border-b border-white/5 sticky top-[72px] lg:top-[88px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Search bar */}
            <div className="relative w-full lg:max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text"
                placeholder="Search collection (e.g. Macallan, Reposado)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-luxury-black border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm focus:border-luxury-gold outline-none transition-all placeholder-white/30 text-white"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="w-full overflow-x-auto flex gap-2.5 pb-2 lg:pb-0 scrollbar-thin">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap border ${
                    selectedCategory === cat
                      ? "bg-luxury-gold text-luxury-black border-luxury-gold font-semibold shadow-lg shadow-luxury-gold/5"
                      : "bg-luxury-black/40 border-white/5 hover:border-white/20 text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Grid Display Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-luxury-charcoal/20 rounded-3xl border border-white/5 max-w-lg mx-auto">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-serif text-xl font-bold mb-2">No Reserves Found</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed px-6">
                We couldn't find items in this category matching "{searchQuery}". Check your spelling or try resetting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between border-white/5 transition-all duration-300 hover:border-luxury-gold/20 hover:bg-luxury-charcoal/45 group"
                >
                  <div>
                    {/* Header: Brand Name and Tier */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-white/40">
                        {item.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[9px] tracking-widest font-sans font-semibold uppercase border ${getTierColor(item.tier)}`}>
                        {item.tier}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 mb-2">
                      {item.name}
                    </h3>

                    {item.origin && (
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40 mb-4">
                        <MapPin size={10} className="text-luxury-gold" />
                        <span>{item.origin}</span>
                      </div>
                    )}

                    <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-xs">
                    <span className="text-white/30 italic">Featured Menu Choice</span>
                    <Link
                      to="/quote"
                      className="text-luxury-gold hover:text-white font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors duration-300"
                    >
                      Customize Pours →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Special Requests Banner */}
      <section className="py-24 text-center relative overflow-hidden bg-luxury-charcoal border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
            Private Reserves & <span className="gradient-text-gold font-serif">Special Sourcing</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Have a specific champagne, rare vintage, or artisanal whiskey you'd like to feature at your event bar? Our private logistics concierge can source almost any allocation globally.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
          >
            Sourcing Inquiry
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
