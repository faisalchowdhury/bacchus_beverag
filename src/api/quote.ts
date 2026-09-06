import axios from "axios";
import api from "./axiosInstance";
import type { QuoteBreakdown, QuoteFormValues } from "../types";

/**
 * Quote delivery.
 *
 * The wizard POSTs the client's selections to the backend, which recalculates
 * the estimate from its own copy of the rate card, stores the submission, and
 * emails two copies: the itemised estimate to the client, and the full
 * submission to the venue.
 *
 * The backend is the authority on price — the breakdown sent from here is
 * recorded for comparison but never used to bill. If the two ever disagree the
 * server logs it and the server figure wins.
 *
 * Point VITE_BACKEND_BASE at the API origin (defaults to https://faisal6001.ssh.bd/ in dev).
 */
const QUOTE_PATH = "/api/v1/quote";

/** Kept for the UI, which distinguishes "not switched on" from "it failed". */
export const isQuoteDeliveryConfigured = () =>
  Boolean(import.meta.env.VITE_BACKEND_BASE) || import.meta.env.DEV;

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
  | {
      delivered: true;
      /** False when the quote reached us but the estimate email bounced. */
      emailSent: boolean;
      quoteId?: string;
      /** The server's authoritative total, if it differs from ours. */
      grandTotal?: number;
    }
  | { delivered: false; reason: "not-configured" | "failed"; detail?: string };

interface QuoteResponseData {
  quoteId?: string;
  clientEmailSent?: boolean;
  ownerEmailSent?: boolean;
  grandTotal?: number;
}

export async function submitQuoteRequest(
  submission: QuoteSubmission,
): Promise<QuoteDeliveryResult> {
  if (!isQuoteDeliveryConfigured()) {
    // Log it so nothing is lost, but never report success.
    console.warn(
      "VITE_BACKEND_BASE is not set — quote was not delivered.",
      submission,
    );
    return { delivered: false, reason: "not-configured" };
  }

  try {
    const { data } = await api.post<{ data?: QuoteResponseData }>(
      QUOTE_PATH,
      submission,
    );

    return {
      delivered: true,
      emailSent: data?.data?.clientEmailSent ?? false,
      quoteId: data?.data?.quoteId,
      grandTotal: data?.data?.grandTotal,
    };
  } catch (error) {
    // The API returns { message } on failure — surface that rather than a
    // bare status code, since it explains what the client needs to fix.
    let detail = "Network error";
    if (axios.isAxiosError(error)) {
      detail =
        (error.response?.data as { message?: string } | undefined)?.message ??
        (error.response
          ? `Server responded ${error.response.status}`
          : error.message);
    } else if (error instanceof Error) {
      detail = error.message;
    }
    return { delivered: false, reason: "failed", detail };
  }
}
