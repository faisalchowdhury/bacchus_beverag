import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { SERVICE_STYLES } from "../../utils/demoData";
import {
  BARTENDER_TIERS,
  CHAMPAGNE_OPTIONS,
  FULL_SHELF_RATES,
  LIQUOR_TIERS,
  RATES,
  SIGNATURE_COCKTAIL_RATES,
  WINE_BEER_TIERS,
  money,
} from "../../features/quote-wizard/pricing";
import { Check, ArrowRight, ShieldCheck, Sparkles, Award, Info } from "lucide-react";

function RateCard({
  title,
  subtitle,
  columns,
  rows,
}: {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="glass-card rounded-[28px] border-white/5 overflow-hidden">
      <div className="px-6 py-5 border-b border-white/5">
        <h3 className="font-serif text-xl font-bold">{title}</h3>
        {subtitle && (
          <p className="text-[11px] text-white/40 font-light mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-t border-white/5">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-6 py-3.5 font-light whitespace-nowrap ${
                      c === 0
                        ? "text-white/70"
                        : "text-right text-luxury-gold font-sans tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Packages() {
  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            Bar Service Configurations
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Packages & <span className="gradient-text-gold font-serif">Rates</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Choose a bar service style, then build your program from the published rate card below.
            Beverage rates are charged per guest, per hour of Open Bar service — no flat guesswork.
          </p>
          <Link
            to="/important-information"
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/[0.06] text-[11px] uppercase tracking-widest font-semibold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
          >
            <Info size={13} /> How selections affect pricing & staffing
          </Link>
        </div>
      </section>

      {/* Service Styles */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICE_STYLES.map((style) => (
              <div
                key={style.id}
                className={`glass-card p-8 sm:p-10 rounded-[32px] flex flex-col justify-between relative transition-all duration-500 ${
                  style.featured
                    ? "border-luxury-gold/40 bg-luxury-charcoal/80 shadow-2xl shadow-luxury-gold/5 scale-100 lg:scale-[1.03]"
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                {style.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black text-[9px] tracking-widest font-sans font-bold uppercase px-4 py-1.5 rounded-full shadow-lg">
                    Signature Choice
                  </span>
                )}

                <div>
                  <h3 className="font-serif text-3xl font-bold text-luxury-ivory mb-1">
                    {style.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-6">
                    {style.tagline}
                  </p>
                  <p className="text-white/40 text-xs sm:text-sm font-light mb-8 leading-relaxed">
                    {style.description}
                  </p>

                  <div className="font-serif text-4xl sm:text-5xl font-bold text-luxury-gold mb-2">
                    {style.headline}
                  </div>
                  <p className="text-[11px] text-white/40 font-light mb-10 leading-relaxed">
                    {style.headlineNote}
                  </p>

                  <div className="border-t border-white/5 pt-8 mb-8">
                    <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-sans font-semibold mb-6">
                      What Applies
                    </h4>
                    <ul className="space-y-4">
                      {style.inclusions.map((inc, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm font-light text-white/70"
                        >
                          <Check size={14} className="text-luxury-gold mt-1 flex-shrink-0" />
                          <span className="leading-relaxed">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/quote"
                  className={`w-full py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center ${
                    style.featured
                      ? "bg-luxury-gold text-luxury-black hover:bg-white"
                      : "bg-luxury-gray text-luxury-ivory hover:bg-white hover:text-luxury-black border border-white/5"
                  }`}
                >
                  Build This Program
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Published Rate Card */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Transparent Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              The Published <span className="gradient-text-gold font-serif">Rate Card</span>
            </h2>
            <div className="h-[1px] w-24 bg-luxury-gold/30 mx-auto mt-6 mb-4" />
            <p className="text-white/50 text-sm font-light leading-relaxed">
              These are the exact rates our quote designer calculates from. Nothing is hidden and
              nothing is estimated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RateCard
              title="Beer & Unfortified Wine"
              subtitle="Open Bar only. Charged per guest, per Open Bar hour."
              columns={["Tier", "Guest / Hour"]}
              rows={WINE_BEER_TIERS.filter((t) => t.id !== "None").map((tier) => [
                tier.label,
                money(tier.rate),
              ])}
            />

            <RateCard
              title="Full Shelf Access"
              subtitle="Higher shelves automatically include every shelf below them."
              columns={["Shelf", "Guest / Hour"]}
              rows={LIQUOR_TIERS.map((tier) => [
                `Full ${tier.label}`,
                money(FULL_SHELF_RATES[tier.id]),
              ])}
            />

            <RateCard
              title="Signature Cocktails"
              subtitle={`Offer 1–${RATES.maxSignatureCocktails} named cocktails instead of full shelf access, with up to ${RATES.maxLiquorsPerCocktail} liquors each from your tier.`}
              columns={["Shelf", "1", "2", "3", "4"]}
              rows={LIQUOR_TIERS.map((tier) => [
                tier.label,
                ...SIGNATURE_COCKTAIL_RATES[tier.id].map((rate) => money(rate)),
              ])}
            />

            <RateCard
              title="Champagne Toast"
              subtitle="Charged per guest receiving champagne. Sparkling grape juice is offered as the non-alcoholic option."
              columns={["Selection", "Per Guest"]}
              rows={CHAMPAGNE_OPTIONS.map((option) => [option.label, money(option.pricePerGuest)])}
            />

            <RateCard
              title="Staffing & Bar Stations"
              subtitle={`Bartenders are assigned automatically by guest count. Staffing = (event hours + ${RATES.staffingBufferHours}) × bartenders × ${money(RATES.bartenderHourlyRate)}.`}
              columns={["Item", "Rate"]}
              rows={[
                ...BARTENDER_TIERS.map((tier) => [
                  tier.label,
                  `${tier.bartenders} bartenders`,
                ]),
                ["Bartender rate", `${money(RATES.bartenderHourlyRate)} / hour`],
                ["Permanent bar station", "Included"],
                [
                  "Each additional bar station",
                  `${money(RATES.additionalBarSetupFee)} + 1 bartender`,
                ],
              ]}
            />

            <RateCard
              title="Fees, Minimums & Taxes"
              subtitle="Applied automatically based on your selections."
              columns={["Item", "Amount"]}
              rows={[
                ["Glassware rental", `${money(RATES.glasswarePerGuest)} / guest`],
                ["Service fee (every package)", money(RATES.serviceFee)],
                ["Cash Bar administrative fee", money(RATES.cashBarAdminFee)],
                ["Consumption Bar house account", `${money(RATES.houseAccountMinimum)} minimum`],
                ["Bar minimum (beer, wine, liquor)", money(RATES.barMinimum)],
                ["Mandatory gratuity", `${RATES.gratuityRate * 100}% of subtotal`],
                ["Tax", `${RATES.taxRate * 100}%, staffing exempt`],
              ]}
            />
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
                  We guarantee direct, authorized wholesale distributor sourcing of all top-shelf
                  inventory. No secondary markets.
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
                  Every contract includes a private menu tasting and custom cocktail creation cycle
                  with our head mixology director.
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
                  We protect hosts and locations fully with dual-bonded $2M General & Liquor
                  liability policies and TIPS staff logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Banner */}
      <section className="py-24 text-center relative overflow-hidden bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Looking For Something <span className="gradient-text-gold font-serif">More Custom?</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Specialty beer and wine orders, multi-station layouts, and spirit-free programs are all
            available. We make every reasonable effort to source requested products, and approved
            specialty orders are billed on your final invoice.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border border-white/20 hover:border-luxury-gold hover:text-luxury-gold text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-all duration-300"
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
