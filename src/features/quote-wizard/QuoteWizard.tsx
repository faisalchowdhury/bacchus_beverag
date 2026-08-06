import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import {
  CHAMPAGNE_OPTIONS,
  LIQUOR_TIERS,
  RATES,
  SHELF_ACCESS,
  SIGNATURE_COCKTAIL_RATES,
  FULL_SHELF_RATES,
  WINE_BEER_TIERS,
  calculateQuote,
  money,
} from "./pricing";
import { INVENTORY } from "../../utils/inventory";
import { SHELF_CATEGORIES } from "../../types";
import {
  buildQuoteSubmission,
  submitQuoteRequest,
  type QuoteDeliveryResult,
} from "../../api/quote";
import { HONEYBOOK_PORTAL_URL, VENUE_NAME } from "../../config/business";
import type {
  ChampagneSelection,
  HouseAccountScope,
  LiquorMode,
  LiquorTier,
  QuoteFormValues,
  ToastServiceStyle,
  WineBeerTier,
} from "../../types";
import {
  Calendar, MapPin, Users, GlassWater, Wine, Martini,
  Sparkles, Layers, Clock, User, ChevronRight, ChevronLeft, CheckCircle2,
  Info, AlertTriangle, Wallet, Beer, ExternalLink, Loader2,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Event Information", desc: "Type, date, venue & times" },
  { id: 2, title: "Guest Count", desc: "Every guest, including minors" },
  { id: 3, title: "Glassware", desc: "Rental or client-supplied" },
  { id: 4, title: "Bar Type", desc: "Open, Cash or Consumption" },
  { id: 5, title: "Bar Stations", desc: "Beyond the permanent bar" },
  { id: 6, title: "Beer & Wine", desc: "Tier & Open Bar hours" },
  { id: 7, title: "Liquor & Cocktails", desc: "Shelf or signature drinks" },
  { id: 8, title: "Champagne Toast", desc: "Selection & service style" },
  { id: 9, title: "Account Options", desc: "House account or host tab" },
  { id: 10, title: "Your Information", desc: "Contact details" },
  { id: 11, title: "Review & Confirm", desc: "Itemized proposal" },
];

const TOTAL_STEPS = STEPS.length;

const HOUSE_ACCOUNT_SCOPES: HouseAccountScope[] = [
  "Wine & Beer Only",
  "Signature Cocktails",
  "Liquor Shelf Tiers",
  "Full Inventory",
];

/* ── Small presentational helpers ─────────────────────────────────── */

function StepHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Users;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 text-luxury-gold flex items-center justify-center flex-shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-2xl font-serif font-bold">{title}</h3>
        <p className="text-xs text-white/40 font-light">{subtitle}</p>
      </div>
    </div>
  );
}

function PolicyNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-luxury-gold/[0.06] border border-luxury-gold/20 p-4">
      <Info size={14} className="text-luxury-gold mt-0.5 flex-shrink-0" />
      <p className="text-[11px] text-white/60 leading-relaxed font-light">
        {children}{" "}
        <Link
          to="/important-information"
          className="text-luxury-gold hover:text-white underline underline-offset-2 transition-colors"
        >
          Read the full policy
        </Link>
      </p>
    </div>
  );
}

const inputClass =
  "w-full bg-luxury-charcoal border border-white/10 rounded-xl px-4 py-3.5 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/20 outline-none transition-colors";

const cardClass = (selected: boolean) =>
  `p-6 text-left rounded-2xl border transition-all duration-300 ${
    selected
      ? "bg-luxury-gold/10 border-luxury-gold shadow-lg shadow-luxury-gold/5"
      : "bg-luxury-charcoal/40 border-white/5 hover:border-white/20"
  }`;

/* ── The wizard ───────────────────────────────────────────────────── */

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [delivery, setDelivery] = useState<QuoteDeliveryResult | null>(null);

  const { register, handleSubmit, watch, control, setValue } = useForm<QuoteFormValues>({
    defaultValues: {
      eventType: "Wedding",
      eventDate: "",
      venueLocation: "",
      eventStartTime: "18:00",
      eventEndTime: "23:00",
      guestCount: 100,
      glasswareRental: true,
      barType: "Open Bar",
      additionalBarStations: 0,
      wineBeerTier: "Tier 1",
      openBarHours: 5,
      specialtyOrderRequest: "",
      specialtyOrderQuantity: 0,
      liquorMode: "Full Shelf",
      liquorTier: "Well",
      signatureCocktailCount: 2,
      signatureCocktails: [
        { name: "", liquors: [] },
        { name: "", liquors: [] },
        { name: "", liquors: [] },
        { name: "", liquors: [] },
      ],
      champagneToast: false,
      champagneSelection: "J. Roget Brut",
      champagneGuests: 100,
      champagneNonAlcoholicGuests: 0,
      toastTime: "20:00",
      toastServiceStyle: "Stationary Display",
      houseAccountAmount: RATES.houseAccountMinimum,
      houseAccountScope: "Full Inventory",
      openTab: false,
      tabRestrictions: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    },
  });

  const formValues = watch();

  /** The itemized proposal, derived from the form on every keystroke. */
  const breakdown = useMemo(
    () => calculateQuote(formValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(formValues)],
  );

  const isOpenBar = formValues.barType === "Open Bar";
  const isCashBar = formValues.barType === "Cash Bar";
  const isConsumptionBar = formValues.barType === "Consumption Bar";

  /* Open Bar hours can never exceed the event length. */
  useEffect(() => {
    if (breakdown.eventHours > 0 && Number(formValues.openBarHours) > breakdown.eventHours) {
      setValue("openBarHours", breakdown.eventHours);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakdown.eventHours]);

  /* Beer & wine is mandatory whenever liquor is selected. */
  useEffect(() => {
    if (isOpenBar && formValues.liquorMode !== "None" && formValues.wineBeerTier === "None") {
      setValue("wineBeerTier", "Tier 1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.liquorMode, formValues.wineBeerTier, isOpenBar]);

  /*
   * Liquors available for signature cocktails, limited to the shelves the
   * selected tier unlocks. Liqueurs & cordials are excluded — they pour across
   * every program as modifiers rather than counting as one of the two liquors.
   */
  const availableLiquors = useMemo(() => {
    const allowed = SHELF_ACCESS[formValues.liquorTier] ?? [];
    return INVENTORY.filter(
      (item) =>
        SHELF_CATEGORIES.includes(item.category) && allowed.includes(item.tier as LiquorTier),
    ).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  }, [formValues.liquorTier]);

  const cocktailCount = Math.min(
    Math.max(Math.round(Number(formValues.signatureCocktailCount)) || 1, 1),
    RATES.maxSignatureCocktails,
  );

  const toggleCocktailLiquor = (index: number, liquorName: string) => {
    const list = formValues.signatureCocktails ?? [];
    const current = list[index]?.liquors ?? [];
    const next = current.includes(liquorName)
      ? current.filter((l) => l !== liquorName)
      : current.length >= RATES.maxLiquorsPerCocktail
        ? current
        : [...current, liquorName];
    setValue(`signatureCocktails.${index}.liquors`, next);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onFormSubmit = async (data: QuoteFormValues) => {
    setIsSending(true);
    const submission = buildQuoteSubmission(data, breakdown, new Date().toISOString());
    const result = await submitQuoteRequest(submission);
    setDelivery(result);
    setIsSending(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-luxury-black py-28 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Bespoke <span className="gradient-text-gold font-serif">Beverage Designer</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Design your ideal event bar experience. Watch your itemized proposal update in real-time.
          </p>
        </div>

        {!isSubmitted && (
          <div className="text-center mb-14">
            <Link
              to="/important-information"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/[0.06] text-[11px] uppercase tracking-widest font-semibold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              <Info size={13} />
              Important Information — how selections affect pricing & staffing
            </Link>
          </div>
        )}

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl mx-auto p-12 text-center rounded-[32px] border-luxury-gold/20"
          >
            <div className="w-20 h-20 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              {delivery?.delivered ? "Quote Received" : "Your Quote Is Ready"}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
              Thank you,{" "}
              <span className="font-semibold text-white">{formValues.customerName}</span>.{" "}
              {delivery?.delivered
                ? `A copy of this quote has been sent to ${VENUE_NAME} along with your contact details.`
                : `Please save the summary below and share it with ${VENUE_NAME} to continue.`}
            </p>

            {/* HoneyBook is the only channel — no email or phone is published. */}
            <div className="rounded-2xl border border-luxury-gold/25 bg-luxury-gold/[0.06] p-6 text-left mb-8">
              <div className="flex items-start gap-3">
                <ExternalLink size={16} className="text-luxury-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-serif text-lg font-bold mb-1">Ready to move forward?</div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    To book your date or ask any questions, reach out to {VENUE_NAME} through your{" "}
                    <strong className="text-white/85">HoneyBook portal page</strong>. That is where
                    contracts, payments and all event correspondence are handled.
                  </p>
                  {HONEYBOOK_PORTAL_URL && (
                    <a
                      href={HONEYBOOK_PORTAL_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-luxury-gold text-luxury-black rounded-full font-semibold text-[11px] tracking-widest uppercase hover:bg-white transition-all duration-300"
                    >
                      Open HoneyBook Portal <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {!delivery?.delivered && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5 text-left mb-8 flex items-start gap-3">
                <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  {delivery?.reason === "not-configured"
                    ? "Automatic quote delivery is not switched on yet, so this quote has not been emailed. Please contact us through the HoneyBook portal above with your details."
                    : "We could not deliver your quote automatically. Please reach out through the HoneyBook portal above and we will pick it up from there."}
                </p>
              </div>
            )}
            <div className="bg-luxury-charcoal/50 rounded-2xl p-6 border border-white/5 text-left mb-8">
              <div className="text-sm font-semibold tracking-wide text-luxury-gold uppercase mb-2">
                Quote Summary Reference
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Guest Count:</span>
                <span>{formValues.guestCount} guests</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Bar Type:</span>
                <span>{formValues.barType}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Bartenders:</span>
                <span>
                  {breakdown.bartenderCount} across {breakdown.barStations} bar
                  {breakdown.barStations === 1 ? "" : "s"}
                </span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-white/50">Service Hours:</span>
                <span>{breakdown.eventHours} hrs</span>
              </div>
              <div className="flex justify-between text-sm py-2 text-luxury-gold font-bold">
                <span>Estimated Grand Total:</span>
                <span>{money(breakdown.grandTotal)}</span>
              </div>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed font-light mb-8">
              Once an invoice is created your guest count is locked and cannot be reduced. Guest
              count is verified on the day of the event.
            </p>
            <button
              onClick={() => {
                setValue("customerName", "");
                setValue("customerEmail", "");
                setValue("customerPhone", "");
                setValue("eventDate", "");
                setValue("venueLocation", "");
                setDelivery(null);
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
            {/* ── Left: wizard ─────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Progress */}
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-3">
                  <span>
                    Step {step} of {TOTAL_STEPS}: {STEPS[step - 1].title}
                  </span>
                  <span className="text-luxury-gold font-semibold">
                    {Math.round((step / TOTAL_STEPS) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-luxury-gold"
                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="glass-card p-8 sm:p-12 rounded-[32px] border-white/5"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[320px]"
                  >
                    {/* ── 1. Event Information ───────────────────── */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Calendar}
                          title="Event Details"
                          subtitle="Service hours are calculated from your start and end times."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Event Type
                            </label>
                            <select {...register("eventType")} className={inputClass}>
                              <option value="Wedding">Wedding</option>
                              <option value="Corporate Gala">Corporate Gala</option>
                              <option value="Private Celebration">Private Celebration</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Cocktail Party">Cocktail Party</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Event Date
                            </label>
                            <input
                              type="date"
                              {...register("eventDate", { required: true })}
                              className={inputClass}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs uppercase tracking-widest text-white/50 mb-2 font-medium flex items-center gap-1.5">
                            <MapPin size={12} className="text-luxury-gold" /> Venue Location / City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Bel-Air Country Club, Los Angeles"
                            {...register("venueLocation", { required: true })}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Service Start Time
                            </label>
                            <input
                              type="time"
                              {...register("eventStartTime", { required: true })}
                              className={inputClass}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Service End Time
                            </label>
                            <input
                              type="time"
                              {...register("eventEndTime", { required: true })}
                              className={inputClass}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { label: "Event Service", value: `${breakdown.eventHours} hrs` },
                            { label: "Setup + Teardown", value: `${RATES.staffingBufferHours} hrs` },
                            { label: "Total Staffed", value: `${breakdown.staffedHours} hrs` },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-luxury-charcoal/40 border border-white/5 rounded-xl px-4 py-3 text-center"
                            >
                              <div className="text-xl font-serif font-bold text-luxury-gold">
                                {stat.value}
                              </div>
                              <div className="text-[9px] uppercase tracking-widest text-white/40 font-medium">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <PolicyNote>
                          Staffing includes one hour before service for setup and one hour after for
                          teardown.
                        </PolicyNote>
                      </div>
                    )}

                    {/* ── 2. Guest Count ─────────────────────────── */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <StepHeading
                          icon={Users}
                          title="Total Guest Count"
                          subtitle="Include all guests, including minors."
                        />

                        <div className="py-8 text-center bg-luxury-charcoal/30 rounded-2xl border border-white/5">
                          <motion.div
                            key={formValues.guestCount}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-serif font-bold text-luxury-gold"
                          >
                            {formValues.guestCount}
                          </motion.div>
                          <span className="text-xs uppercase tracking-widest text-white/40 font-medium">
                            Total Guests
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Controller
                            control={control}
                            name="guestCount"
                            render={({ field }) => (
                              <input
                                type="range"
                                min="10"
                                max={RATES.publishedGuestCeiling}
                                step="1"
                                value={field.value}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="w-full accent-luxury-gold cursor-pointer"
                              />
                            )}
                          />
                          <div className="flex justify-between text-[10px] text-white/30 uppercase font-semibold">
                            <span>Min (10)</span>
                            <span>Max ({RATES.publishedGuestCeiling})</span>
                          </div>
                        </div>

                        <div className="bg-luxury-charcoal/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-serif text-lg font-bold">
                              Bartenders Assigned Automatically
                            </div>
                            <p className="text-[11px] text-white/40 font-light leading-relaxed mt-1">
                              50 or fewer = 2 · 51–125 = 3 · 126–200 = 4
                            </p>
                          </div>
                          <div className="text-center flex-shrink-0">
                            <div className="text-4xl font-serif font-bold text-luxury-gold leading-none">
                              {breakdown.baseBartenders}
                            </div>
                            <div className="text-[9px] uppercase tracking-widest text-white/40 font-medium mt-1">
                              Bartenders
                            </div>
                          </div>
                        </div>

                        <PolicyNote>
                          Mocktails and spirit-free liquors are available for guests under the legal
                          drinking age and anyone preferring a non-alcoholic option. Once an invoice
                          is created the guest count is locked and cannot be reduced, and it is
                          verified on the day of the event.
                        </PolicyNote>
                      </div>
                    )}

                    {/* ── 3. Glassware ───────────────────────────── */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={GlassWater}
                          title="Glassware Rental"
                          subtitle={`${money(RATES.glasswarePerGuest)} per guest, or supply your own.`}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setValue("glasswareRental", true)}
                            className={cardClass(formValues.glasswareRental)}
                          >
                            <div className="font-serif text-lg font-bold mb-1">
                              Rent Bacchus Glassware
                            </div>
                            <div className="text-lg text-luxury-gold font-serif font-semibold mb-3">
                              {money(RATES.glasswarePerGuest)}{" "}
                              <span className="text-xs text-white/50 font-sans font-light">
                                / guest
                              </span>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light">
                              Delivered, polished and stationed at every bar. Breakage fee included —
                              nothing extra if a glass goes down. {formValues.guestCount} guests ={" "}
                              {money(formValues.guestCount * RATES.glasswarePerGuest)}.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setValue("glasswareRental", false)}
                            className={cardClass(!formValues.glasswareRental)}
                          >
                            <div className="font-serif text-lg font-bold mb-1">
                              Decline — I'll Supply Drinkware
                            </div>
                            <div className="text-lg text-luxury-gold font-serif font-semibold mb-3">
                              {money(0)}
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light">
                              You commit to bringing your own glassware or disposables, delivered to
                              the bar staff before the service start time. Bacchus does not provide
                              disposable drinkware.
                            </p>
                          </button>
                        </div>

                        {!formValues.glasswareRental && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-4"
                          >
                            <AlertTriangle
                              size={14}
                              className="text-amber-400 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-[11px] text-white/60 leading-relaxed font-light">
                              By declining you are committing to supply drinkware for all{" "}
                              {formValues.guestCount} guests. It must reach the bar staff before
                              service begins — we cannot pour without it, and we do not carry
                              disposable cups as a backup.
                            </p>
                          </motion.div>
                        )}

                        <PolicyNote>
                          Glassware rental is {money(RATES.glasswarePerGuest)} per guest and the
                          breakage fee is included in that price.
                        </PolicyNote>
                      </div>
                    )}

                    {/* ── 4. Bar Type ────────────────────────────── */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Martini}
                          title="Bar Operations Style"
                          subtitle="This determines which beverage selections you preselect."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            {
                              value: "Open Bar",
                              label: "Open Bar",
                              badge: "Preselect beverages",
                              desc: "Billed in full to the host. Beer, wine and liquor priced per guest, per Open Bar hour.",
                            },
                            {
                              value: "Cash Bar",
                              label: "Cash Bar",
                              badge: `${money(RATES.cashBarAdminFee)} admin fee`,
                              desc: "Guests purchase their own drinks from available inventory. Nothing is preselected.",
                            },
                            {
                              value: "Consumption Bar",
                              label: "Consumption Bar",
                              badge: `${money(RATES.houseAccountMinimum)} house account`,
                              desc: "Prepaid account drawn down per drink. Guests pay individually once exhausted.",
                            },
                          ].map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() =>
                                setValue("barType", item.value as QuoteFormValues["barType"])
                              }
                              className={cardClass(formValues.barType === item.value)}
                            >
                              <div className="font-serif text-lg font-bold mb-1">{item.label}</div>
                              <div className="text-[10px] text-luxury-gold font-semibold uppercase mb-3">
                                {item.badge}
                              </div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">
                                {item.desc}
                              </p>
                            </button>
                          ))}
                        </div>

                        <PolicyNote>
                          The {money(RATES.cashBarAdminFee)} Cash Bar administrative fee becomes $0
                          on Open Bar and Consumption Bar. The {money(RATES.serviceFee)} service fee
                          applies to every package.
                        </PolicyNote>
                      </div>
                    )}

                    {/* ── 5. Bar Stations ────────────────────────── */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Layers}
                          title="Bar Stations"
                          subtitle="One permanent bar station is included in every package."
                        />

                        <div className="bg-luxury-charcoal/30 rounded-2xl p-6 border border-white/5">
                          <div className="flex items-start gap-3">
                            <CheckCircle2
                              size={16}
                              className="text-luxury-gold mt-0.5 flex-shrink-0"
                            />
                            <div>
                              <div className="font-serif text-lg font-bold">
                                Permanent Bar — Included
                              </div>
                              <p className="text-xs text-white/50 leading-relaxed font-light mt-1">
                                The fixed bar located next to the ballroom. No additional bar setup
                                fee.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-luxury-charcoal/30 rounded-2xl p-8 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                          <div>
                            <div className="font-serif text-xl font-bold mb-1">
                              Additional Bar Locations
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed font-light">
                              Each additional station requires one additional bartender, regardless
                              of guest count.
                            </p>
                            <span className="text-xs text-luxury-gold font-semibold uppercase mt-2 block">
                              + {money(RATES.additionalBarSetupFee)} setup · + 1 bartender each
                            </span>
                          </div>

                          <div className="flex items-center gap-4 bg-luxury-black border border-white/10 rounded-full px-4 py-2 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                const current = Number(formValues.additionalBarStations) || 0;
                                if (current > 0) setValue("additionalBarStations", current - 1);
                              }}
                              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-xl font-bold"
                            >
                              -
                            </button>
                            <span className="text-2xl font-serif font-bold text-luxury-gold w-12 text-center">
                              {formValues.additionalBarStations}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setValue(
                                  "additionalBarStations",
                                  (Number(formValues.additionalBarStations) || 0) + 1,
                                )
                              }
                              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-xl font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { label: "Total Bar Stations", value: breakdown.barStations },
                            {
                              label: "Bartenders by Guests",
                              value: breakdown.baseBartenders,
                            },
                            {
                              label: "Total Bartenders",
                              value: breakdown.bartenderCount,
                            },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-luxury-charcoal/40 border border-white/5 rounded-xl px-4 py-3 text-center"
                            >
                              <div className="text-xl font-serif font-bold text-luxury-gold">
                                {stat.value}
                              </div>
                              <div className="text-[9px] uppercase tracking-widest text-white/40 font-medium">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── 6. Beer & Wine ─────────────────────────── */}
                    {step === 6 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Beer}
                          title="Beer & Unfortified Wine"
                          subtitle="Priced per guest, per Open Bar hour."
                        />

                        {isOpenBar ? (
                          <>
                            <div className="space-y-3">
                              {WINE_BEER_TIERS.map((tier) => {
                                const locked =
                                  tier.id === "None" && formValues.liquorMode !== "None";
                                return (
                                  <button
                                    key={tier.id}
                                    type="button"
                                    disabled={locked}
                                    onClick={() => setValue("wineBeerTier", tier.id as WineBeerTier)}
                                    className={`w-full flex justify-between items-center gap-4 ${cardClass(
                                      formValues.wineBeerTier === tier.id,
                                    )} ${locked ? "opacity-30 cursor-not-allowed" : ""}`}
                                  >
                                    <div className="text-left">
                                      <div className="font-serif text-lg font-bold mb-1">
                                        {tier.label}
                                      </div>
                                      <p className="text-xs text-white/50 leading-relaxed font-light">
                                        {tier.description}
                                      </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <div className="text-lg text-luxury-gold font-serif font-semibold">
                                        {money(tier.rate)}
                                      </div>
                                      <div className="text-[9px] text-white/40 uppercase font-medium">
                                        guest / hour
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            <div className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-baseline">
                                <label className="text-xs uppercase tracking-widest text-white/50 font-medium">
                                  Open Bar Hours
                                </label>
                                <span className="text-2xl font-serif font-bold text-luxury-gold">
                                  {formValues.openBarHours} of {breakdown.eventHours} hrs
                                </span>
                              </div>
                              <Controller
                                control={control}
                                name="openBarHours"
                                render={({ field }) => (
                                  <input
                                    type="range"
                                    min="0"
                                    max={Math.max(breakdown.eventHours, 1)}
                                    step="0.5"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="w-full accent-luxury-gold cursor-pointer"
                                  />
                                )}
                              />
                              <p className="text-[11px] text-white/40 font-light leading-relaxed">
                                Hourly beverage rates apply only to the hours you choose to offer an
                                Open Bar. Bartenders remain staffed for the full event.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="rounded-2xl border border-white/5 bg-luxury-charcoal/40 p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto mb-4">
                              <Wine size={20} />
                            </div>
                            <div className="font-serif text-lg font-bold mb-2">
                              Not preselected on a {formValues.barType}
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light max-w-md mx-auto">
                              Beer and wine pricing applies only to Open Bar packages, so this
                              calculates as {money(0)}. Drinks are served from available inventory on
                              the day of the event.
                            </p>
                          </div>
                        )}

                        <div className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Specialty Beer or Wine Request (Optional)
                            </label>
                            <textarea
                              rows={2}
                              placeholder="e.g. 2 cases of a specific regional rosé"
                              {...register("specialtyOrderRequest")}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Desired Quantity
                            </label>
                            <Controller
                              control={control}
                              name="specialtyOrderQuantity"
                              render={({ field }) => (
                                <input
                                  type="number"
                                  min="0"
                                  value={field.value || ""}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  className={`${inputClass} w-40`}
                                />
                              )}
                            />
                          </div>
                          <p className="text-[11px] text-white/40 font-light leading-relaxed">
                            We make every reasonable effort to obtain requested products, but
                            availability cannot be guaranteed. Approved specialty orders are
                            purchased in advance and added to the final invoice — they are not
                            included in the estimate below.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ── 7. Liquor & Signature Cocktails ────────── */}
                    {step === 7 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Sparkles}
                          title="Liquor & Signature Cocktails"
                          subtitle="Priced per guest, per Open Bar hour."
                        />

                        {isOpenBar ? (
                          <>
                            {/* Shelf tier */}
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                                Liquor Shelf Tier
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {LIQUOR_TIERS.map((tier) => (
                                  <button
                                    key={tier.id}
                                    type="button"
                                    onClick={() => setValue("liquorTier", tier.id)}
                                    className={cardClass(formValues.liquorTier === tier.id)}
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="font-serif text-lg font-bold">
                                        {tier.label}
                                      </div>
                                      <div className="text-[10px] text-luxury-gold font-semibold bg-luxury-gold/10 px-2 py-0.5 rounded border border-luxury-gold/20">
                                        {money(FULL_SHELF_RATES[tier.id])} full
                                      </div>
                                    </div>
                                    <p className="text-xs text-white/50 leading-relaxed font-light">
                                      {tier.accessNote}
                                    </p>
                                    <p className="text-[10px] text-white/35 font-light mt-2">
                                      Signature cocktails{" "}
                                      {money(SIGNATURE_COCKTAIL_RATES[tier.id][0])} –{" "}
                                      {money(SIGNATURE_COCKTAIL_RATES[tier.id][3])} / guest / hour
                                    </p>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Mode */}
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                                How Should Liquor Be Offered?
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {(
                                  [
                                    {
                                      value: "Full Shelf",
                                      label: "Full Shelf Access",
                                      price: money(FULL_SHELF_RATES[formValues.liquorTier]),
                                      desc: `Guests order freely across the ${formValues.liquorTier} shelf and everything below it.`,
                                    },
                                    {
                                      value: "Signature Cocktails",
                                      label: "Signature Cocktails",
                                      price: money(
                                        SIGNATURE_COCKTAIL_RATES[formValues.liquorTier][
                                          cocktailCount - 1
                                        ],
                                      ),
                                      desc: `A curated list of ${cocktailCount} cocktail${cocktailCount > 1 ? "s" : ""} instead of full shelf access.`,
                                    },
                                    {
                                      value: "None",
                                      label: "No Liquor",
                                      price: money(0),
                                      desc: "Beer and wine only. This section calculates as $0.",
                                    },
                                  ] as const
                                ).map((item) => (
                                  <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setValue("liquorMode", item.value as LiquorMode)}
                                    className={cardClass(formValues.liquorMode === item.value)}
                                  >
                                    <div className="font-serif text-lg font-bold mb-1">
                                      {item.label}
                                    </div>
                                    <div className="text-lg text-luxury-gold font-serif font-semibold mb-3">
                                      {item.price}
                                      <span className="text-[10px] text-white/40 font-sans font-light">
                                        {" "}
                                        / guest / hr
                                      </span>
                                    </div>
                                    <p className="text-xs text-white/50 leading-relaxed font-light">
                                      {item.desc}
                                    </p>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Signature cocktail builder */}
                            {formValues.liquorMode === "Signature Cocktails" && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-5"
                              >
                                <div>
                                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                                    How Many Signature Cocktails?
                                  </label>
                                  <div className="flex gap-3">
                                    {[1, 2, 3, 4].map((n) => (
                                      <button
                                        key={n}
                                        type="button"
                                        onClick={() => setValue("signatureCocktailCount", n)}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                                          cocktailCount === n
                                            ? "bg-luxury-gold text-luxury-black border-luxury-gold"
                                            : "bg-luxury-black border-white/10 text-white/60 hover:border-white/30"
                                        }`}
                                      >
                                        {n}
                                        <span className="block text-[9px] font-normal opacity-70">
                                          {money(SIGNATURE_COCKTAIL_RATES[formValues.liquorTier][n - 1])}
                                          /g/hr
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {Array.from({ length: cocktailCount }).map((_, index) => {
                                  const selected =
                                    formValues.signatureCocktails?.[index]?.liquors ?? [];
                                  return (
                                    <div
                                      key={index}
                                      className="rounded-xl bg-luxury-black/60 border border-white/5 p-4 space-y-3"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold flex-shrink-0">
                                          #{index + 1}
                                        </span>
                                        <input
                                          type="text"
                                          placeholder="Cocktail name"
                                          {...register(`signatureCocktails.${index}.name`)}
                                          className="flex-1 bg-luxury-charcoal border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-luxury-gold outline-none transition-colors"
                                        />
                                      </div>
                                      <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium mb-2">
                                          Choose up to {RATES.maxLiquorsPerCocktail} liquors from the{" "}
                                          {formValues.liquorTier} tier ({selected.length}/
                                          {RATES.maxLiquorsPerCocktail})
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {availableLiquors.map((liquor) => {
                                            const isOn = selected.includes(liquor.name);
                                            const full =
                                              !isOn &&
                                              selected.length >= RATES.maxLiquorsPerCocktail;
                                            return (
                                              <button
                                                key={liquor.id}
                                                type="button"
                                                disabled={full}
                                                onClick={() =>
                                                  toggleCocktailLiquor(index, liquor.name)
                                                }
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all duration-200 ${
                                                  isOn
                                                    ? "bg-luxury-gold text-luxury-black border-luxury-gold"
                                                    : full
                                                      ? "border-white/5 text-white/20 cursor-not-allowed"
                                                      : "border-white/10 text-white/60 hover:border-luxury-gold/50 hover:text-white"
                                                }`}
                                              >
                                                {liquor.name}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}

                            {formValues.liquorMode !== "None" && (
                              <PolicyNote>
                                Whenever liquor is selected, beer & wine is mandatory and its per
                                guest per hour cost is included in the itemized proposal.
                              </PolicyNote>
                            )}
                          </>
                        ) : (
                          <div className="rounded-2xl border border-white/5 bg-luxury-charcoal/40 p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto mb-4">
                              <Sparkles size={20} />
                            </div>
                            <div className="font-serif text-lg font-bold mb-2">
                              Automatically {money(0)} on a {formValues.barType}
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light max-w-md mx-auto">
                              This section only applies to Open Bar packages. Switch to an Open Bar
                              in step 4 to select signature cocktails or full shelf access.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── 8. Champagne Toast ─────────────────────── */}
                    {step === 8 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Wine}
                          title="Champagne Toast"
                          subtitle="Priced per guest receiving champagne."
                        />

                        <button
                          type="button"
                          onClick={() => setValue("champagneToast", !formValues.champagneToast)}
                          className={`w-full flex justify-between items-center ${cardClass(
                            formValues.champagneToast,
                          )}`}
                        >
                          <div className="max-w-[70%] text-left">
                            <div className="font-serif text-lg font-bold mb-1">
                              Add a Champagne Toast
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light">
                              A dedicated pour served prior to speeches and toasts, with sparkling
                              grape juice for non-alcoholic guests.
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg text-luxury-gold font-serif font-semibold">
                              {formValues.champagneToast ? money(breakdown.champagneFee) : "—"}
                            </div>
                            <div className="text-[9px] text-white/40 uppercase font-medium">
                              {formValues.champagneToast ? "current total" : "not added"}
                            </div>
                          </div>
                        </button>

                        {formValues.champagneToast && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <div className="space-y-3">
                              {CHAMPAGNE_OPTIONS.map((option) => (
                                <button
                                  key={option.id}
                                  type="button"
                                  onClick={() =>
                                    setValue(
                                      "champagneSelection",
                                      option.id as ChampagneSelection,
                                    )
                                  }
                                  className={`w-full flex justify-between items-center ${cardClass(
                                    formValues.champagneSelection === option.id,
                                  )}`}
                                >
                                  <span className="font-serif text-base font-bold text-left">
                                    {option.label}
                                  </span>
                                  <span className="text-right flex-shrink-0">
                                    <span className="block text-lg text-luxury-gold font-serif font-semibold">
                                      {money(option.pricePerGuest)}
                                    </span>
                                    <span className="block text-[9px] text-white/40 uppercase font-medium">
                                      per guest
                                    </span>
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                  Guests Receiving Champagne
                                </label>
                                <Controller
                                  control={control}
                                  name="champagneGuests"
                                  render={({ field }) => (
                                    <input
                                      type="number"
                                      min="0"
                                      value={field.value || ""}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className={inputClass}
                                    />
                                  )}
                                />
                              </div>
                              <div>
                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                  Sparkling Grape Juice
                                </label>
                                <Controller
                                  control={control}
                                  name="champagneNonAlcoholicGuests"
                                  render={({ field }) => (
                                    <input
                                      type="number"
                                      min="0"
                                      value={field.value || ""}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                      className={inputClass}
                                    />
                                  )}
                                />
                              </div>
                              <div>
                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                  Time of the Toast
                                </label>
                                <input
                                  type="time"
                                  {...register("toastTime")}
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                  Service Style
                                </label>
                                <select
                                  {...register("toastServiceStyle")}
                                  className={inputClass}
                                >
                                  {(
                                    [
                                      "Stationary Display",
                                      "Bar Cart / Table Service",
                                    ] as ToastServiceStyle[]
                                  ).map((style) => (
                                    <option key={style} value={style}>
                                      {style}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* ── 9. Account Options ─────────────────────── */}
                    {step === 9 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Wallet}
                          title="Account Options"
                          subtitle="How the bar is funded on the day of the event."
                        />

                        {isConsumptionBar && (
                          <div className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-5">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                Prepaid House Account
                              </label>
                              <Controller
                                control={control}
                                name="houseAccountAmount"
                                render={({ field }) => (
                                  <input
                                    type="number"
                                    min={RATES.houseAccountMinimum}
                                    step="100"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className={inputClass}
                                  />
                                )}
                              />
                              <p className="text-[11px] text-white/40 font-light mt-2 leading-relaxed">
                                Minimum {money(RATES.houseAccountMinimum)}. Functions like a prepaid
                                gift card — drinks are deducted as they are purchased, and once the
                                balance is exhausted guests become individually responsible.
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3 font-medium">
                                Limit the Account To
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {HOUSE_ACCOUNT_SCOPES.map((scope) => (
                                  <button
                                    key={scope}
                                    type="button"
                                    onClick={() => setValue("houseAccountScope", scope)}
                                    className={`px-4 py-3 rounded-xl border text-xs font-medium transition-all duration-300 ${
                                      formValues.houseAccountScope === scope
                                        ? "bg-luxury-gold/10 border-luxury-gold text-white"
                                        : "bg-luxury-black border-white/10 text-white/60 hover:border-white/30"
                                    }`}
                                  >
                                    {scope}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <PolicyNote>
                              Taxes are exempt on drinks charged against the house account.
                              Gratuities are welcomed but not required.
                            </PolicyNote>
                          </div>
                        )}

                        {isCashBar && (
                          <div className="space-y-4">
                            <button
                              type="button"
                              onClick={() => setValue("openTab", !formValues.openTab)}
                              className={`w-full flex justify-between items-center ${cardClass(
                                formValues.openTab,
                              )}`}
                            >
                              <div className="max-w-[75%] text-left">
                                <div className="font-serif text-lg font-bold mb-1">
                                  Open a Tab for Guests
                                </div>
                                <p className="text-xs text-white/50 leading-relaxed font-light">
                                  Place restrictions on drink types, specific guests, or spending
                                  limits.
                                </p>
                              </div>
                              <span className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gold flex-shrink-0">
                                {formValues.openTab ? "Added" : "Add"}
                              </span>
                            </button>

                            {formValues.openTab && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-luxury-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-4"
                              >
                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                  Tab Restrictions
                                </label>
                                <textarea
                                  rows={3}
                                  placeholder="e.g. beer & wine only, wedding party only, $1,500 cap"
                                  {...register("tabRestrictions")}
                                  className={inputClass}
                                />
                                <div className="flex items-start gap-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-4">
                                  <AlertTriangle
                                    size={14}
                                    className="text-amber-400 mt-0.5 flex-shrink-0"
                                  />
                                  <p className="text-[11px] text-white/60 leading-relaxed font-light">
                                    Tabs must be closed before the event concludes. A tab left open
                                    automatically incurs a {RATES.openTabGratuityRate * 100}%
                                    gratuity.
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {isOpenBar && (
                          <div className="rounded-2xl border border-white/5 bg-luxury-charcoal/40 p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 flex items-center justify-center mx-auto mb-4">
                              <Wallet size={20} />
                            </div>
                            <div className="font-serif text-lg font-bold mb-2">
                              Nothing needed for an Open Bar
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-light max-w-md mx-auto">
                              House accounts apply to Consumption Bars and host tabs apply to Cash
                              Bars. Your Open Bar is billed in full on the proposal, and the{" "}
                              {money(RATES.cashBarAdminFee)} Cash Bar administrative fee is waived.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── 10. Customer Information ───────────────── */}
                    {step === 10 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={User}
                          title="Your Information"
                          subtitle="Where can our private concierge reach you with the final proposal?"
                        />

                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                              Full Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Charlotte DuPont"
                              {...register("customerName", { required: true })}
                              className={inputClass}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                Email Address
                              </label>
                              <input
                                type="email"
                                placeholder="e.g. charlotte@domain.com"
                                {...register("customerEmail", { required: true })}
                                className={inputClass}
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                placeholder="e.g. +1 (310) 555-0155"
                                {...register("customerPhone", { required: true })}
                                className={inputClass}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── 11. Review ─────────────────────────────── */}
                    {step === 11 && (
                      <div className="space-y-6">
                        <StepHeading
                          icon={Clock}
                          title="Review Your Bar Program"
                          subtitle="Confirm the full itemized estimate before submitting."
                        />

                        <div className="bg-luxury-charcoal/30 border border-white/5 rounded-2xl p-6">
                          <div className="grid grid-cols-2 gap-y-3 text-sm font-light">
                            {[
                              ["Event Type", formValues.eventType],
                              ["Event Date", formValues.eventDate || "—"],
                              ["Venue", formValues.venueLocation || "—"],
                              [
                                "Service Window",
                                `${formValues.eventStartTime} – ${formValues.eventEndTime} (${breakdown.eventHours} hrs)`,
                              ],
                              ["Total Guests", `${formValues.guestCount}`],
                              [
                                "Glassware",
                                formValues.glasswareRental ? "Bacchus rental" : "Client supplied",
                              ],
                              ["Bar Type", formValues.barType],
                              [
                                "Bar Stations",
                                `${breakdown.barStations} (1 permanent + ${formValues.additionalBarStations})`,
                              ],
                              [
                                "Bartenders",
                                `${breakdown.bartenderCount} (${breakdown.baseBartenders} by guest count + ${breakdown.additionalBartenders})`,
                              ],
                              [
                                "Beer & Wine",
                                isOpenBar ? formValues.wineBeerTier : "Not preselected",
                              ],
                              [
                                "Liquor",
                                isOpenBar
                                  ? formValues.liquorMode === "None"
                                    ? "None"
                                    : formValues.liquorMode === "Full Shelf"
                                      ? `Full ${formValues.liquorTier} Shelf`
                                      : `${cocktailCount} × ${formValues.liquorTier} Signature Cocktails`
                                  : "Not preselected",
                              ],
                              [
                                "Open Bar Hours",
                                isOpenBar ? `${breakdown.openBarHours} hrs` : "—",
                              ],
                              [
                                "Champagne Toast",
                                formValues.champagneToast
                                  ? `${formValues.champagneSelection} · ${formValues.champagneGuests} guests · ${formValues.toastServiceStyle}`
                                  : "Not added",
                              ],
                            ].map(([label, value]) => (
                              <div key={label} className="contents">
                                <span className="text-white/40">{label}:</span>
                                <span className="text-right">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {formValues.liquorMode === "Signature Cocktails" && isOpenBar && (
                          <div className="bg-luxury-charcoal/30 border border-white/5 rounded-2xl p-6 space-y-2">
                            <div className="text-xs uppercase tracking-widest text-luxury-gold font-semibold mb-3">
                              Signature Cocktails
                            </div>
                            {Array.from({ length: cocktailCount }).map((_, i) => {
                              const c = formValues.signatureCocktails?.[i];
                              return (
                                <div
                                  key={i}
                                  className="flex justify-between text-xs font-light border-b border-white/5 pb-2"
                                >
                                  <span>{c?.name?.trim() || `Cocktail #${i + 1} — unnamed`}</span>
                                  <span className="text-white/40 text-right">
                                    {c?.liquors?.length ? c.liquors.join(" + ") : "No liquors chosen"}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {breakdown.warnings.length > 0 && (
                          <div className="rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 p-5 space-y-2">
                            {breakdown.warnings.map((warning) => (
                              <div key={warning} className="flex items-start gap-3">
                                <AlertTriangle
                                  size={13}
                                  className="text-amber-400 mt-0.5 flex-shrink-0"
                                />
                                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                                  {warning}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-white/30 text-center leading-relaxed font-light">
                          By submitting you generate an official private inquiry request. Our event
                          planner will reach out to finalize your program. Taxes apply to every
                          event cost except staffing fees.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
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

                  {step < TOTAL_STEPS ? (
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
                      disabled={isSending}
                      className="flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-luxury-gold to-yellow-600 hover:from-white hover:to-white text-luxury-black font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-luxury-gold/15 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Sending…
                        </>
                      ) : (
                        "Submit Quote Request"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ── Right: live proposal ─────────────────────────────── */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="glass-card p-6 sm:p-8 rounded-[32px] border-white/5 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

                <h3 className="font-serif text-2xl font-bold mb-6 pb-4 border-b border-white/5 text-luxury-gold tracking-wide">
                  Live Proposal Summary
                </h3>

                {/* Event facts */}
                <div className="space-y-1.5 mb-7">
                  {[
                    ["Bar Type", formValues.barType],
                    ["Total Guests", `${formValues.guestCount}`],
                    [
                      "Bartenders",
                      `${breakdown.bartenderCount} · ${breakdown.barStations} bar${breakdown.barStations === 1 ? "" : "s"}`,
                    ],
                    ["Service Hours", `${breakdown.eventHours} hrs`],
                    ["Staffed Hours", `${breakdown.staffedHours} hrs`],
                    ...(isOpenBar
                      ? [["Open Bar Hours", `${breakdown.openBarHours} hrs`] as [string, string]]
                      : []),
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between text-xs py-1.5 border-b border-white/5 font-light"
                    >
                      <span className="text-white/40">{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Itemized */}
                <div className="space-y-3 mb-7 text-xs font-light">
                  {breakdown.lineItems.map((item) => (
                    <div key={item.id} className={item.informational ? "opacity-45" : ""}>
                      <div className="flex justify-between gap-2">
                        <span className="text-white/70">{item.label}</span>
                        <span className="flex-shrink-0 tabular-nums">{money(item.amount)}</span>
                      </div>
                      {item.detail && (
                        <div className="text-[10px] text-white/35 mt-0.5 pr-14 leading-snug">
                          {item.detail}
                          {item.taxExempt && (
                            <span className="text-luxury-gold/70"> · tax exempt</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Roll-up */}
                <div className="space-y-2.5 text-xs font-light border-t border-white/5 pt-4">
                  <div className="flex justify-between font-medium">
                    <span className="text-white/70">Subtotal</span>
                    <span className="tabular-nums">{money(breakdown.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/40">
                    <span>Gratuity ({RATES.gratuityRate * 100}%)</span>
                    <span className="tabular-nums">{money(breakdown.gratuity)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/40">
                    <span>Tax ({RATES.taxRate * 100}% of {money(breakdown.taxableBase)})</span>
                    <span className="tabular-nums">{money(breakdown.tax)}</span>
                  </div>
                  <div className="text-[10px] text-white/30 leading-snug">
                    Tax base = subtotal + gratuity − {money(breakdown.taxExemptTotal)} exempt
                    charges.
                  </div>
                </div>

                {/* Grand total */}
                <div className="border-t border-luxury-gold/30 pt-5 mt-5 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-medium">
                    Estimated Event Grand Total
                  </div>
                  <div className="text-4xl sm:text-[2.75rem] font-serif font-bold text-luxury-gold leading-none mb-1">
                    {money(breakdown.grandTotal)}
                  </div>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest block font-medium">
                    Fully Itemized Estimate
                  </span>
                </div>

                {/* Warnings */}
                {breakdown.warnings.length > 0 && (
                  <div className="mt-6 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-4 space-y-2">
                    {breakdown.warnings.map((warning) => (
                      <div key={warning} className="flex items-start gap-2.5">
                        <AlertTriangle
                          size={12}
                          className="text-amber-400 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-[10px] text-white/55 leading-relaxed font-light">
                          {warning}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  to="/important-information"
                  className="mt-6 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-luxury-gray/50 border border-white/5 text-[10px] uppercase tracking-widest font-semibold text-white/50 hover:text-luxury-gold hover:border-luxury-gold/30 transition-all duration-300"
                >
                  <Info size={12} /> How pricing is calculated
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
