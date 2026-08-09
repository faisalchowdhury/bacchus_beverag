import { MailCheck, KeyRound } from "lucide-react";
import { VENUE_NAME } from "../config/business";

/**
 * Explains where the conversation actually happens.
 *
 * There is no general HoneyBook link to offer — HoneyBook has no universal
 * login that lands a client on their own project page — so instead of pointing
 * at a dead end, this tells each reader what to do next.
 *
 * Two variants, because the two placements have different audiences:
 *  - "existing"  → the Contact page, read mostly by people who have never
 *                  heard from us, plus some who already have a portal.
 *  - "submitted" → the quote-sent screen, where we know exactly what happens
 *                  next and can simply say so.
 */
type Variant = "existing" | "submitted";

const COPY: Record<
  Variant,
  { icon: typeof MailCheck; heading: string; body: string[]; footnote: string }
> = {
  existing: {
    icon: KeyRound,
    heading: "Already working with us?",
    body: [
      `Every proposal, contract and payment for ${VENUE_NAME} runs through your own secure HoneyBook portal, so nothing important gets buried in an inbox.`,
      "If we have already been in touch, open the HoneyBook link from your email to pick things up exactly where you left off.",
    ],
    footnote:
      "Can't find it? Reply to any email you've had from us and we'll send a fresh link straight over.",
  },
  submitted: {
    icon: MailCheck,
    heading: "What happens next",
    body: [
      `We'll review your quote and set your event up with ${VENUE_NAME}, then email you a link to your own secure HoneyBook portal.`,
      "That one link covers everything from there — questions, contracts, payments and finalising your beverage program.",
    ],
    footnote: "Keep an eye on your inbox for the HoneyBook invitation.",
  },
};

export default function ClientCommunicationNotice({
  variant = "existing",
  /** Drop the box styling and icon when this sits inside an existing card. */
  bare = false,
  /** Hide the heading when the surrounding card already supplies one. */
  showHeading = true,
  className = "",
}: {
  variant?: Variant;
  bare?: boolean;
  showHeading?: boolean;
  className?: string;
}) {
  const { icon: Icon, heading, body, footnote } = COPY[variant];

  const content = (
    <div>
      {showHeading && <h3 className="font-serif text-lg font-bold mb-3">{heading}</h3>}
      {body.map((paragraph) => (
        <p
          key={paragraph}
          className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mb-2.5 last:mb-0"
        >
          {paragraph}
        </p>
      ))}
      <p className="text-[11px] text-white/45 leading-relaxed font-light mt-4 pt-4 border-t border-white/10">
        {footnote}
      </p>
    </div>
  );

  if (bare) return <div className={className}>{content}</div>;

  return (
    <div
      className={`rounded-2xl border border-luxury-gold/25 bg-luxury-gold/[0.06] p-6 sm:p-7 text-left ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <Icon size={18} className="text-luxury-gold mt-0.5 flex-shrink-0" />
        {content}
      </div>
    </div>
  );
}
