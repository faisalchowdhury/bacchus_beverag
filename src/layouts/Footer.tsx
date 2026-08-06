import { Link } from "react-router";
import { MapPin, ExternalLink } from "lucide-react";
import {
  HONEYBOOK_PORTAL_URL,
  SOCIAL_LINKS,
  VENUE_ADDRESS_LINES,
  VENUE_NAME,
} from "../config/business";

export default function Footer() {
  const quickLinks = [
    { label: "Our Services", path: "/services" },
    { label: "Beverage Packages", path: "/packages" },
    { label: "Important Information", path: "/important-information" },
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
            {/* Socials — rendered only once accounts exist (currently none) */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-4 mt-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 hover:border-luxury-gold hover:text-luxury-gold text-[10px] uppercase tracking-widest font-semibold transition-all duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
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

          {/* Booking route — no email or phone is published */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg tracking-wider text-luxury-gold">
              Enquiries
            </h4>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Start with a quote and we will receive it directly. To move forward or ask a question,
              reach out to {VENUE_NAME} through your HoneyBook portal.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-luxury-gold text-luxury-black rounded-full text-[10px] uppercase tracking-widest font-semibold hover:bg-white transition-all duration-300"
              >
                Build a Quote
              </Link>
              {HONEYBOOK_PORTAL_URL && (
                <a
                  href={HONEYBOOK_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/15 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white/70 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all duration-300"
                >
                  HoneyBook Portal <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>

          {/* Logistics / Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-lg tracking-wider text-luxury-gold">
              Private Concierge
            </h4>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest font-medium mb-0.5">
                  Venue
                </div>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  {VENUE_NAME}
                  {VENUE_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-white/40 leading-relaxed font-light">
              One permanent bar station is included with every package, with additional stations
              available on request.
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
