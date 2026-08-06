import type { QuoteBreakdown, QuoteFormValues } from "../types";

/**
 * Quote delivery.
 *
 * When a client submits the wizard, the owner needs a notification plus a full
 * copy of the quote so they can look the client up in HoneyBook. The browser
 * cannot send email, so the payload is POSTed to an endpoint that does.
 *
 * ⚠ TODO(client): set VITE_QUOTE_ENDPOINT to that endpoint.
 *   Until it is set, `submitQuoteRequest` reports `delivered: false` and the UI
 *   tells the client to reach out through the HoneyBook portal instead. It
 *   never claims a quote was sent when it was not.
 */
const QUOTE_ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT ?? "";

export const isQuoteDeliveryConfigured = () => QUOTE_ENDPOINT.length > 0;

/** Everything the owner needs in the notification email. */
export interface QuoteSubmission {
  submittedAt: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  event: {
    type: string;
    date: string;
    venue: string;
    startTime: string;
    endTime: string;
    guestCount: number;
  };
  selections: QuoteFormValues;
  /** The itemized proposal exactly as the client saw it. */
  quote: QuoteBreakdown;
}

export function buildQuoteSubmission(
  values: QuoteFormValues,
  breakdown: QuoteBreakdown,
  submittedAt: string,
): QuoteSubmission {
  return {
    submittedAt,
    client: {
      name: values.customerName,
      email: values.customerEmail,
      phone: values.customerPhone,
    },
    event: {
      type: values.eventType,
      date: values.eventDate,
      venue: values.venueLocation,
      startTime: values.eventStartTime,
      endTime: values.eventEndTime,
      guestCount: values.guestCount,
    },
    selections: values,
    quote: breakdown,
  };
}

export type QuoteDeliveryResult =
  | { delivered: true }
  | { delivered: false; reason: "not-configured" | "failed"; detail?: string };

export async function submitQuoteRequest(
  submission: QuoteSubmission,
): Promise<QuoteDeliveryResult> {
  if (!isQuoteDeliveryConfigured()) {
    // Log it so nothing is lost during development, but never report success.
    console.warn("VITE_QUOTE_ENDPOINT is not set — quote was not delivered.", submission);
    return { delivered: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      return {
        delivered: false,
        reason: "failed",
        detail: `Endpoint responded ${response.status}`,
      };
    }
    return { delivered: true };
  } catch (error) {
    return {
      delivered: false,
      reason: "failed",
      detail: error instanceof Error ? error.message : "Network error",
    };
  }
}
