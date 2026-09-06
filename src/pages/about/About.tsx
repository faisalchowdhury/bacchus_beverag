import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Link } from "react-router";
import { Award, Compass, Heart, ArrowRight, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Elevated Craftsmanship",
      desc: "We treat mixology as culinary science. Every infusion, syrup, and peel is curated to offer an unmatched multi-sensory journey.",
      icon: <Award className="text-luxury-gold" size={24} />,
    },
    {
      title: "Artisanal Aesthetics",
      desc: "Our bar structures and setups are designed to seamlessly blend into elite high-end venues, maintaining visual perfection.",
      icon: <Compass className="text-luxury-gold" size={24} />,
    },
    {
      title: "Sincere Hospitality",
      desc: "Michelin-caliber event service means anticipating guest needs before they emerge, delivering warm, elegant bar experiences.",
      icon: <Heart className="text-luxury-gold" size={24} />,
    },
  ];

  /**
   * Our head mixologists. Bios are their own words, verbatim.
   *
   * ⚠ TODO(client): drop the two supplied headshots into `public/team/` using
   *   exactly these filenames. Until a file is present the card falls back to
   *   an initials monogram, so a missing image never shows as a broken photo.
   *     IMG-20260804-WA0000.jpg → public/team/lauren-duppstadt.jpg
   *     IMG-20260804-WA0001.jpg → public/team/laura-leary.jpg
   */
  const team: {
    name: string;
    role: string;
    bio: string;
    highlights: string[];
    img: string;
  }[] = [
    {
      name: "Lauren Duppstadt",
      role: "Head Mixologist",
      // Condensed from Lauren's own bio at the client's request — highlights kept,
      // her wording and voice preserved. Full original text is in the notes below.
      bio: "Owner and Operator of Liquid Lore Spirits Lab, Lauren designs custom cocktail experiences and beverage programs for weddings, private events and hospitality venues — combining classic technique with modern creativity. She believes exceptional hospitality extends far beyond what's in the glass.",
      highlights: [
        "8 years experience",
        "House-made infusions, shrubs & syrups",
        "Culinary-inspired flavor development",
        "High-volume hospitality background",
      ],
      img: "/team/lauren-duppstadt.jpg",
    },
    {
      name: "Laura Leary",
      role: "Head Mixologist",
      // Condensed from Laura's own bio at the client's request.
      bio: "Laura specializes in beverage service for weddings, private parties, corporate events and festivals. Equally at home crafting classic cocktails or keeping service moving smoothly for hundreds of guests, her focus is always on outstanding customer service and helping make every event a success.",
      highlights: [
        "10+ years bartending",
        "Weddings, corporate events & festivals",
        "Thrives in fast-paced service",
        "Friendly, professional presence",
      ],
      img: "/team/laura-leary.jpg",
    },
  ];

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            Our Heritage & Standards
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            The Bacchus{" "}
            <span className="gradient-text-gold font-serif">Aesthetic</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-light">
            We deliver uncompromising, Michelin-caliber event bar services,
            pairing five-star hospitality with molecular cocktail craftsmanship.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Story Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold block">
                The Chronicle
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Pouring Sophistication,{" "}
                <span className="gradient-text-gold font-serif">
                  One Glass At A Time
                </span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                Bacchus Beverages was founded on a simple realization: while
                wedding venues, floral arrangements, and cuisine had ascended to
                unprecedented levels of artistic luxury, the event bar had
                remained static, pouring generic corporate mixers from
                standardized ice coolers.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                We set out to dismantle the standard. Our head mixologists treat
                beverage planning as a craft — house-made infusions, shrubs and
                syrups, culinary-inspired flavor development, and genuine warmth
                across the bar. Paired with our vintage bar pieces and the
                permanent bar beside the ballroom, Bacchus makes the bar the
                sensory anchor of your celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-luxury-charcoal border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Uncompromising{" "}
              <span className="gradient-text-gold font-serif">
                Hospitality Benchmarks
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-card p-6 sm:p-8 rounded-3xl border-white/5 space-y-4"
              >
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
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-sans font-semibold mb-3 block">
              Our Head Mixologists
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              The People{" "}
              <span className="gradient-text-gold font-serif">
                Behind The Bar
              </span>
            </h2>
          </div>

          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {team.map((t) => (
                <div
                  key={t.name}
                  className="glass-card rounded-[32px] border-white/5 p-6 sm:p-8 lg:p-9 flex flex-col group"
                >
                  {/* Compact portrait. Kept small on purpose — the supplied files
                      are low-resolution, and a small avatar barely upscales them. */}
                  <div className="flex flex-col items-center text-center mb-7">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-luxury-charcoal ring-1 ring-luxury-gold/25 mb-5">
                      {/* Initials monogram sits underneath; the photo covers it once present. */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-2xl font-bold text-luxury-gold/30 tracking-widest">
                          {t.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </span>
                      </div>
                      <img
                        src={t.img}
                        alt={`${t.name}, ${t.role}`}
                        loading="lazy"
                        onError={(e) => {
                          // No file dropped in yet — reveal the monogram instead.
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-luxury-ivory">
                      {t.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-sans font-semibold block mt-1">
                      {t.role}
                    </span>
                  </div>

                  <p className="text-white/55 text-sm font-light leading-relaxed text-center mb-6">
                    {t.bio}
                  </p>

                  {/* Highlights, pulled out so they scan at a glance. */}
                  <div className="flex flex-wrap justify-center gap-2 mt-auto pt-5 border-t border-white/5">
                    {t.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1.5 rounded-full bg-luxury-charcoal/60 border border-luxury-gold/15 text-[10px] tracking-wide text-white/60 font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Staff photography pending — see src/config/business.ts */
            <div className="max-w-3xl mx-auto glass-card rounded-[32px] border-luxury-gold/20 p-8 sm:p-12 lg:p-14 text-center">
              <div className="w-16 h-16 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center mx-auto mb-7">
                <Users size={30} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Portraits{" "}
                <span className="gradient-text-gold font-serif">
                  Coming Soon
                </span>
              </h3>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed font-light max-w-xl mx-auto">
                Our bartenders are TIPS-certified and are being photographed on
                site shortly. We'd rather introduce you to the actual team
                working your event than to stock portraits of strangers.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 sm:py-20 lg:py-24 text-center bg-luxury-charcoal/50 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Begin Co-designing{" "}
            <span className="gradient-text-gold font-serif">With Bacchus</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            We are booking weddings and corporate events for 2026/2027 seasons.
            Get an instant proposal design for your date using our Quote Wizard.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center text-center gap-2 w-full sm:w-auto px-6 sm:px-10 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
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
