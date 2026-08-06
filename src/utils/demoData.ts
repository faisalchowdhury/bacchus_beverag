import type { ServiceStyle, Testimonial } from "../types";
import { FULL_SHELF_RATES, RATES, money } from "../features/quote-wizard/pricing";

export const SERVICE_STYLES: ServiceStyle[] = [
  {
    id: "Open Bar",
    name: "Open Bar",
    tagline: "Billed in full to the host",
    headline: `${money(2.5 + FULL_SHELF_RATES.Well)}`,
    headlineNote: "per guest / per hour — Tier 1 wine + beer with full Well shelf",
    description:
      "Beverages are complimentary for your guests. You preselect the wine + beer tier and either signature cocktails or full shelf access, and the hourly rate applies only to the hours you choose to offer the Open Bar.",
    featured: true,
    inclusions: [
      "Wine + beer tiers from $2.50 / guest / hour",
      "Signature cocktails from $2.00 / guest / hour, or full shelf access from $5.50",
      "Beer & wine is mandatory with any liquor selection",
      `${money(RATES.barMinimum)} bar minimum across beer, wine and liquor`,
      "Cash Bar administrative fee waived",
      "Champagne toast and additional bar stations available",
    ],
  },
  {
    id: "Cash Bar",
    name: "Cash Bar",
    tagline: "Guests purchase their own drinks",
    headline: money(RATES.cashBarAdminFee),
    headlineNote: "administrative fee — waived on Open Bar and Consumption Bar",
    description:
      "Guests purchase directly from available inventory on the day of the event. Nothing is preselected, so beer, wine and liquor calculate as $0 on your proposal.",
    inclusions: [
      "No preselection of wine, beer or liquor",
      "Served from available inventory on the event day",
      "Specialty beer & wine orders may still be requested",
      "Open a host tab with restrictions on drinks, guests or spend",
      `Tabs left open at the close of the event incur a ${RATES.openTabGratuityRate * 100}% gratuity`,
      "Staffing, glassware and the service fee still apply",
    ],
  },
  {
    id: "Consumption Bar",
    name: "Consumption Bar",
    tagline: "Prepaid house account",
    headline: money(RATES.houseAccountMinimum),
    headlineNote: "house account minimum — functions like a prepaid gift card",
    description:
      "Drinks purchased during the event are deducted from your house account. Once the balance is exhausted, guests become individually responsible for additional drinks.",
    inclusions: [
      `${money(RATES.houseAccountMinimum)} minimum house account`,
      "Limit the account to wine & beer, signature cocktails, or specific shelf tiers",
      "Taxes are exempt on drinks charged against the house account",
      "Gratuities are welcomed but never required",
      "Cash Bar administrative fee waived",
      "Specialty beer & wine orders may still be requested",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sophia & Julian Bennett",
    role: "Bride & Groom",
    eventDate: "June 20, 2026",
    content: "Bacchus Beverages made our wedding reception absolutely legendary! Our guests are still raving about 'The Bacchus Old Fashioned' and the impeccable champagne tower service. The mixologists were incredibly professional, polished, and added a layer of luxury to our venue that was worth every single penny.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Marcus Vance",
    role: "Corporate Gala Organizer",
    eventDate: "December 14, 2025",
    content: "As an event coordinator, I expect nothing less than perfection for our annual corporate galas. Bacchus Beverages delivered precisely that. From the sophisticated black-tie bar setup to the fast, flawless guest service and premium top-shelf selections, they are now our exclusive beverage partner.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Private Hostess",
    eventDate: "May 2, 2026",
    content: "The multi-step quote wizard was incredibly easy to use, and when the team arrived for my anniversary party, they exceeded every expectation. The fresh-pressed ingredients, handmade lavender syrups, and overall presentation felt like we were sitting in a five-star hotel bar. Exquisite!",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "How does the booking process work?",
    a: "It starts with our Quote Designer. Select your details and get an instant itemized estimate. When you submit, a copy of that quote comes straight to us with your contact details. To move forward or ask questions, you reach out to Chateau Des Fleures through your HoneyBook portal page — contracts, payments and all event correspondence are handled there.",
  },
  {
    q: "Is alcohol included in your packages?",
    a: "Yes! Unlike dry-hire companies, we provide comprehensive services that can include full top-shelf alcohol sourcing, professional TIPS-certified staff, bar design rentals, mixers, house-made syrups, premium barware, and high-grade ice. We handle the entire logistics cycle.",
  },
  {
    q: "Can we customize our signature cocktails?",
    a: "Absolutely. Signature cocktails are our specialty. You may offer 1, 2, 3, or 4 signature cocktails in place of full shelf access. Simply name each cocktail and choose up to two liquors per cocktail from your selected shelf tier — our mixologists build the rest, from botanical extractions to dehydrated citrus and smoke.",
  },
  {
    q: "What licenses and insurance do you carry?",
    a: "Bacchus Beverages is fully licensed and carries $2,000,000 in General and Liquor Liability Insurance. All of our bartenders are certified through TIPS (Training for Intervention Procedures) to ensure safe, responsible, and elegant hospitality.",
  },
  {
    q: "Do you service events with multiple bars or locations?",
    a: "Yes. One permanent bar station — the fixed bar next to the ballroom — is included in every package at no additional charge. Each additional bar location adds one bartender regardless of guest count, plus a $350 bar setup fee. You can add stations directly in the quote wizard and watch the staffing adjust live.",
  },
];

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

/**
 * Real photography of the venue interior and bar staff is pending from the
 * client. This is intentionally empty rather than filled with stock imagery of
 * other venues — the gallery renders a "coming soon" state while it is.
 * Drop the real images in here and every gallery surface picks them up.
 */
export const GALLERY_IMAGES: GalleryImage[] = [];
