/**
 * Single place for the real-world details of the business.
 *
 * ⚠ ITEMS MARKED "TODO(client)" ARE PLACEHOLDERS AND MUST BE FILLED IN
 *   BEFORE GOING LIVE. Nothing else in the codebase hardcodes these.
 */

/** The venue clients are directed to for booking and questions. */
export const VENUE_NAME = "Chateau Des Fleures";

/** The bar-service brand shown in the header/footer. */
export const BRAND_NAME = "Bacchus Beverages";

/**
 * TODO(client): the venue's real address. The previous placeholder
 * ("850 Champagne Suite Lane, Beverly Hills, CA 90210") was invented, so it has
 * been removed — the footer omits the address block entirely while this is empty
 * rather than publishing an address that does not exist.
 */
export const VENUE_ADDRESS_LINES: string[] = [];

/**
 * There is deliberately NO general HoneyBook link anywhere on the site.
 *
 * HoneyBook has no universal login URL that routes a client to their own
 * project page, so linking anywhere would send people somewhere useless.
 * Clients use the HoneyBook email link already sent to them instead.
 *
 * The user-facing wording lives in
 * `src/components/ClientCommunicationNotice.tsx`, which has one variant for
 * existing clients and one for the just-submitted-a-quote screen.
 */

/**
 * Deliberately empty: we do not publish an email address or phone number.
 * New enquiries come in through the quote designer, which delivers the client's
 * details to the owner (see src/api/quote.ts). Existing clients continue in
 * HoneyBook via the email link already sent to them.
 */
export const PUBLISH_CONTACT_EMAIL = false;

/**
 * There are currently no social accounts, so no social links are rendered.
 * Add handles here and the footer/contact page will pick them up.
 */
export const SOCIAL_LINKS: { label: string; url: string }[] = [];
