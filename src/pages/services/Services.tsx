import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const serviceTypes = [
    {
      id: "open-bar",
      title: "Open Bar Sourcing & Management",
      badge: "Most Selected",
      desc: "Our turn-key full-service open bar option. Guests enjoy hand-selected spirits, wines, and beer with nothing to pay at the bar. Billed to the host per guest, per hour of Open Bar service — you choose the wine + beer tier and either signature cocktails or full shelf access.",
      icon: "🥂",
      inclusions: [
        "Sourcing and delivery of entire beverage inventory",
        "Wine + beer tiers from $2.50 per guest per hour, liquor from $2.00",
        "TIPS-certified bartenders assigned by guest count — 2 up to 50 guests, 3 for 51–125, 4 for 126–200",
        "One permanent bar station included; high-clarity ice and premium garnishes",
        "Complete licensing and $2,000,000 liability protection"
      ],
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "cash-bar",
      title: "Cash Bar Event Program",
      badge: "Flexible Option",
      desc: "Perfect for larger celebrations, charity fundraisers, or non-traditional events. Guests pay for their own beverage selections directly at the bar. Nothing is preselected — drinks are served from available inventory on the day — and the host pays a $550 administrative fee.",
      icon: "💳",
      inclusions: [
        "$550 administrative fee — waived on Open Bar and Consumption Bar",
        "Full point-of-sale processing (Apple Pay, Credit Card)",
        "Served from available inventory on the day of the event",
        "Open a host tab with restrictions on drinks, guests or spend",
        "Tabs left open at the close of the event incur a 20% gratuity"
      ],
      img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "consumption-bar",
      title: "Private Consumption Bar",
      badge: "Exclusive",
      desc: "Offer your guests bar access while paying strictly for what is poured. A prepaid house account of $2,000 or more functions like a gift card — drinks are deducted as they are purchased, and once the balance is exhausted guests become individually responsible.",
      icon: "📊",
      inclusions: [
        "$2,000 minimum prepaid house account",
        "Limit the account to wine & beer, signature cocktails, or specific shelf tiers",
        "Real-time tab tracking by our lead bartender",
        "Taxes are exempt on drinks charged against the house account",
        "Gratuities are welcomed but never required"
      ],
      img: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "mobile-bars",
      title: "Vintage Mobile Bar Rentals",
      badge: "Vintage Character",
      desc: "Our mobile bars are genuine vintage pieces, not modern builds. Warm timber, aged character and classic proportions that sit naturally in a historic venue and read as part of the room rather than a rental.",
      icon: "🏛️",
      inclusions: [
        "Self-contained vintage service counters with authentic period character",
        "Bottled beer service and professional ice wells",
        "Full white-glove delivery, positioning, and post-event removal",
        "Paired with the bartender count your guest list requires",
        "Available as additional bar stations alongside the permanent bar"
      ],
      img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            The Collection of Experiences
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Our Private <span className="gradient-text-gold font-serif">Bar Services</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            We provide full-scale luxury hospitality for private celebrations, corporate galas, and extraordinary wedding receptions nationwide.
          </p>
        </div>
      </section>

      {/* Detailed Services Grids */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-32">
            {serviceTypes.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Left Side Content */}
                <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-xs font-semibold text-luxury-gold tracking-wide">
                    <span>{service.icon}</span>
                    <span>{service.badge}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-ivory">
                    {service.title}
                  </h2>

                  <p className="text-white/60 text-base leading-relaxed font-light">
                    {service.desc}
                  </p>

                  <div className="border-t border-white/5 pt-6">
                    <h4 className="text-xs uppercase tracking-widest text-luxury-gold font-sans font-semibold mb-4">
                      Service Inclusions
                    </h4>
                    <ul className="space-y-3">
                      {service.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm font-light text-white/70">
                          <Check size={14} className="text-luxury-gold mt-1 flex-shrink-0" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-luxury-gold hover:bg-white text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full transition-all duration-300"
                    >
                      Instant Cost Estimate
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right Side Image */}
                <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent blur-2xl pointer-events-none" />
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Service Features */}
      <section className="py-24 bg-luxury-charcoal border-y border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Operational Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Impeccable <span className="gradient-text-gold font-serif">Logistics Cycle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 p-6">
              <div className="text-4xl mb-4">🧊</div>
              <h3 className="text-xl font-serif font-bold">Precision Temperature Control</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                We supply high-purity clear ice blocks, dry ice fog overlays, and specific glassware chilling services to match standard molecular mixology.
              </p>
            </div>
            <div className="space-y-4 p-6">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-serif font-bold">Full Licensing & Sourcing</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Our in-house logistics team handles all state liquor board permits, transport licenses, and premium sourcing requirements seamlessly.
              </p>
            </div>
            <div className="space-y-4 p-6">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-xl font-serif font-bold">Bespoke Attire Configurations</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Choose the mixologist uniform that matches your venue: classic black-tie vest, sleek minimal modern aprons, or high-end lounge-casual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 text-center relative overflow-hidden bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Tailor Your Perfect <span className="gradient-text-gold font-serif">Beverage Experience</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Tell us about your estimated guest count, liquor tier preferences, and location. Build your bar program on our dynamic designer today.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
          >
            Design Custom Program
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Inline helper for Check icon
function Check({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
