import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import {
  HONEYBOOK_PORTAL_URL,
  SOCIAL_LINKS,
  VENUE_NAME,
} from "../../config/business";
import { ExternalLink, ArrowRight, Calculator, MessageSquare, ClipboardList } from "lucide-react";

/**
 * We deliberately publish no email address and no phone number. Every enquiry
 * is routed either through the quote designer (which delivers the quote and the
 * client's details to the owner) or through the HoneyBook portal.
 */
export default function Contact() {
  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            Enquiries & Booking
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Get In <span className="gradient-text-gold font-serif">Touch</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Start with a quote — it takes a few minutes and gives you a fully itemized estimate.
            Everything after that is handled through your {VENUE_NAME} HoneyBook portal.
          </p>
        </div>
      </section>

      {/* How to reach us */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step 1 — build a quote */}
            <div className="glass-card rounded-[32px] border-white/5 p-9 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center mb-6">
                <Calculator size={22} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-2">
                Step One
              </span>
              <h2 className="font-serif text-2xl font-bold mb-3">Build Your Quote</h2>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-1">
                Tell us your guest count, service window and bar preferences. You'll see a fully
                itemized estimate as you go — staffing, glassware, beverages, gratuity and tax. When
                you submit, a copy comes straight to us with your contact details.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300"
              >
                Open the Quote Designer <ArrowRight size={14} />
              </Link>
            </div>

            {/* Step 2 — HoneyBook */}
            <div className="glass-card rounded-[32px] border-luxury-gold/25 p-9 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center mb-6">
                <MessageSquare size={22} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-2">
                Step Two
              </span>
              <h2 className="font-serif text-2xl font-bold mb-3">Reach Out On HoneyBook</h2>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-1">
                To move forward, or if you have any questions at all, contact {VENUE_NAME} through
                your HoneyBook portal page. Contracts, payments, scheduling and every piece of event
                correspondence live there, so nothing gets lost in an inbox.
              </p>
              {HONEYBOOK_PORTAL_URL ? (
                <a
                  href={HONEYBOOK_PORTAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 border border-luxury-gold text-luxury-gold font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                >
                  Open HoneyBook Portal <ExternalLink size={13} />
                </a>
              ) : (
                <div className="w-full py-4 rounded-full border border-white/10 text-center text-[11px] uppercase tracking-widest font-semibold text-white/40">
                  Portal link coming soon
                </div>
              )}
            </div>
          </div>

          {/* What happens next */}
          <div className="glass-card rounded-[32px] border-white/5 p-9 sm:p-11 mt-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center flex-shrink-0">
                <ClipboardList size={19} />
              </div>
              <h2 className="font-serif text-2xl font-bold">What Happens After You Submit</h2>
            </div>
            <ol className="space-y-5">
              {[
                "Your itemized quote and contact details are sent to us the moment you submit.",
                `We look you up and set your file up in HoneyBook under ${VENUE_NAME}.`,
                "You reach out through your HoneyBook portal whenever you're ready to move forward or have questions.",
                "Contracts, payment schedule and the final beverage program are all finalized in the portal.",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-luxury-charcoal border border-luxury-gold/20 text-luxury-gold text-[11px] font-semibold flex items-center justify-center flex-shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-white/60 text-sm font-light leading-relaxed pt-1">
                    {line}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Socials — only rendered once accounts exist */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="glass-card rounded-[32px] border-white/5 p-9 mt-8 text-center">
              <h3 className="font-serif text-xl font-bold mb-6">Follow Along</h3>
              <div className="flex items-center justify-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest font-semibold text-white/60 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
