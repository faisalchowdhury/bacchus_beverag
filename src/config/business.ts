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
 * TODO(client): the HoneyBook portal page clients should use to move forward
 * or ask questions. Until this is set, the UI shows the prompt without a link.
 */
export const HONEYBOOK_PORTAL_URL = "";

/**
 * Deliberately empty: we do not publish an email address or phone number.
 * Clients are routed through the HoneyBook portal instead, and quote requests
 * are delivered to the owner by the quote endpoint (see src/api/quote.ts).
 */
export const PUBLISH_CONTACT_EMAIL = false;

/**
 * There are currently no social accounts, so no social links are rendered.
 * Add handles here and the footer/contact page will pick them up.
 */
export const SOCIAL_LINKS: { label: string; url: string }[] = [];

/**
 * Real photography of the venue interior and bar staff is pending.
 * Gallery and staff sections render a "coming soon" state while these are
 * empty rather than showing stock imagery of other venues.
 */
export const HAS_VENUE_PHOTOGRAPHY = false;
export const HAS_STAFF_PHOTOGRAPHY = false;
