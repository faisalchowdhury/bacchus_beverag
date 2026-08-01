import { Link } from "react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Compass } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Our Services", path: "/services" },
    { label: "Beverage Packages", path: "/packages" },
    { label: "The Collection", path: "/inventory" },
    { label: "Visual Gallery", path: "/gallery" },
    { label: "Our Story", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="relative bg-luxury-black border-t border-white/5 py-20 overflow-hidden text-white">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand & Editorial Copy */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-widest text-luxury-ivory">
                BACCHUS
              </span>
              <span className="text-[10px] tracking-[0.3em] text-luxury-gold font-sans font-medium uppercase -mt-1">
                Beverages
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Crafting liquid memories and delivering Michelin-caliber bar services for weddings, corporate galas, and extraordinary celebrations worldwide.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-luxury-gold hover:text-luxury-gold flex items-center justify-center transition-all duration-300"
                aria-label="Pinterest"
              >
                <Compass size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg tracking-wider text-luxury-gold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-luxury-gold text-sm tracking-wide font-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg tracking-wider text-luxury-gold">
              Inquiries
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-medium mb-0.5">Email</div>
                  <a
                    href="mailto:events@bacchusbeverages.com"
                    className="text-white/70 hover:text-luxury-gold text-sm font-light transition-colors duration-300"
                  >
                    events@bacchusbeverages.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-medium mb-0.5">Concierge</div>
                  <a
                    href="tel:+18005550199"
                    className="text-white/70 hover:text-luxury-gold text-sm font-light transition-colors duration-300"
                  >
                    +1 (800) 555-0199
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Logistics / Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg tracking-wider text-luxury-gold">
              Private Concierge
            </h4>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest font-medium mb-0.5">Atelier Location</div>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  850 Champagne Suite Lane,<br />
                  Beverly Hills, CA 90210
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-white/40 leading-relaxed font-light">
              Atelier Hours: Mon - Fri: 9am - 6pm PST<br />
              Event Operations: 24/7 Nationwide
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-white/40 font-light tracking-wide text-center sm:text-left">
            © 2026 Bacchus Beverages LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-luxury-gray rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></span>
            <span className="text-white/60 text-[10px] tracking-widest uppercase font-medium">
              Elite TIPS-Certified & Fully Insured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
