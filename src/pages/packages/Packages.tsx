import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { PACKAGES } from "../../utils/demoData";
import { Check, ArrowRight, ShieldCheck, Sparkles, Award } from "lucide-react";

export default function Packages() {
  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            Curated Menu Configurations
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Beverage <span className="gradient-text-gold font-serif">Packages</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Review our flat-rate guest packages. Sourced, chilled, and elegantly poured by certified TIPS mixologists.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`glass-card p-8 sm:p-10 rounded-[32px] flex flex-col justify-between relative transition-all duration-500 ${
                  pkg.id === "Premium"
                    ? "border-luxury-gold/40 bg-luxury-charcoal/80 shadow-2xl shadow-luxury-gold/5 scale-100 lg:scale-[1.03]"
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                {pkg.id === "Premium" && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black text-[9px] tracking-widest font-sans font-bold uppercase px-4 py-1.5 rounded-full shadow-lg">
                    Signature Choice
                  </span>
                )}

                <div>
                  <h3 className="font-serif text-3xl font-bold text-luxury-ivory mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-white/40 text-xs sm:text-sm font-light mb-8">
                    {pkg.description}
                  </p>

                  <div className="font-serif text-5xl sm:text-6xl font-bold text-luxury-gold mb-10 flex items-baseline gap-1">
                    ${pkg.pricePerGuest}
                    <span className="text-xs text-white/40 font-sans font-light tracking-wide">/ guest</span>
                  </div>

                  <div className="border-t border-white/5 pt-8 mb-8">
                    <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-sans font-semibold mb-6">
                      What's Included
                    </h4>
                    <ul className="space-y-4">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-light text-white/70">
                          <Check size={14} className="text-luxury-gold mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/quote`}
                  className={`w-full py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center ${
                    pkg.id === "Premium"
                      ? "bg-luxury-gold text-luxury-black hover:bg-white"
                      : "bg-luxury-gray text-luxury-ivory hover:bg-white hover:text-luxury-black border border-white/5"
                  }`}
                >
                  Select & Customize Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-luxury-charcoal/50 border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-black flex items-center justify-center text-luxury-gold">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold">100% Certified Sourcing</h4>
                <p className="text-white/40 text-xs font-light max-w-xs mx-auto mt-2 leading-relaxed">
                  We guarantee direct, authorized wholesale distributor sourcing of all top-shelf inventory. No secondary markets.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-black flex items-center justify-center text-luxury-gold">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold">Bespoke Mixology R&D</h4>
                <p className="text-white/40 text-xs font-light max-w-xs mx-auto mt-2 leading-relaxed">
                  Every contract includes a private menu tasting and custom cocktail creation cycle with our head mixology director.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-black flex items-center justify-center text-luxury-gold">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold">TIPS Insured Integrity</h4>
                <p className="text-white/40 text-xs font-light max-w-xs mx-auto mt-2 leading-relaxed">
                  We protect hosts and locations fully with dual-bonded $2M General & Liquor liability policies and TIPS staff logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Customization Banner */}
      <section className="py-24 text-center relative overflow-hidden bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Looking For Something <span className="gradient-text-gold font-serif">More Custom?</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            From sommelier wine tastings to multi-station custom mocktail zones and interactive espresso bars, our concierge can design any custom operations program.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-transparent border border-white/20 hover:border-luxury-gold hover:text-luxury-gold text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-all duration-300"
          >
            Inquire For Bespoke Creations
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
