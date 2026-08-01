import type { QuoteFormValues, QuoteBreakdown } from "../../types";

// DEMO FORMULA — replace with client's actual pricing logic from their Google Sheets/Apps Script
export const basePricePerGuest = {
  Essential: 25,
  Premium: 45,
  Luxury: 75,
};

export const liquorTierMultiplier = {
  Well: 1.0,
  Call: 1.2,
  Premium: 1.5,
  "Top Shelf": 2.0,
};

export const barTypeFee = {
  "Open Bar": 200,
  "Cash Bar": 100,
  "Consumption Bar": 150,
};

export function calculateQuote(values: QuoteFormValues): QuoteBreakdown {
  const guestCount = Number(values.guestCount) || 0;
  const pkg = values.beveragePackage || "Essential";
  const tier = values.liquorTier || "Well";
  const barType = values.barType || "Open Bar";
  const hours = Number(values.serviceDuration) || 4;

  const basePrice = basePricePerGuest[pkg] || 0;
  const multiplier = liquorTierMultiplier[tier] || 1.0;

  // Subtotal calculation
  const subtotal = guestCount * basePrice * multiplier;

  // Add-ons breakdown
  const wineFee = values.addWine ? guestCount * 8 : 0;
  const champagneFee = values.addChampagneToast ? guestCount * 6 : 0;
  const cocktailsFee = values.addSignatureCocktails ? (Number(values.signatureCocktailsQty) || 0) * 12 : 0;
  const extraBarFee = (Number(values.additionalBarLocations) || 0) * 150;
  
  const addOns = wineFee + champagneFee + cocktailsFee + extraBarFee;

  // Hourly Fee (above 4 hours)
  const hourlyFee = hours > 4 ? (hours - 4) * 75 : 0;

  // Combined totals
  const total = subtotal + barTypeFee[barType] + addOns + hourlyFee;
  const gratuity = total * 0.18;
  const tax = total * 0.08;
  const grandTotal = total + gratuity + tax;

  return {
    subtotal,
    barTypeFee: barTypeFee[barType] || 0,
    addOns,
    wineFee,
    champagneFee,
    cocktailsFee,
    extraBarFee,
    hourlyFee,
    total,
    gratuity,
    tax,
    grandTotal,
  };
}
