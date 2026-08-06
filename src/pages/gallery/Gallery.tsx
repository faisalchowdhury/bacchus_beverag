import { useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { GALLERY_IMAGES } from "../../utils/demoData";
import { X, ZoomIn, ArrowRight, Camera } from "lucide-react";
import { Link } from "react-router";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; category: string } | null>(null);

  const categories = ["All", "Weddings", "Corporate", "Private Events"];

  /** Real venue and staff photography is pending — see utils/demoData.ts. */
  const hasImages = GALLERY_IMAGES.length > 0;

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    return filter === "All" || img.category === filter;
  });

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            The Visual Portfolios
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Our Event <span className="gradient-text-gold font-serif">Visual Gallery</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            A look at the venue interiors, the bars in place, and the team behind them.
          </p>
        </div>
      </section>

      {/* Category Filters — hidden until there is photography to filter */}
      {hasImages && (
      <section className="py-8 bg-luxury-charcoal/30 border-b border-white/5 sticky top-[72px] lg:top-[88px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap border ${
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
      )}

      {/* Photography pending */}
      {!hasImages && (
        <section className="py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="glass-card rounded-[32px] border-luxury-gold/20 p-12 sm:p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-luxury-gold/10 text-luxury-gold flex items-center justify-center mx-auto mb-8">
                <Camera size={38} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                Photography <span className="gradient-text-gold font-serif">In Progress</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed font-light max-w-xl mx-auto mb-10">
                We're having the venue interiors and our bar team professionally photographed. Rather
                than fill this page with stock imagery of somewhere else, we'd rather show you the
                real thing — it's coming shortly.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-10 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300"
              >
                Build Your Quote In The Meantime <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Photo Grid Section */}
      {hasImages && (
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxImg({ url: img.url, title: img.title, category: img.category })}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden group border border-white/5 cursor-pointer shadow-xl"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img.url}')` }}
                />
                
                {/* Dark Vignette Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Hover zoom-in tag */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-luxury-black/70 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} className="text-luxury-gold" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-6 bottom-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-sans font-semibold mb-1 block">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {img.title}
                  </h3>
                  <span className="text-xs text-white/40 block mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                    Click to enlarge view
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close view"
          >
            <X size={20} />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center gap-6">
            <div className="relative aspect-[4/3] max-h-[70vh] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={lightboxImg.url} 
                alt={lightboxImg.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-luxury-gold font-sans font-semibold">
                {lightboxImg.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                {lightboxImg.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <section className="py-24 text-center bg-luxury-charcoal/50 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Let's Style Your <span className="gradient-text-gold font-serif">Celebration Bar</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Tell us about your theme, guest counts, and design layout. Plan your dynamic custom event quote today.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-10 py-4.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-luxury-gold/15"
          >
            Instant Curation Wizard
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
