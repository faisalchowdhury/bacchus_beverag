import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { calculateQuote } from "./pricing";
import type { QuoteFormValues, QuoteBreakdown } from "../../types";
import { 
  Calendar, MapPin, Users, GlassWater, Award, Wine, 
  Sparkles, Layers, Clock, User, ChevronRight, ChevronLeft, CheckCircle2 
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Event Information", desc: "Type, date, & venue" },
  { id: 2, title: "Guest Count", desc: "Estimated attendees" },
  { id: 3, title: "Bar Type", desc: "Bar style preference" },
  { id: 4, title: "Beverage Package", desc: "Menu curation" },
  { id: 5, title: "Liquor Tier", desc: "Brand level selection" },
  { id: 6, title: "Wine & Champagne", desc: "Sparkling add-ons" },
  { id: 7, title: "Signature Cocktails", desc: "Custom mixology" },
  { id: 8, title: "Bar Locations", desc: "Service stations" },
  { id: 9, title: "Service Duration", desc: "Hours of service" },
  { id: 10, title: "Customer Information", desc: "Contact details" },
  { id: 11, title: "Review & Confirm", desc: "Itemized estimate" },
];

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, watch, control, setValue } = useForm<QuoteFormValues>({
    defaultValues: {
      eventType: "Wedding",
      eventDate: "",
      venueLocation: "",
      guestCount: 100,
      barType: "Open Bar",
      beveragePackage: "Premium",
      liquorTier: "Premium",
      addWine: false,
      addChampagneToast: false,
      addSignatureCocktails: false,
      signatureCocktailsQty: 0,
      additionalBarLocations: 0,
      serviceDuration: 4,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    }
  });

  // Watch entire form state to drive the dynamic breakdown live
  const formValues = watch();
  const [breakdown, setBreakdown] = useState<QuoteBreakdown>({
    subtotal: 0,
    barTypeFee: 0,
    addOns: 0,
    wineFee: 0,
    champagneFee: 0,
    cocktailsFee: 0,
    extraBarFee: 0,
    hourlyFee: 0,
    total: 0,
    gratuity: 0,
    tax: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const updatedBreakdown = calculateQuote(formValues);
    setBreakdown(updatedBreakdown);
  }, [JSON.stringify(formValues)]);

  const handleNext = async () => {
    if (step < 11) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onFormSubmit = (data: QuoteFormValues) => {
    console.log("Final Quote Sourced:", data, "Calculations:", breakdown);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-luxury-black py-28 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Bespoke <span className="gradient-text-gold font-serif">Beverage Designer</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Design your ideal event bar experience. Watch your itemized proposal update in real-time.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl mx-auto p-12 text-center rounded-[32px] border-luxury-gold/20"
          >
            <div className="w-20 h-20 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Proposal Sourced</h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
              Thank you, <span className="font-semibold text-white">{formValues.customerName}</span>. Your custom quote has been sent to our private event concierge. A Bacchus representative will reach out shortly to lock in your date.
            </p>
            <div className="bg-luxury-charcoal/50 rounded-2xl p-6 border border-white/5 text-left mb-8">
              <div className="text-sm font-semibold tracking-wide text-luxury-gold uppercase mb-2">Quote Summary Reference</div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Guest Count:</span>
                <span>{formValues.guestCount} guests</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Package Chosen:</span>
                <span>{formValues.beveragePackage}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Liquor Tier:</span>
                <span>{formValues.liquorTier}</span>
              </div>
              <div className="flex justify-between text-sm py-2 text-luxury-gold font-bold">
                <span>Estimated Grand Total:</span>
                <span>${breakdown.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setValue("customerName", "");
                setValue("customerEmail", "");
                setValue("customerPhone", "");
                setValue("eventDate", "");
                setValue("venueLocation", "");
                setIsSubmitted(false);
                setStep(1);
              }}
              className="px-8 py-3 bg-luxury-gold text-luxury-black rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all duration-300"
            >
              Design Another Event
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Column: Form & Wizard Steps (Col-span 2) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Progress Indicator */}
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-3">
                  <span>Step {step} of 11: {STEPS[step-1].title}</span>
                  <span className="text-luxury-gold font-semibold">{Math.round((step / 11) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-luxury-gold"
                    animate={{ width: `${(step / 11) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step Input Panel */}
              <form onSubmit={handleSubmit(onFormSubmit)} className="glass-card p-8 sm:p-12 rounded-[32px] border-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[320px]"
                  >
                    {/* Step 1: Event Information */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Event Details</h3>
                            <p className="text-xs text-white/40 font-light">Tell us what you are hosting and where.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Event Type</label>
                            <select 
                              {...register("eventType")}
                              className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                            >
                              <option value="Wedding">Wedding</option>
                              <option value="Corporate Gala">Corporate Gala</option>
                              <option value="Private Celebration">Private Celebration</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Cocktail Party">Cocktail Party</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Event Date</label>
                            <input 
                              type="date"
                              {...register("eventDate", { required: true })}
                              className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium flex items-center gap-1.5">
                            <MapPin size={12} className="text-luxury-gold" /> Venue Location / City
                          </label>
                          <input 
                            type="text"
                            placeholder="e.g. Bel-Air Country Club, Los Angeles"
                            {...register("venueLocation", { required: true })}
                            className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Guest Count */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Users size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Estimated Guest Count</h3>
                            <p className="text-xs text-white/40 font-light">Calculates beverage volume and required bartenders.</p>
                          </div>
                        </div>

                        <div className="py-8 text-center bg-luxury-charcoal/30 rounded-2xl border border-white/5">
                          <motion.div 
                            key={formValues.guestCount}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-serif font-bold text-luxury-gold"
                          >
                            {formValues.guestCount}
                          </motion.div>
                          <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Expected Guests</span>
                        </div>

                        <div className="space-y-2">
                          <Controller
                            control={control}
                            name="guestCount"
                            render={({ field }) => (
                              <input 
                                type="range" 
                                min="20" 
                                max="500" 
                                step="5"
                                value={field.value}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="w-full accent-luxury-gold cursor-pointer"
                              />
                            )}
                          />
                          <div className="flex justify-between text-[10px] text-white/30 uppercase font-semibold">
                            <span>Min (20)</span>
                            <span>Mid (250)</span>
                            <span>Max (500+)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Bar Type */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <GlassWater size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Bar Operations Style</h3>
                            <p className="text-xs text-white/40 font-light">Determine how your bar is tabbed and served.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { value: "Open Bar", label: "Open Bar", fee: 200, desc: "Beverages are complimentary for guests, billed in full to host." },
                            { value: "Cash Bar", label: "Cash Bar", fee: 100, desc: "Guests purchase their own drinks directly. Lower host fee." },
                            { value: "Consumption Bar", label: "Consumption Bar", fee: 150, desc: "Complimentary to guests, host is billed per drink consumed." },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => setValue("barType", item.value as any)}
                              className={`p-6 text-left rounded-2xl border transition-all duration-300 ${
                                formValues.barType === item.value
                                  ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                                  : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                              }`}
                            >
                              <div className="font-serif text-lg font-bold mb-1">{item.label}</div>
                              <div className="text-[10px] text-luxury-gold font-semibold uppercase mb-3">Setup Fee: ${item.fee}</div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Beverage Package */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Layers size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Beverage Package</h3>
                            <p className="text-xs text-white/40 font-light">Choose your menu level of curation and items.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { value: "Essential", label: "The Essential Pour", price: 25, desc: "Beer, wine, soft drinks, juices." },
                            { value: "Premium", label: "The Bacchus Premium", price: 45, desc: "Full spirits, premium estate wine, imported beer." },
                            { value: "Luxury", label: "The Sommelier & Top Shelf", price: 75, desc: "Elite spirits, sommelier wine, champagne, mixology." },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => setValue("beveragePackage", item.value as any)}
                              className={`p-6 text-left rounded-2xl border transition-all duration-300 ${
                                formValues.beveragePackage === item.value
                                  ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                                  : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                              }`}
                            >
                              <div className="font-serif text-lg font-bold mb-1">{item.label}</div>
                              <div className="text-lg text-luxury-gold font-serif font-semibold mb-3">${item.price} <span className="text-xs text-white/50 font-sans font-light">/ guest</span></div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 5: Liquor Tier */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Award size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Liquor Tier</h3>
                            <p className="text-xs text-white/40 font-light">Select the sophistication level of spirits poured.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { value: "Well", label: "Well Selection", mult: 1.0, brands: "Gordon's Gin, Evan Williams Bourbon, Jose Cuervo Gold" },
                            { value: "Call", label: "Call Selection", mult: 1.2, brands: "Tito's Vodka, Captain Morgan, Maker's Mark, Bombay Sapphire" },
                            { value: "Premium", label: "Premium Collection", mult: 1.5, brands: "Belvedere Vodka, Bulleit Rye, Tanqueray 10, Casamigos" },
                            { value: "Top Shelf", label: "Top-Shelf Elite", mult: 2.0, brands: "Grey Goose, Macallan 12, Don Julio 1942, Hendrick's" },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => setValue("liquorTier", item.value as any)}
                              className={`p-6 text-left rounded-2xl border transition-all duration-300 ${
                                formValues.liquorTier === item.value
                                  ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                                  : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-serif text-lg font-bold">{item.label}</div>
                                <div className="text-[10px] text-luxury-gold font-semibold bg-luxury-gold/10 px-2 py-0.5 rounded border border-luxury-gold/20">x{item.mult}</div>
                              </div>
                              <p className="text-xs text-white/40 mb-3 font-light">Tier Multiplier: {item.mult}x</p>
                              <div className="text-xs text-white/60 font-sans italic">Featuring: {item.brands}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 6: Wine & Champagne */}
                    {step === 6 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Wine size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Wine & Champagne Enhancements</h3>
                            <p className="text-xs text-white/40 font-light">Elevate the reception with curated pairings.</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button
                            type="button"
                            onClick={() => setValue("addWine", !formValues.addWine)}
                            className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 flex justify-between items-center ${
                              formValues.addWine
                                ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                                : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                            }`}
                          >
                            <div className="max-w-[70%]">
                              <div className="font-serif text-lg font-bold mb-1">Estate Wine Upgrade</div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">Upgrade white and red wines to Sommelier-selected premium vineyard reserves.</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg text-luxury-gold font-serif font-semibold">$8.00</div>
                              <div className="text-[9px] text-white/40 uppercase font-medium">per guest</div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setValue("addChampagneToast", !formValues.addChampagneToast)}
                            className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 flex justify-between items-center ${
                              formValues.addChampagneToast
                                ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                                : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                            }`}
                          >
                            <div className="max-w-[70%]">
                              <div className="font-serif text-lg font-bold mb-1">Champagne Toast Service</div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">A dedicated glass of chilled bubbly served prior to speeches and toasts.</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg text-luxury-gold font-serif font-semibold">$6.00</div>
                              <div className="text-[9px] text-white/40 uppercase font-medium">per guest</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 7: Signature Cocktails */}
                    {step === 7 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Bespoke Signature Cocktails</h3>
                            <p className="text-xs text-white/40 font-light">Add custom, hand-crafted specialty cocktails to your bar program.</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setValue("addSignatureCocktails", !formValues.addSignatureCocktails)}
                          className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 flex justify-between items-center ${
                            formValues.addSignatureCocktails
                              ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
                              : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
                          }`}
                        >
                          <div className="max-w-[70%]">
                            <div className="font-serif text-lg font-bold mb-1">Add Signature Drinks</div>
                            <p className="text-xs text-white/50 leading-relaxed font-light">Our mixologists design custom themed beverages tailored entirely to your palette.</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg text-luxury-gold font-serif font-semibold">$12.00</div>
                            <div className="text-[9px] text-white/40 uppercase font-medium">per cocktail poured</div>
                          </div>
                        </button>

                        {formValues.addSignatureCocktails && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 mt-4 space-y-4"
                          >
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Estimated Quantity of Custom Pours</label>
                            <div className="flex gap-4 items-center">
                              <Controller
                                control={control}
                                name="signatureCocktailsQty"
                                render={({ field }) => (
                                  <input 
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 200 pours"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-luxury-gold outline-none text-white text-lg font-semibold w-40"
                                  />
                                )}
                              />
                              <span className="text-xs text-white/40 font-light">Typically calculated as 1.5 to 2 pours per guest.</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Step 8: Additional Bar Locations */}
                    {step === 8 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Layers size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Bar Stations & Locations</h3>
                            <p className="text-xs text-white/40 font-light">Add extra setups to service separate areas (e.g. Cocktail Hour & Reception Lobby).</p>
                          </div>
                        </div>

                        <div className="bg-luxury-charcoal/30 rounded-2xl p-8 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                          <div>
                            <div className="font-serif text-xl font-bold mb-1">Additional Physical Bars</div>
                            <p className="text-xs text-white/40 leading-relaxed font-light">Includes separate matching mobile bar rentals, coolers, and glassware stocking.</p>
                            <span className="text-xs text-luxury-gold font-semibold uppercase mt-1 block">+$150 per extra location</span>
                          </div>

                          <div className="flex items-center gap-4 bg-luxury-black border border-white/10 rounded-full px-4 py-2">
                            <button
                              type="button"
                              onClick={() => {
                                const current = Number(formValues.additionalBarLocations) || 0;
                                if (current > 0) setValue("additionalBarLocations", current - 1);
                              }}
                              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-xl font-bold"
                            >
                              -
                            </button>
                            <span className="text-2xl font-serif font-bold text-luxury-gold w-12 text-center">
                              {formValues.additionalBarLocations}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = Number(formValues.additionalBarLocations) || 0;
                                setValue("additionalBarLocations", current + 1);
                              }}
                              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-xl font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 9: Service Duration */}
                    {step === 9 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Clock size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Service Duration</h3>
                            <p className="text-xs text-white/40 font-light">Select the active bartending hours for your venue timeline.</p>
                          </div>
                        </div>

                        <div className="py-8 text-center bg-luxury-charcoal/30 rounded-2xl border border-white/5">
                          <motion.div 
                            key={formValues.serviceDuration}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-serif font-bold text-luxury-gold"
                          >
                            {formValues.serviceDuration} Hours
                          </motion.div>
                          <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Pours Active Time</span>
                        </div>

                        <div className="space-y-2">
                          <Controller
                            control={control}
                            name="serviceDuration"
                            render={({ field }) => (
                              <input 
                                type="range" 
                                min="3" 
                                max="8" 
                                step="1"
                                value={field.value}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="w-full accent-luxury-gold cursor-pointer"
                              />
                            )}
                          />
                          <div className="flex justify-between text-[10px] text-white/30 uppercase font-semibold">
                            <span>Min (3 Hrs)</span>
                            <span>Standard (4 Hrs)</span>
                            <span>Max (8 Hrs)</span>
                          </div>
                          <p className="text-xs text-white/40 text-center font-light pt-4 italic">
                            *Note: Duration exceeding 4 hours includes a surcharge of $75/hour for elite bartender staffing.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 10: Customer Information */}
                    {step === 10 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <User size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Your Information</h3>
                            <p className="text-xs text-white/40 font-light">Where can our private concierge reach you with the final proposal?</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Full Name</label>
                            <input 
                              type="text"
                              placeholder="e.g. Charlotte DuPont"
                              {...register("customerName", { required: true })}
                              className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Email Address</label>
                              <input 
                                type="email"
                                placeholder="e.g. charlotte@domain.com"
                                {...register("customerEmail", { required: true })}
                                className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">Phone Number</label>
                              <input 
                                type="tel"
                                placeholder="e.g. +1 (310) 555-0155"
                                {...register("customerPhone", { required: true })}
                                className="w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 11: Review & Confirm */}
                    {step === 11 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold">Review Your Bar Program</h3>
                            <p className="text-xs text-white/40 font-light">Confirm the full itemized estimate below before submitting.</p>
                          </div>
                        </div>

                        <div className="bg-luxury-charcoal/30 border border-white/5 rounded-2xl p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-y-3 text-sm font-light">
                            <span className="text-white/40">Event Type:</span>
                            <span className="text-right">{formValues.eventType}</span>
                            
                            <span className="text-white/40">Expected Date:</span>
                            <span className="text-right">{formValues.eventDate}</span>

                            <span className="text-white/40">Venue Location:</span>
                            <span className="text-right">{formValues.venueLocation}</span>

                            <span className="text-white/40">Guest Volume:</span>
                            <span className="text-right">{formValues.guestCount} Guests</span>

                            <span className="text-white/40">Bar Service Style:</span>
                            <span className="text-right">{formValues.barType}</span>

                            <span className="text-white/40">Beverage Package Selection:</span>
                            <span className="text-right">{formValues.beveragePackage} Package</span>

                            <span className="text-white/40">Liquor Spirit Tier:</span>
                            <span className="text-right">{formValues.liquorTier} Tier</span>

                            <span className="text-white/40">Service Duration:</span>
                            <span className="text-right">{formValues.serviceDuration} Hours</span>
                          </div>
                        </div>

                        <p className="text-xs text-white/30 text-center leading-relaxed font-light">
                          By clicking submit below, you generate an official private inquiry request. Our event planner will reach out via email or phone to curate your final custom cocktails.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                      step === 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                    }`}
                  >
                    <ChevronLeft size={14} /> Back
                  </button>

                  {step < 11 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-8 py-3 bg-luxury-gold hover:bg-white text-luxury-black font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/10"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-10 py-3.5 bg-gradient-to-r from-luxury-gold to-yellow-600 hover:from-white hover:to-white text-luxury-black font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/15"
                    >
                      Submit Inquire Proposal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column: Live Price Summary Sidebar */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="glass-card p-6 sm:p-8 rounded-[32px] border-white/5 flex flex-col relative overflow-hidden">
                {/* Visual subtle glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

                <h3 className="font-serif text-2xl font-bold mb-6 pb-4 border-b border-white/5 text-luxury-gold tracking-wide">
                  Live Proposal Summary
                </h3>

                {/* Running parameters */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-light">
                    <span className="text-white/40">Curation Style</span>
                    <span>{formValues.beveragePackage} Package</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-light">
                    <span className="text-white/40">Spirit Level</span>
                    <span>{formValues.liquorTier} Tier</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-light">
                    <span className="text-white/40">Attendee Volume</span>
                    <span>{formValues.guestCount} guests</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-light">
                    <span className="text-white/40">Duration Request</span>
                    <span>{formValues.serviceDuration} hours</span>
                  </div>
                </div>

                {/* Itemized pricing breakdown */}
                <div className="space-y-3 mb-8 text-xs font-light">
                  <div className="flex justify-between">
                    <span className="text-white/40">Package Subtotal:</span>
                    <span>${breakdown.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Bar Setup Style:</span>
                    <span>${breakdown.barTypeFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {/* Expanded add-on breakdown */}
                  {breakdown.wineFee > 0 && (
                    <div className="flex justify-between text-[11px] pl-2 text-white/50">
                      <span>↳ Estate Wine Upgrade:</span>
                      <span>+${breakdown.wineFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {breakdown.champagneFee > 0 && (
                    <div className="flex justify-between text-[11px] pl-2 text-white/50">
                      <span>↳ Champagne Toast Service:</span>
                      <span>+${breakdown.champagneFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {breakdown.cocktailsFee > 0 && (
                    <div className="flex justify-between text-[11px] pl-2 text-white/50">
                      <span>↳ Signature Custom Mixology:</span>
                      <span>+${breakdown.cocktailsFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {breakdown.extraBarFee > 0 && (
                    <div className="flex justify-between text-[11px] pl-2 text-white/50">
                      <span>↳ Extra Service Stations ({formValues.additionalBarLocations}):</span>
                      <span>+${breakdown.extraBarFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  {breakdown.hourlyFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/40">Staffing Surcharge ({formValues.serviceDuration} hours):</span>
                      <span>${breakdown.hourlyFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="border-t border-white/5 pt-3 flex justify-between font-medium">
                    <span className="text-white/70">Operating Subtotal:</span>
                    <span>${breakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-[11px] text-white/40">
                    <span>Staff Service Gratuity (18%):</span>
                    <span>${breakdown.gratuity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/40">
                    <span>Tax & Licensing (8%):</span>
                    <span>${breakdown.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Grand total */}
                <div className="border-t border-luxury-gold/30 pt-5 mt-auto text-center">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-medium">Estimated Event Grand Total</div>
                  <div className="text-4xl sm:text-5xl font-serif font-bold text-luxury-gold leading-none mb-1">
                    ${breakdown.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest block font-medium">Fully Itemized Estimate</span>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-luxury-gray/50 border border-white/5 text-[10px] text-white/40 leading-relaxed font-light">
                  // DEMO FORMULA — replace with client's actual pricing logic from their Google Sheets/Apps Script
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
