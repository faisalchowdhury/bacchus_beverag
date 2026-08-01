import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Packages", path: "/packages" },
    { label: "Inventory", path: "/inventory" },
    { label: "Gallery", path: "/gallery" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-4 shadow-xl shadow-black/10"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex flex-col group">
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-widest text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
                BACCHUS
              </span>
              <span className="text-[9px] tracking-[0.3em] text-luxury-gold font-sans font-medium uppercase -mt-1 group-hover:text-luxury-ivory transition-colors duration-300">
                Beverages
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-luxury-gold font-semibold"
                      : "text-white/70 hover:text-luxury-gold"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-luxury-gold rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/quote"
                className="group relative px-6 py-2.5 overflow-hidden rounded-full border border-luxury-gold text-xs tracking-widest uppercase font-semibold text-luxury-black transition-all duration-500 hover:text-white"
              >
                {/* Gold Fill Transition Effect */}
                <span className="absolute inset-0 bg-luxury-gold transition-transform duration-500 ease-out group-hover:scale-x-0 origin-right"></span>
                <span className="relative z-10 flex items-center gap-1.5">
                  Instant Quote
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-luxury-ivory hover:text-luxury-gold transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-luxury-black/95 backdrop-blur-2xl border-l border-white/5 z-50 transform transition-transform duration-500 ease-out shadow-2xl lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/75 hover:text-luxury-gold transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl tracking-widest uppercase font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-luxury-gold font-bold"
                    : "text-white/75 hover:text-luxury-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-luxury-gold text-luxury-black font-semibold tracking-widest text-xs uppercase rounded-full hover:bg-white hover:text-luxury-black transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/10"
            >
              Get Instant Quote
              <ArrowRight size={14} />
            </Link>
            <p className="text-[10px] text-center text-white/30 tracking-[0.2em] uppercase mt-6">
              © 2026 Bacchus Beverages
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  );
}
