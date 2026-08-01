export interface Package {
  id: "Essential" | "Premium" | "Luxury";
  name: string;
  pricePerGuest: number;
  description: string;
  inclusions: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Whiskey" | "Bourbon" | "Vodka" | "Gin" | "Rum" | "Tequila" | "Wine" | "Champagne" | "Beer" | "Signature Cocktails";
  tier: "Well" | "Call" | "Premium" | "Top Shelf" | "Standard" | "N/A";
  description: string;
  origin?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Bride", "Corporate Client"
  eventDate: string;
  content: string;
  rating: number;
}

export interface QuoteFormValues {
  eventType: string;
  eventDate: string;
  venueLocation: string;
  guestCount: number;
  barType: "Open Bar" | "Cash Bar" | "Consumption Bar";
  beveragePackage: "Essential" | "Premium" | "Luxury";
  liquorTier: "Well" | "Call" | "Premium" | "Top Shelf";
  addWine: boolean;
  addChampagneToast: boolean;
  addSignatureCocktails: boolean;
  signatureCocktailsQty: number;
  additionalBarLocations: number;
  serviceDuration: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface QuoteBreakdown {
  subtotal: number;
  barTypeFee: number;
  addOns: number;
  wineFee: number;
  champagneFee: number;
  cocktailsFee: number;
  extraBarFee: number;
  hourlyFee: number;
  total: number;
  gratuity: number;
  tax: number;
  grandTotal: number;
}
