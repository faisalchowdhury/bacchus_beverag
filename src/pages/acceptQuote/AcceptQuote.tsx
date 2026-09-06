import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import {
  acceptQuote,
  acceptanceErrorMessage,
  fetchQuoteForAcceptance,
  type PublicQuoteView,
} from "../../api/acceptance";
import { money } from "../../features/quote-wizard/pricing";

/* ── Small presentational helpers ──────────────────────────────────── */

/** "2026-09-12" → "12 September 2026". Falls back to the raw value. */
const formatDate = (value?: string) => {
  const raw = String(value ?? "").trim();
  if (!raw) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw)
    ? new Date(`${raw}T00:00:00Z`)
    : new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

/** "18:00" → "6:00 PM". */
const formatTime = (value?: string) => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value ?? "").trim());
  if (!match) return value || "—";
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${match[2]} ${suffix}`;
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
};

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-white/5 last:border-0">
      <dt className="text-[11px] uppercase tracking-[0.15em] text-luxury-gold/70 font-medium sm:w-[38%] shrink-0">
        {label}
      </dt>
      <dd className="text-sm sm:text-base text-luxury-ivory/85 font-light break-words min-w-0">
        {value}
      </dd>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-luxury-charcoal/40 border border-white/10 rounded-2xl p-5 sm:p-7">
      <h2 className="font-serif text-xl sm:text-2xl text-luxury-champagne mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Full-page message for the states where there is no quote to show. */
function Notice({
  tone = "neutral",
  title,
  children,
}: {
  tone?: "neutral" | "error";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-auto text-center py-20 px-4">
      <div
        className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border ${
          tone === "error"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
            : "border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold"
        }`}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 8v5m0 3.5h.01M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl text-luxury-ivory mb-4">{title}</h1>
      <div className="text-luxury-ivory/55 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
      <Link
        to="/contact"
        className="inline-block mt-8 px-8 py-3.5 rounded-full bg-luxury-gold text-luxury-black text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-luxury-champagne transition-colors"
      >
        Contact us
      </Link>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function AcceptQuote() {
  const { token = "" } = useParams();

  const [quote, setQuote] = useState<PublicQuoteView | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  /** Set once this visit performs the acceptance, to switch to the thank-you. */
  const [justAccepted, setJustAccepted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    fetchQuoteForAcceptance(token)
      .then((data) => !cancelled && setQuote(data))
      .catch(
        (error) =>
          !cancelled &&
          setLoadError(
            acceptanceErrorMessage(error, "We could not open this quote."),
          ),
      )
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [token]);

  const onAccept = useCallback(async () => {
    setAccepting(true);
    setAcceptError(null);
    try {
      const result = await acceptQuote(token);
      setQuote(result.quote);
      setJustAccepted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setAcceptError(
        acceptanceErrorMessage(error, "Your acceptance could not be recorded."),
      );
    } finally {
      setAccepting(false);
    }
  }, [token]);

  const shell = (children: React.ReactNode) => (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 sm:pt-32 pb-20">{children}</main>
      <Footer />
    </div>
  );

  if (loading) {
    return shell(
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        <div className="h-12 w-2/3 rounded-lg bg-white/5 animate-pulse" />
        <div className="h-56 rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
      </div>,
    );
  }

  if (loadError || !quote) {
    return shell(
      <Notice tone="error" title="We could not open this quote">
        <p>{loadError ?? "That quote could not be found."}</p>
        <p className="mt-3">
          Acceptance links are personal to one estimate and expire after a time.
          If yours has stopped working, get in touch and we will send a fresh copy.
        </p>
      </Notice>,
    );
  }

  const alreadyAccepted = quote.acceptanceStatus === "Accepted";
  const s = quote.selections;
  const b = quote.breakdown;
  const isOpenBar = s.barType === "Open Bar";

  // An expired link is only a blocker while the quote is still open; once it
  // is accepted the page is just a receipt and the expiry is irrelevant.
  const expiredAndUnaccepted = quote.linkExpired && !alreadyAccepted;

  return shell(
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      {/* ── Heading ─────────────────────────────────────────────── */}
      <header className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-luxury-gold mb-4">
          {alreadyAccepted ? "Quote accepted" : "Your estimate"}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-luxury-ivory leading-tight">
          {alreadyAccepted
            ? justAccepted
              ? "Thank you — we have it"
              : "You have accepted this quote"
            : `Review your quote, ${quote.customerName.split(/\s+/)[0]}`}
        </h1>
        <p className="text-luxury-ivory/55 mt-4 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
          {alreadyAccepted
            ? `Accepted on ${formatDateTime(quote.acceptedAt)}. Our team has been notified and will be in touch with your contract and final beverage consultation. Nothing further is needed from you right now.`
            : "Please check everything below. Accepting tells our team you are ready to move ahead — it does not take a payment, and your contract follows separately."}
        </p>
      </header>

      {/* ── Accepted banner ─────────────────────────────────────── */}
      {alreadyAccepted && (
        <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m5 13 4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-serif text-lg text-luxury-champagne">
              Acceptance recorded
            </p>
            <p className="text-sm text-luxury-ivory/60 leading-relaxed mt-1">
              A confirmation has been emailed to{" "}
              <span className="text-luxury-gold">{quote.customerEmail}</span>, and your
              contract has gone to our team for preparation.
            </p>
          </div>
        </div>
      )}

      {/* ── Expired link ────────────────────────────────────────── */}
      {expiredAndUnaccepted && (
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-5">
          <p className="font-serif text-lg text-amber-200">This link has expired</p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed mt-1.5">
            Your quote is shown below for reference, but it can no longer be accepted
            from this link. Prices may also have moved on since it was issued —{" "}
            <Link to="/contact" className="text-luxury-gold hover:underline">
              contact us
            </Link>{" "}
            and we will send you an up-to-date estimate.
          </p>
        </div>
      )}

      {/* ── Event ───────────────────────────────────────────────── */}
      <Panel title="Your event">
        <dl>
          <Fact label="Event type" value={s.eventType || "—"} />
          <Fact label="Date" value={formatDate(s.eventDate)} />
          <Fact label="Venue" value={s.venueLocation || "—"} />
          <Fact
            label="Service window"
            value={`${formatTime(s.eventStartTime)} – ${formatTime(s.eventEndTime)} (${b.eventHours} hrs)`}
          />
          <Fact label="Guests" value={`${s.guestCount} including minors`} />
          <Fact label="Bar type" value={s.barType} />
          <Fact
            label="Bartenders"
            value={`${b.bartenderCount} across ${b.barStations} bar${b.barStations === 1 ? "" : "s"}`}
          />
          {isOpenBar && (
            <Fact label="Open Bar hours" value={`${b.openBarHours} hrs`} />
          )}
        </dl>
      </Panel>

      {/* ── Beverage program ────────────────────────────────────── */}
      {isOpenBar && (
        <Panel title="Your beverage program">
          <dl>
            <Fact
              label="Beer & wine"
              value={
                s.wineBeerTier === "None"
                  ? "Not selected"
                  : `${s.wineBeerTier} · ${money(b.wineBeerRate)} per guest, per hour`
              }
            />
            <Fact
              label="Liquor"
              value={
                s.liquorMode === "None"
                  ? "Not selected"
                  : s.liquorMode === "Full Shelf"
                    ? `Full ${s.liquorTier} shelf · ${money(b.liquorRate)} per guest, per hour`
                    : `${s.signatureCocktailCount} ${s.liquorTier} signature cocktail${s.signatureCocktailCount === 1 ? "" : "s"} · ${money(b.liquorRate)} per guest, per hour`
              }
            />
            {s.champagneToast && (
              <Fact
                label="Champagne toast"
                value={`${s.champagneSelection} · ${s.champagneGuests} guests${
                  s.champagneNonAlcoholicGuests
                    ? ` · ${s.champagneNonAlcoholicGuests} sparkling grape juice`
                    : ""
                }`}
              />
            )}
            <Fact
              label="Glassware"
              value={s.glasswareRental ? "Bacchus rental" : "Client supplied"}
            />
          </dl>

          {s.liquorMode === "Signature Cocktails" &&
            (s.signatureCocktails ?? []).some((cocktail) => cocktail?.name?.trim()) && (
              <div className="mt-5 pt-5 border-t border-white/5 space-y-2">
                {(s.signatureCocktails ?? [])
                  .slice(0, s.signatureCocktailCount)
                  .map((cocktail, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 rounded-lg bg-luxury-black/40 border border-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-luxury-ivory/90">
                        {cocktail?.name?.trim() || `Cocktail #${index + 1}`}
                      </span>
                      <span className="text-xs text-luxury-ivory/45 sm:text-right">
                        {cocktail?.liquors?.length
                          ? cocktail.liquors.join(" + ")
                          : "To be confirmed"}
                      </span>
                    </div>
                  ))}
              </div>
            )}
        </Panel>
      )}

      {/* ── Itemised total ──────────────────────────────────────── */}
      <Panel title="Itemised estimate">
        <div className="-mx-5 sm:-mx-7 overflow-x-auto">
          <table className="w-full text-sm min-w-[380px]">
            <tbody>
              {b.lineItems.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-white/5 ${item.informational ? "opacity-45" : ""}`}
                >
                  <td className="px-5 sm:px-7 py-3.5 align-top">
                    <div className="text-luxury-ivory/90">{item.label}</div>
                    {item.detail && (
                      <div className="text-[11px] text-luxury-ivory/35 mt-1 leading-snug">
                        {item.detail}
                      </div>
                    )}
                  </td>
                  <td className="px-5 sm:px-7 py-3.5 text-right align-top tabular-nums whitespace-nowrap text-luxury-ivory/90">
                    {money(item.amount)}
                  </td>
                </tr>
              ))}

              <tr className="border-b border-white/5">
                <td className="px-5 sm:px-7 py-3 font-semibold">Subtotal</td>
                <td className="px-5 sm:px-7 py-3 text-right font-semibold tabular-nums">
                  {money(b.subtotal)}
                </td>
              </tr>
              <tr>
                <td className="px-5 sm:px-7 py-2 text-luxury-ivory/45 text-xs">
                  Gratuity
                </td>
                <td className="px-5 sm:px-7 py-2 text-right text-luxury-ivory/45 text-xs tabular-nums">
                  {money(b.gratuity)}
                </td>
              </tr>
              <tr>
                <td className="px-5 sm:px-7 py-2 text-luxury-ivory/45 text-xs">
                  Tax (on {money(b.taxableBase)})
                </td>
                <td className="px-5 sm:px-7 py-2 text-right text-luxury-ivory/45 text-xs tabular-nums">
                  {money(b.tax)}
                </td>
              </tr>
              <tr className="bg-luxury-gold/[0.07]">
                <td className="px-5 sm:px-7 py-4 font-serif text-lg text-luxury-gold">
                  Estimated total
                </td>
                <td className="px-5 sm:px-7 py-4 text-right font-serif text-2xl font-bold text-luxury-gold tabular-nums">
                  {money(b.grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {b.warnings.length > 0 && (
          <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 space-y-2">
            {b.warnings.map((warning) => (
              <p
                key={warning}
                className="text-[12px] text-luxury-ivory/60 leading-relaxed"
              >
                {warning}
              </p>
            ))}
          </div>
        )}
      </Panel>

      {/* ── The decision ────────────────────────────────────────── */}
      {!alreadyAccepted && !expiredAndUnaccepted && (
        <div className="bg-luxury-charcoal/40 border border-luxury-gold/20 rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="font-serif text-2xl text-luxury-champagne mb-3">
            Ready to go ahead?
          </h2>
          <p className="text-sm text-luxury-ivory/55 leading-relaxed max-w-lg mx-auto mb-7">
            Accepting confirms the scope and figures above and tells our team you are
            ready to proceed. We will send your Bartending Service Contract and book
            your final beverage consultation. This does not take a payment, and your
            final selections are not due until 45 days before the event.
          </p>

          {acceptError && (
            <p className="text-sm text-amber-400 mb-5 leading-relaxed">{acceptError}</p>
          )}

          <button
            type="button"
            onClick={onAccept}
            disabled={accepting}
            className="w-full sm:w-auto px-12 py-4 rounded-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-luxury-champagne transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {accepting ? "Recording your acceptance…" : "Accept this quote"}
          </button>

          <p className="text-[11px] text-luxury-ivory/30 mt-5 leading-relaxed">
            Something not right?{" "}
            <Link to="/contact" className="text-luxury-gold/70 hover:text-luxury-gold">
              Tell us what needs changing
            </Link>{" "}
            and we will re-quote before any contract is issued.
          </p>
        </div>
      )}

      {/* Reference, for anyone quoting it back to us on the phone. */}
      <p className="text-center text-[11px] text-luxury-ivory/25 pt-2">
        Quote reference {quote.quoteId}
      </p>
    </div>,
  );
}
