import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { 
  Sparkles, ShieldCheck, Award, GlassWater, ChevronDown, Check, ArrowRight, Star 
} from "lucide-react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { SERVICE_STYLES, TESTIMONIALS, FAQS, GALLERY_IMAGES } from "../../utils/demoData";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Stats Counter Animation Simulation
  const [eventsCount, setEventsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setEventsCount(Math.min(Math.floor((520 / steps) * step), 520));
      setYearsCount(Math.min(Math.floor((12 / steps) * step), 12));
      setSatisfactionCount(Math.min(Math.floor((98 / steps) * step), 98));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const featuredServices = [
    {
      title: "Open Bar Collections",
      desc: "Curated spirits, unfortified wines and our six regularly stocked beers, priced per guest for the hours you choose to pour.",
      icon: "🥂",
    },
    {
      title: "Signature Cocktails",
      desc: "Offer one to four named cocktails in place of full shelf access, each built from up to two liquors on your chosen tier.",
      icon: "🍹",
    },
    {
      title: "Champagne Toasts",
      desc: "A dedicated pour for the speeches, served as a stationary display or by bar cart, with sparkling grape juice for non-drinkers.",
      icon: "🍾",
    },
    {
      title: "Vintage Mobile Bars",
      desc: "Genuine vintage bar pieces with authentic period character, serving bottled beer alongside your full program.",
      icon: "🏛️",
    },
  ];

  return (
    <div className="bg-luxury-black text-luxury-ivory overflow-x-hidden">
      <Header />

      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image Placeholder with Dark Cinematic Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[zoom-slow_20s_infinite_alternate]"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Decorative subtle light beam */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold">
              The Fine Art of Hospitality
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-wide leading-tight max-w-5xl mx-auto">
              Pouring Elegance For <br />
              <span className="gradient-text-gold font-serif">Your Most Cherished</span> Moments
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Michelin-caliber event bartending, custom mixology, and top-shelf beverage programs designed exclusively for luxury weddings and private galas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/10 hover:-translate-y-0.5"
              >
                Get Instant Quote
              </Link>
              <Link
                to="/packages"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-luxury-gold text-luxury-ivory font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Beverage Packages
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1">
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={14} className="text-luxury-gold" />
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Services Section */}
      <section className="py-24 lg:py-32 bg-luxury-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Curated Offerings
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              Impeccable <span className="gradient-text-gold font-serif">Bar Services</span>
            </h2>
            <div className="h-[1px] w-24 bg-luxury-gold/30 mx-auto mt-6 mb-4" />
            <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed">
              We design comprehensive, worry-free liquid operations covering premium spirits sourcing, logistics, bar rentals, garnishes, and uniforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-serif font-semibold mb-3 text-luxury-ivory">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
                <Link
                  to="/services"
                  className="text-luxury-gold hover:text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 mt-6 transition-colors duration-300"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. "Why Choose Bacchus" Section */}
      <section className="py-24 bg-luxury-charcoal relative border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold block">
                The Bacchus Standard
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-semibold leading-tight">
                Crafting Fluid Luxury <br />
                With <span className="gradient-text-gold font-serif">Uncompromised Precision</span>
              </h2>
              <p className="text-white/60 text-base font-light leading-relaxed">
                We believe event beverage planning should be an art form. Unlike generic bartending firms, we treat cocktails like molecular gastrology, hospitality like a 5-star hotel concierge, and aesthetics like a premium gallery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "TIPS Certified Bartenders",
                    desc: "Every mixologist is certified, uniformly styled, and highly vetted for safe, elite service.",
                    icon: <ShieldCheck size={20} className="text-luxury-gold" />,
                  },
                  {
                    title: "Bespoke Glassware Profiles",
                    desc: "From lead-free crystal coupes to gold-rimmed flutes, we stock beautiful, premium glassware.",
                    icon: <GlassWater size={20} className="text-luxury-gold" />,
                  },
                  {
                    title: "Craft Mixology Excellence",
                    desc: "Hand-pressed citrus, organic floral elixirs, and signature house-made syrups only.",
                    icon: <Sparkles size={20} className="text-luxury-gold" />,
                  },
                  {
                    title: "Comprehensive Licensing",
                    desc: "$2M liability coverage, full liquor permits, and certified transport logistics managed in-house.",
                    icon: <Award size={20} className="text-luxury-gold" />,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-luxury-black border border-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-luxury-ivory mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/40 text-xs font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Image Block */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-sans">Premium Curation</span>
                <h4 className="font-serif text-xl font-bold text-white mt-1">Sourcing only the finest components</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wedding Packages Preview */}
      <section className="py-24 lg:py-32 bg-luxury-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Event Curation
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              Bar <span className="gradient-text-gold font-serif">Service Styles</span>
            </h2>
            <div className="h-[1px] w-24 bg-luxury-gold/30 mx-auto mt-6 mb-4" />
            <p className="text-white/50 text-sm font-light">
              Beverages are priced per guest, per hour of service — never guessed. Choose a style and build the rest inside our Instant Quote Wizard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICE_STYLES.map((style) => (
              <div
                key={style.id}
                className={`glass-card p-8 sm:p-10 rounded-[32px] flex flex-col justify-between relative transition-all duration-500 ${
                  style.featured
                    ? "border-luxury-gold/40 bg-luxury-charcoal/80 shadow-xl shadow-luxury-gold/5 scale-100 lg:scale-[1.03]"
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                {style.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black text-[9px] tracking-widest font-sans font-bold uppercase px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-serif text-2xl font-bold text-luxury-ivory mb-1">
                    {style.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-5">
                    {style.tagline}
                  </p>
                  <p className="text-white/40 text-xs font-light mb-6 leading-relaxed">
                    {style.description}
                  </p>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-luxury-gold mb-2">
                    {style.headline}
                  </div>
                  <p className="text-[11px] text-white/40 font-light mb-8 leading-relaxed">
                    {style.headlineNote}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {style.inclusions.slice(0, 5).map((inc, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-light text-white/70">
                        <Check size={14} className="text-luxury-gold mt-1 flex-shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/quote`}
                  className={`w-full py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center ${
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

          <div className="text-center mt-14">
            <Link
              to="/important-information"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-luxury-gold/30 bg-luxury-gold/[0.06] text-[11px] uppercase tracking-widest font-semibold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              Important Information — how selections affect pricing & staffing
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Carousel Section */}
      <section className="py-24 bg-luxury-charcoal border-y border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Praise & Stories
            </span>
            <h2 className="text-4xl font-serif font-bold">
              Loved By <span className="gradient-text-gold font-serif">Hosts & Guests</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between border-white/5"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm font-light leading-relaxed italic mb-6">
                    "{t.content}"
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h4 className="font-serif text-base font-bold text-luxury-ivory">
                    {t.name}
                  </h4>
                  <div className="flex justify-between text-[11px] text-white/40 uppercase tracking-widest mt-1">
                    <span>{t.role}</span>
                    <span>{t.eventDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Photo Gallery Preview Grid — hidden until real photography lands */}
      {GALLERY_IMAGES.length > 0 && (
      <section className="py-24 lg:py-32 bg-luxury-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
                Visual Portfolios
              </span>
              <h2 className="text-4xl font-serif font-bold">
                Candid <span className="gradient-text-gold font-serif">Celebrations</span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-full border border-white/10 hover:border-luxury-gold hover:text-luxury-gold text-xs tracking-widest uppercase font-semibold transition-all duration-300 whitespace-nowrap"
            >
              View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.slice(0, 4).map((img) => (
              <div
                key={img.id}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-white/5"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img.url}')` }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-serif text-lg font-bold text-white">{img.title}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold mt-1 block">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. Animated Stats Section */}
      <section className="py-20 bg-luxury-charcoal/50 border-y border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-luxury-gold">
                {eventsCount}+
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-white/50 font-medium">Events Orchestrated</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-luxury-gold">
                {yearsCount}+ Years
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-white/50 font-medium">Fine Hospitality Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-luxury-gold">
                {satisfactionCount}%
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-white/50 font-medium">Client Satisfaction Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section className="py-24 lg:py-32 bg-luxury-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Common Questions
            </span>
            <h2 className="text-4xl font-serif font-bold">
              The Fine <span className="gradient-text-gold font-serif">Print details</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden border-white/5 transition-colors duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif text-lg font-semibold text-luxury-ivory">{faq.q}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-luxury-gold transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeFaq === index ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-white/60 text-sm font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Banner */}
      <section className="py-24 lg:py-32 bg-gradient-to-tr from-luxury-black via-luxury-charcoal to-luxury-black border-t border-white/5 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            Are You Ready To Pour <br />
            <span className="gradient-text-gold font-serif">An Unforgettable Event?</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Tell us about your wedding reception or corporate gala. Run your estimated guest counts through our designer and get an instant cost breakdowns.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
          >
            Design Your Custom Bar Program
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
