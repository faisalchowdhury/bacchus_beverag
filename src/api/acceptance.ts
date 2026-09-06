import api from "./axiosInstance";
import type { QuoteBreakdown, QuoteFormValues } from "../types";

/**
 * The client-facing acceptance flow.
 *
 * A client arrives here from the "Accept This Quote" button in their estimate
 * email. The token in the URL is the only credential — there is no login — so
 * these calls carry nothing else, and the server decides what may be shown.
 */

export type QuoteAcceptanceStatus = "Pending" | "Accepted" | "Declined";

/** The trimmed view the public endpoint returns. No admin fields. */
export interface PublicQuoteView {
  quoteId: string;
  acceptanceStatus: QuoteAcceptanceStatus;
  acceptedAt: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  venueLocation: string;
  guestCount: number;
  barType: string;
  submittedAt: string;
  selections: QuoteFormValues;
  breakdown: QuoteBreakdown;
  /** True when the link has aged out — the page explains rather than failing. */
  linkExpired: boolean;
}

export interface AcceptQuoteResult {
  quote: PublicQuoteView;
  /** False when the quote had already been accepted before this click. */
  firstAcceptance: boolean;
  teamEmailSent: boolean;
  clientEmailSent: boolean;
  contractAttached: boolean;
}

interface Envelope<T> {
  success: boolean;
  status: number;
  message?: string;
  data: T;
}

/** Pulls the server's own message out, so the page can explain what went wrong. */
export function acceptanceErrorMessage(
  error: unknown,
  fallback = "Something went wrong.",
): string {
  const response = (error as { response?: { data?: { message?: string } } })?.response;
  if (response?.data?.message) return response.data.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/** Fetches the quote behind an acceptance token, for the review page. */
export async function fetchQuoteForAcceptance(token: string): Promise<PublicQuoteView> {
  const { data } = await api.get<Envelope<PublicQuoteView>>(
    `/api/v1/quote/accept/${encodeURIComponent(token)}`,
  );
  if (!data?.data) throw new Error(data?.message || "That quote could not be found.");
  return data.data;
}

/**
 * Records the client's acceptance.
 *
 * Safe to call more than once: the server treats a repeat as a no-op and
 * reports the acceptance already on file rather than re-notifying the venue.
 */
export async function acceptQuote(token: string): Promise<AcceptQuoteResult> {
  const { data } = await api.post<Envelope<AcceptQuoteResult>>(
    `/api/v1/quote/accept/${encodeURIComponent(token)}`,
  );
  if (!data?.data) throw new Error(data?.message || "Your acceptance could not be recorded.");
  return data.data;
}
