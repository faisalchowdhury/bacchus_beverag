import { useEffect, useState } from "react";
import { Link } from "react-router";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import {
  BARTENDER_TIERS,
  CHAMPAGNE_OPTIONS,
  FULL_SHELF_RATES,
  LIQUOR_TIERS,
  RATES,
  SIGNATURE_COCKTAIL_RATES,
  WINE_BEER_TIERS,
  money,
} from "../../features/quote-wizard/pricing";
import { ArrowRight, Info, AlertTriangle, Calculator } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   Section order below is deliberate — later sections reference
   earlier ones. Keep it as-is.
   ────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "guest-count", label: "Guest Count" },
  { id: "glassware", label: "Glassware Rental + Breakage Fee" },
  { id: "total-bartenders", label: "Total Bartenders" },
  { id: "staffing-fee", label: "Staffing Fee" },
  { id: "beer-wine", label: "Beer & Unfortified Wine" },
  { id: "open-bar-pricing", label: "Open Bar Pricing" },
  { id: "bar-minimum", label: "Bar Minimum Fee" },
  { id: "liquor", label: "Liquor & Signature Cocktails" },
  { id: "champagne-toast", label: "Champagne Toast" },
  { id: "cash-bar", label: "Cash Bar" },
  { id: "service-fee", label: "Service Fee" },
  { id: "consumption-bar", label: "Consumption Bar" },
  { id: "gratuity", label: "Gratuity" },
  { id: "taxes", label: "Taxes" },
];

/* ── Building blocks ──────────────────────────────────────────────── */

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-b border-white/5 pb-12 mb-12 last:border-0 last:mb-0">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-xs font-sans font-semibold text-luxury-gold/50 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">{title}</h2>
      </div>
      <div className="space-y-5 text-sm sm:text-[0.95rem] text-white/60 font-light leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-[0.5rem] flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RateTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-luxury-charcoal/40 overflow-hidden">
      {caption && (
        <div className="px-5 py-3 border-b border-white/5 text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={`px-5 py-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold whitespace-nowrap ${
                    i > 0 ? "text-right" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-t border-white/5">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-5 py-3 font-light whitespace-nowrap ${
                      c === 0
                        ? "text-white/70"
                        : "text-right text-luxury-gold font-sans tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning" | "formula";
  children: React.ReactNode;
}) {
  const tones = {
    info: {
      wrap: "bg-luxury-gold/[0.06] border-luxury-gold/20",
      icon: <Info size={15} className="text-luxury-gold mt-0.5 flex-shrink-0" />,
    },
    warning: {
      wrap: "bg-amber-500/[0.06] border-amber-500/20",
      icon: <AlertTriangle size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />,
    },
    formula: {
      wrap: "bg-luxury-black border-luxury-gold/30",
      icon: <Calculator size={15} className="text-luxury-gold mt-0.5 flex-shrink-0" />,
    },
  }[tone];

  return (
    <div className={`flex items-start gap-3 rounded-2xl border p-5 ${tones.wrap}`}>
      {tones.icon}
      <div className="text-sm text-white/70 leading-relaxed font-light space-y-2">{children}</div>
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <code className="block font-sans text-base sm:text-lg text-luxury-champagne tracking-wide">
      {children}
    </code>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ImportantInformation() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-gradient-to-b from-luxury-charcoal to-luxury-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-luxury-gold font-sans font-semibold mb-3 block">
            Policies, Pricing & Staffing
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Important <span className="gradient-text-gold font-serif">Information</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Everything that explains how your selections affect pricing, staffing and service. The
            questionnaire collects your details — this page explains what those details mean. Keep it
            open for reference while you build your quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300"
            >
              Start Your Quote <ArrowRight size={14} />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-luxury-gold hover:text-luxury-gold text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-all duration-300"
            >
              View Rate Card
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14 items-start">
            {/* TOC */}
            <aside className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="glass-card rounded-[28px] border-white/5 p-6">
                <h3 className="text-xs uppercase tracking-widest text-luxury-gold font-semibold mb-5">
                  On This Page
                </h3>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map((section, i) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpTo(section.id);
                      }}
                      className={`flex items-baseline gap-2.5 px-3 py-2 rounded-lg text-xs font-light transition-all duration-300 ${
                        activeSection === section.id
                          ? "bg-luxury-gold/10 text-luxury-gold font-medium"
                          : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="tabular-nums opacity-50 text-[10px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-[32px] border-white/5 p-7 sm:p-10 lg:p-12">
                {/* 01 — Guest Count */}
                <Section id="guest-count" index={1} title="Guest Count">
                  <p>
                    Clients must include <strong className="text-white/85">all guests</strong>,
                    including minors, in their total guest count.
                  </p>
                  <p>
                    Mocktails will be available for guests under the legal drinking age, non-drinkers,
                    or anyone who prefers a non-alcoholic option. We also offer spirit-free liquors
                    that provide the complexity of traditional cocktails for guests who want a
                    sophisticated non-alcoholic beverage.
                  </p>
                  <p className="text-white/75">An accurate guest count is extremely important because:</p>
                  <Bullets
                    items={[
                      "Once an invoice is created, the guest count is locked and cannot be reduced even if fewer guests ultimately attend.",
                      "Guest count will be verified on the day of the event.",
                      "If additional guests attend beyond the invoiced guest count, the client is responsible for paying the additional cost before bar service begins.",
                    ]}
                  />
                </Section>

                {/* 02 — Glassware */}
                <Section id="glassware" index={2} title="Glassware Rental + Breakage Fee">
                  <p>
                    Glassware rental is{" "}
                    <strong className="text-luxury-gold">
                      {money(RATES.glasswarePerGuest)} per guest
                    </strong>
                    , and this <strong className="text-white/85">includes the breakage fee</strong> —
                    there is no separate charge for broken glassware.
                  </p>
                  <p>
                    Clients may decline glassware rental. Declining is a commitment to provide their
                    own glassware or disposable drinkware, and all of it must be delivered to the bar
                    staff prior to the service start time.
                  </p>
                  <Callout tone="warning">
                    <p>
                      Bacchus does not provide disposable drinkware. If you decline the rental and
                      nothing arrives before service begins, we have nothing to pour into.
                    </p>
                  </Callout>
                </Section>

                {/* 03 — Total Bartenders */}
                <Section id="total-bartenders" index={3} title="Total Bartenders">
                  <p>Bartending staff is determined automatically by guest count.</p>
                  <RateTable
                    caption="Bartenders included by guest count"
                    columns={["Guest Count", "Bartenders"]}
                    rows={BARTENDER_TIERS.map((tier) => [tier.label, tier.bartenders])}
                  />
                  <p>
                    <strong className="text-white/85">
                      One permanent bar station — the fixed bar located next to the ballroom — is
                      included in every package at no additional charge.
                    </strong>{" "}
                    This included bar station does not incur the additional bar setup fee.
                  </p>
                  <p>
                    If the client requests service from any additional bar location beyond the
                    included permanent bar, each additional bar station will require:
                  </p>
                  <Bullets
                    items={[
                      "One additional bartender, regardless of guest count.",
                      <>
                        One{" "}
                        <strong className="text-luxury-gold">
                          {money(RATES.additionalBarSetupFee)}
                        </strong>{" "}
                        additional bar setup fee per added bar station.
                      </>,
                    ]}
                  />
                  <p>
                    These requirements apply to each additional bar location requested beyond the one
                    permanent bar included in every package.
                  </p>
                </Section>

                {/* 04 — Staffing Fee */}
                <Section id="staffing-fee" index={4} title="Staffing Fee">
                  <p>Staffing fees are based on the total number of bartenders.</p>
                  <Bullets
                    items={[
                      <>
                        Bartender rate:{" "}
                        <strong className="text-luxury-gold">
                          {money(RATES.bartenderHourlyRate)}/hour
                        </strong>{" "}
                        per bartender
                      </>,
                      "Service hours are calculated from the event start and end times entered by the client.",
                    ]}
                  />
                  <p className="text-white/75">The staffing calculation includes:</p>
                  <Bullets
                    items={[
                      "One hour before service for setup / preparation",
                      "Event service hours",
                      "One hour after service for teardown",
                    ]}
                  />
                  <Callout tone="formula">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                      Staffing Fee
                    </p>
                    <Formula>
                      (Total Event Hours + {RATES.staffingBufferHours}) × Number of Bartenders ×{" "}
                      {money(RATES.bartenderHourlyRate)}
                    </Formula>
                  </Callout>
                </Section>

                {/* 05 — Beer & Unfortified Wine */}
                <Section id="beer-wine" index={5} title="Beer & Unfortified Wine">
                  <p>We regularly stock six beer selections.</p>
                  <p>
                    Clients may request specialty beer or wine orders. We will make every reasonable
                    effort to obtain requested products; however, availability cannot be guaranteed.
                  </p>
                  <p>
                    If approved, specialty orders require the client to specify the desired quantity,
                    and the cost will be added to the final invoice.
                  </p>

                  <h3 className="text-lg font-serif font-bold text-white/85 pt-2">Pricing</h3>
                  <p>Beer and wine pricing applies only to Open Bar packages.</p>
                  <p>If a client selects either:</p>
                  <Bullets items={["Cash Bar", "Consumption Bar"]} />
                  <p>
                    they may still request specialty beer or wine orders. If approved, those specialty
                    items will be purchased in advance and billed similarly to an Open Bar item.
                  </p>
                </Section>

                {/* 06 — Open Bar Pricing */}
                <Section id="open-bar-pricing" index={6} title="Open Bar Pricing">
                  <RateTable
                    caption="Wine + beer, per guest per hour"
                    columns={["Tier", "Per Guest / Per Hour"]}
                    rows={WINE_BEER_TIERS.filter((t) => t.id !== "None").map((tier) => [
                      `${tier.label}`,
                      money(tier.rate),
                    ])}
                  />
                  <p className="italic text-white/50">
                    The hourly rate applies only to the hours the client chooses to offer an Open Bar.
                  </p>
                </Section>

                {/* 07 — Bar Minimum Fee */}
                <Section id="bar-minimum" index={7} title="Bar Minimum Fee">
                  <p>
                    If the combined cost of all beer, wine, and liquor selections (excluding every
                    other event cost) is less than{" "}
                    <strong className="text-luxury-gold">{money(RATES.barMinimum)}</strong>, a Bar
                    Minimum Fee will automatically be added.
                  </p>
                  <Callout tone="formula">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                      Bar Minimum Fee
                    </p>
                    <Formula>
                      {money(RATES.barMinimum)} − (Beer + Wine + Liquor selections)
                    </Formula>
                  </Callout>
                  <p>
                    The fee equals the difference between the beverage selections and the required{" "}
                    {money(RATES.barMinimum)} minimum.
                  </p>
                </Section>

                {/* 08 — Liquor & Signature Cocktails */}
                <Section id="liquor" index={8} title="Liquor & Signature Cocktails">
                  <Callout tone="info">
                    <p>
                      This section only applies to Open Bar packages. If the client does not select an
                      Open Bar, this section automatically calculates as {money(0)}.
                    </p>
                  </Callout>
                  <p>
                    Whenever liquor is selected for an Open Bar,{" "}
                    <strong className="text-white/85">beer & wine is mandatory</strong> and must also
                    be included, with the associated cost per guest per hour of the beer and wine
                    added into the itemized proposal.
                  </p>

                  <h3 className="text-lg font-serif font-bold text-white/85 pt-2">
                    Signature Cocktails
                  </h3>
                  <p>
                    If the client chooses Signature Cocktails instead of full liquor shelf access:
                  </p>
                  <Bullets
                    items={[
                      "They must provide the names of the signature cocktails.",
                      `For each cocktail, they may select no more than ${RATES.maxLiquorsPerCocktail} liquors from the liquor tier they selected.`,
                      "They may choose to offer 1, 2, 3, or 4 signature cocktails.",
                    ]}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {LIQUOR_TIERS.map((tier) => (
                      <RateTable
                        key={tier.id}
                        caption={`${tier.label} signature cocktails`}
                        columns={["Cocktails", "Guest / Hour"]}
                        rows={SIGNATURE_COCKTAIL_RATES[tier.id].map((rate, i) => [
                          `${i + 1} Cocktail${i > 0 ? "s" : ""}`,
                          money(rate),
                        ])}
                      />
                    ))}
                  </div>
                  <p className="italic text-white/50">
                    The hourly rate applies only to Open Bar hours.
                  </p>

                  <h3 className="text-lg font-serif font-bold text-white/85 pt-2">
                    Full Shelf Access
                  </h3>
                  <p>If a client chooses:</p>
                  <Bullets
                    items={[
                      "Call Shelf, they automatically receive access to the Well Shelf.",
                      "Top Shelf, they automatically receive Well + Call + Top Shelf.",
                      "Platinum Shelf, they receive access to the entire liquor inventory.",
                    ]}
                  />
                  <RateTable
                    caption="Full shelf access, per guest per hour"
                    columns={["Shelf", "Per Guest / Per Hour"]}
                    rows={LIQUOR_TIERS.map((tier) => [
                      `Full ${tier.label}`,
                      money(FULL_SHELF_RATES[tier.id]),
                    ])}
                  />

                  <h3 className="text-lg font-serif font-bold text-white/85 pt-2">
                    Bar Minimum Fee
                  </h3>
                  <p>
                    If the combined beer, wine, and liquor selections total less than{" "}
                    {money(RATES.barMinimum)}, a Bar Minimum Fee will automatically be added equal to
                    the difference.
                  </p>
                </Section>

                {/* 09 — Champagne Toast */}
                <Section id="champagne-toast" index={9} title="Champagne Toast">
                  <p>If a client requests a champagne toast, we collect the following information:</p>
                  <Bullets
                    items={[
                      "Number of guests receiving champagne",
                      "Number of guests receiving the non-alcoholic option (sparkling grape juice)",
                      "Time of the toast",
                      "Service style — stationary display, or bar cart / table service",
                    ]}
                  />
                  <RateTable
                    caption="Champagne toast, per guest"
                    columns={["Selection", "Per Guest"]}
                    rows={CHAMPAGNE_OPTIONS.map((option) => [
                      option.label,
                      money(option.pricePerGuest),
                    ])}
                  />
                </Section>

                {/* 10 — Cash Bar */}
                <Section id="cash-bar" index={10} title="Cash Bar">
                  <p>
                    Cash Bar includes a{" "}
                    <strong className="text-luxury-gold">{money(RATES.cashBarAdminFee)}</strong>{" "}
                    administrative fee. If the client selects either:
                  </p>
                  <Bullets items={["Consumption Bar", "Open Bar"]} />
                  <p>this fee automatically becomes {money(0)}.</p>

                  <p className="text-white/75">For Cash Bar events:</p>
                  <Bullets
                    items={[
                      "Clients do not preselect wine, beer, or liquor.",
                      "Drinks are served from available inventory on the day of the event.",
                      "Specialty beer and wine orders may still be requested if available.",
                    ]}
                  />

                  <p>Clients may also open a tab for their guests. If they do:</p>
                  <Bullets
                    items={[
                      "They must close the tab before the event concludes.",
                      "They may place restrictions on the card (drink types, specific guests, spending limitations, etc.).",
                      <>
                        Tabs left open will automatically incur a{" "}
                        <strong className="text-luxury-gold">
                          {RATES.openTabGratuityRate * 100}% gratuity
                        </strong>
                        .
                      </>,
                    ]}
                  />
                </Section>

                {/* 11 — Service Fee */}
                <Section id="service-fee" index={11} title="Service Fee">
                  <p>
                    Every package includes a mandatory{" "}
                    <strong className="text-luxury-gold">{money(RATES.serviceFee)}</strong> Service
                    Fee.
                  </p>
                </Section>

                {/* 12 — Consumption Bar */}
                <Section id="consumption-bar" index={12} title="Consumption Bar">
                  <p>
                    Consumption Bars require a minimum{" "}
                    <strong className="text-luxury-gold">
                      {money(RATES.houseAccountMinimum)}
                    </strong>{" "}
                    House Account. This functions similarly to a prepaid gift card.
                  </p>
                  <Bullets
                    items={[
                      "Drinks purchased during the event are deducted from the House Account.",
                      "Once the balance has been exhausted, guests become individually responsible for purchasing additional drinks.",
                    ]}
                  />
                  <p className="text-white/75">Clients may choose to limit their House Account to:</p>
                  <Bullets
                    items={["Wine & Beer only", "Signature Cocktails", "Specific liquor shelf tiers"]}
                  />
                  <Callout tone="info">
                    <p>
                      Taxes are exempt from drinks charged against the House Account. Gratuities are
                      welcomed but not required.
                    </p>
                  </Callout>
                </Section>

                {/* 13 — Gratuity */}
                <Section id="gratuity" index={13} title="Gratuity">
                  <p>
                    A mandatory{" "}
                    <strong className="text-luxury-gold">
                      {RATES.gratuityRate * 100}% gratuity
                    </strong>{" "}
                    is applied to every package subtotal.
                  </p>
                </Section>

                {/* 14 — Taxes */}
                <Section id="taxes" index={14} title="Taxes">
                  <p>Taxes apply to every event cost except Staffing Fees.</p>
                  <Callout tone="formula">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                      Tax
                    </p>
                    <Formula>
                      (Subtotal + Gratuity − Staffing Fee) × {RATES.taxRate * 100}%
                    </Formula>
                  </Callout>
                  <p>
                    The Staffing Fee is tax exempt. Drinks charged against a Consumption Bar House
                    Account are likewise exempt.
                  </p>
                </Section>
              </div>

              {/* Closing CTA */}
              <div className="mt-12 glass-card rounded-[32px] border-luxury-gold/20 p-10 text-center">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                  Ready to <span className="gradient-text-gold font-serif">build your quote?</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-xl mx-auto mb-8 leading-relaxed">
                  Every rate on this page is wired directly into our quote designer. Make a selection
                  and the itemized proposal updates as you go.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-luxury-gold text-luxury-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300"
                >
                  Open the Quote Designer <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
