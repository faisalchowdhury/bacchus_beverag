import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Link } from "react-router";
import { Award, Compass, Heart, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Elevated Craftsmanship",
      desc: "We treat mixology as culinary science. Every infusion, syrup, and peel is curated to offer an unmatched multi-sensory journey.",
      icon: <Award className="text-luxury-gold" size={24} />
    },
    {
      title: "Artisanal Aesthetics",
      desc: "Our bar structures and setups are designed to seamlessly blend into elite high-end venues, maintaining visual perfection.",
      icon: <Compass className="text-luxury-gold" size={24} />
    },
    {
      title: "Sincere Hospitality",
      desc: "Michelin-caliber event service means anticipating guest needs before they emerge, delivering warm, elegant bar experiences.",
      icon: <Heart className="text-luxury-gold" size={24} />
    }
  ];

  const team = [
    {
      name: "Jean-Louis Bacchus",
      role: "Founder & Creative Director",
      bio: "A veteran of the Parisian fine hospitality scene, Jean-Louis founded Bacchus to bring five-star hotel mixology directly to private wedding venues.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Amelia Thorne",
      role: "Lead Master Mixologist",
      bio: "Amelia curates our seasonal botanical menus. Her expertise in organic extractions and edible floral essences defines our cocktail program.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Raymond Sterling",
      role: "Head Sommelier",
      bio: "Raymond leads our estate wine partnerships, meticulously curating wine profiles and champagne tiers for our luxury open bars.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
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
            Our Heritage & Standards
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            The Bacchus <span className="gradient-text-gold font-serif">Aesthetic</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            We deliver uncompromising, Michelin-caliber event bar services, pairing five-star hospitality with molecular cocktail craftsmanship.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold block">
                The Chronicle
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Pouring Sophistication, <span className="gradient-text-gold font-serif">One Glass At A Time</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                Bacchus Beverages was founded on a simple realization: while wedding venues, floral arrangements, and cuisine had ascended to unprecedented levels of artistic luxury, the event bar had remained static, pouring generic corporate mixers from standardized ice coolers.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                We set out to dismantle the standard. Our team treats beverage planning as a bespoke gallery curation process. From constructing beautiful hand-built mobile bars styled in Italian marble or custom dark oak to distilling our own flower essences, Bacchus ensures the bar becomes the sensory anchor of your celebration.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-luxury-charcoal border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Uncompromising <span className="gradient-text-gold font-serif">Hospitality Benchmarks</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {values.map((v, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-luxury-black border border-white/5 flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-bold">{v.title}</h3>
                <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Our Artisans
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Meet The <span className="gradient-text-gold font-serif">Beverage Designers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <div key={i} className="glass-card rounded-[32px] overflow-hidden border-white/5 flex flex-col group">
                {/* Team photo */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${t.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
                </div>
                {/* Team meta */}
                <div className="p-8">
                  <h4 className="font-serif text-2xl font-bold text-luxury-ivory">{t.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-sans font-semibold block mt-1 mb-4">
                    {t.role}
                  </span>
                  <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 text-center bg-luxury-charcoal/50 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Begin Co-designing <span className="gradient-text-gold font-serif">With Bacchus</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            We are booking weddings and corporate events for 2026/2027 seasons. Get an instant proposal design for your date using our Quote Wizard.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
          >
            Launch Instant Designer
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
