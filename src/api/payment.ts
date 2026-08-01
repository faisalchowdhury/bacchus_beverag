import api from "./axiosInstance";

export interface CreateCheckoutSessionPayload {
  /**
   * Id of the buyer, sourced from the /checkout?userId=... query. The backend
   * stores this on the payment so it can be linked back to the user account.
   */
  userId?: string;
  /**
   * Optional buyer email to prefill Stripe Checkout / send the receipt to.
   * The product and price are decided entirely on the backend — the browser
   * never sends a product id, price, or amount.
   */
  customerEmail?: string;
}

export interface CreateCheckoutSessionResponse {
  /** Stripe-hosted Checkout page URL to redirect the buyer to. */
  url: string;
  /** Stripe Checkout Session id (cs_...), used later to confirm status. */
  sessionId: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "expired";

export interface PaymentStatusResponse {
  status: PaymentStatus;
  amountTotal?: number; // smallest currency unit (e.g. cents)
  currency?: string;
  customerEmail?: string;
  productName?: string;
}

/**
 * The backend wraps every payload in a standard envelope
 * ({ success, status, message, data }). The real result lives under `data`.
 */
interface ApiEnvelope<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

/**
 * Ask the backend to create a Stripe Checkout Session.
 * The backend uses the Stripe SECRET key (never exposed to the browser)
 * and returns a hosted Checkout URL we redirect to.
 */
export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload = {},
): Promise<CreateCheckoutSessionResponse> {
  const { data } = await api.post<ApiEnvelope<CreateCheckoutSessionResponse>>(
    "/api/payments/create-checkout-session",
    payload,
  );
  return data.data;
}

/**
 * Read the stored payment status for a Checkout Session.
 * The source of truth on the backend is the Stripe webhook
 * (checkout.session.completed), not the browser redirect.
 */
export async function getPaymentStatus(
  sessionId: string,
): Promise<PaymentStatusResponse> {
  const { data } = await api.get<ApiEnvelope<PaymentStatusResponse>>(
    `/api/payments/status/${encodeURIComponent(sessionId)}`,
  );
  return data.data;
}
