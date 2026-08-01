import { useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useLanguage } from "../../i18n/LanguageContext";
import { Mail, Send, Facebook, Twitter } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen overflow-x-hidden">
      <Header />
      
      <section className="contact-section py-24 lg:py-44 relative overflow-hidden bg-luxury-black">
        {/* Cinematic subtle gold glow background */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-xs font-semibold text-luxury-gold mb-6 shadow-glow-sm backdrop-blur-xl uppercase tracking-widest">
              {c.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-luxury-ivory">
              {c.title} <span className="gradient-text-gold font-serif">{c.titleAccent}</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">{c.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Contact Form */}
            <div className="contact-form-container relative">
              <div className="glass-card p-8 lg:p-10 rounded-[32px] border-white/5 shadow-2xl relative overflow-hidden">
                <h3 className="text-2xl font-serif font-bold mb-8 text-luxury-ivory tracking-wide">
                  {c.formTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-widest font-semibold text-white/50 mb-2"
                    >
                      {c.fullName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={c.namePlaceholder}
                      className="form-input w-full px-5 py-4 bg-luxury-charcoal border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-widest font-semibold text-white/50 mb-2"
                    >
                      {c.emailAddress}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={c.emailPlaceholder}
                      className="form-input w-full px-5 py-4 bg-luxury-charcoal border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="subject"
                      className="block text-xs uppercase tracking-widest font-semibold text-white/50 mb-2"
                    >
                      {c.subject}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input w-full px-5 py-4 bg-luxury-charcoal border border-white/10 rounded-xl text-white focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all duration-300 appearance-none cursor-pointer text-sm"
                        required
                      >
                        <option value="" className="bg-luxury-charcoal text-white">
                          {c.selectTopic}
                        </option>
                        <option value="general" className="bg-luxury-charcoal text-white">
                          {c.generalInquiry}
                        </option>
                        <option value="support" className="bg-luxury-charcoal text-white">
                          {c.technicalSupport}
                        </option>
                        <option value="feedback" className="bg-luxury-charcoal text-white">
                          {c.feedback}
                        </option>
                        <option value="partnership" className="bg-luxury-charcoal text-white">
                          {c.partnership}
                        </option>
                        <option value="other" className="bg-luxury-charcoal text-white">
                          {c.other}
                        </option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-widest font-semibold text-white/50 mb-2"
                    >
                      {c.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={c.messagePlaceholder}
                      className="form-input w-full px-5 py-4 bg-luxury-charcoal border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-all duration-300 resize-none text-sm"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`submit-button w-full py-4 px-8 bg-luxury-gold text-luxury-black font-semibold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-luxury-gold/10 hover:scale-[1.01] active:scale-[0.99] group relative overflow-hidden ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                      {isSubmitting ? c.sending : c.sendMessage}
                      {!isSubmitting && (
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {submitStatus === "success" && (
                    <div className="text-center text-xs font-semibold text-emerald-400 mt-4 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20">
                      {c.successMessage}
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="text-center text-xs font-semibold text-rose-400 mt-4 bg-rose-500/10 py-3 rounded-xl border border-rose-500/20">
                      {c.errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-3xl border-white/5 transition-all duration-500 hover:border-luxury-gold/20 hover:bg-luxury-charcoal/40 shadow-xl group">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-luxury-black border border-white/10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 text-luxury-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-bold text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 mb-1">
                      {c.emailUs}
                    </h4>
                    <p className="text-white/40 text-xs font-light mb-3">{c.emailSubtitle}</p>
                    <a
                      href="mailto:events@bacchusbeverages.com"
                      className="text-luxury-gold hover:text-white text-sm font-semibold transition-colors duration-300"
                    >
                      events@bacchusbeverages.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Telegram Card */}
              <div className="glass-card p-8 rounded-3xl border-white/5 transition-all duration-500 hover:border-luxury-gold/20 hover:bg-luxury-charcoal/40 shadow-xl group">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-luxury-black border border-white/10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 text-luxury-gold">
                    <Send className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-bold text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 mb-1">
                      {c.telegram}
                    </h4>
                    <p className="text-white/40 text-xs font-light mb-3">{c.telegramSubtitle}</p>
                    <a
                      href="https://t.me/bacchusbeverages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-luxury-gold hover:text-white text-sm font-semibold inline-flex items-center gap-1.5 transition-colors duration-300"
                    >
                      <Send size={12} />
                      t.me/bacchusbeverages
                    </a>
                  </div>
                </div>
              </div>

              {/* Follow Us Card */}
              <div className="glass-card p-8 rounded-3xl border-white/5 shadow-xl">
                <h4 className="text-xl font-serif font-bold text-luxury-ivory mb-6 tracking-wide">
                  {c.followUs}
                </h4>
                <div className="flex items-center gap-4">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-luxury-black border border-white/5 text-white/50 hover:text-luxury-gold hover:border-luxury-gold/40 hover:bg-luxury-charcoal transition-all duration-300 hover:scale-105"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-luxury-black border border-white/5 text-white/50 hover:text-luxury-gold hover:border-luxury-gold/40 hover:bg-luxury-charcoal transition-all duration-300 hover:scale-105"
                    aria-label="X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/bacchusbeverages"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-luxury-black border border-white/5 text-white/50 hover:text-luxury-gold hover:border-luxury-gold/40 hover:bg-luxury-charcoal transition-all duration-300 hover:scale-105"
                    aria-label="Telegram"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
