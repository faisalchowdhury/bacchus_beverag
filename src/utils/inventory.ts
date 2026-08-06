import type { InventoryCategory, InventoryItem } from "../types";

/* ══════════════════════════════════════════════════════════════════════════
   THE REAL STOCK LIST

   Item names are transcribed verbatim from the client's inventory sheet
   (line-wrap artifacts joined, obvious abbreviations expanded).

   ⚠ DRAFT TIER ASSIGNMENTS — REQUIRES CLIENT SIGN-OFF
   The stock list arrived without tier information, but tier is what sets the
   price ($5.50/guest/hour for Well up to $19.00 for Platinum; $2.50 to $4.50
   for wine + beer). The `tier` values below are a best-effort first pass based
   on each product's market position. Correcting one is a one-word edit here —
   nothing else in the codebase hardcodes a bottle's tier.
   ══════════════════════════════════════════════════════════════════════════ */

export const INVENTORY: InventoryItem[] = [
  /* ── DRAFT BEER ────────────────────────────────────────────────────────
     The six regularly stocked selections. Included from Tier 1 upward.
     Note: mobile bars are served with bottled beer, not draft.            */
  { id: "db1", name: "Angry Orchard Draft", category: "Draft Beer", tier: "Tier 1", format: "5.16 Gal" },
  { id: "db2", name: "Miller Lite Draft", category: "Draft Beer", tier: "Tier 1", format: "7.75 Gal" },
  { id: "db3", name: "Modelo Especial", category: "Draft Beer", tier: "Tier 1", format: "1/4 Keg" },
  { id: "db4", name: "Yuengling Lager", category: "Draft Beer", tier: "Tier 1", format: "1/4 Keg" },
  { id: "db5", name: "NBB VDR Juicy Haze", category: "Draft Beer", tier: "Tier 1", format: "1/6 Keg" },
  { id: "db6", name: "Guinness", category: "Draft Beer", tier: "Tier 1", format: "1/6 Keg" },

  /* ── RED WINE ─────────────────────────────────────────────────────────── */
  { id: "rw1", name: "Honoro Vera, Calatayud Garnacha", category: "Red", tier: "Tier 2", vintage: "2022" },
  { id: "rw2", name: "Katherine Goldschmidt Cabernet Sauvignon", category: "Red", tier: "Tier 2", origin: "California" },
  { id: "rw3", name: "Les Cailloux Rouge Wood", category: "Red", tier: "Tier 1" },
  { id: "rw4", name: "Purple Cowboy Tenacious Red Cabernet Sauvignon", category: "Red", tier: "Tier 1" },
  { id: "rw5", name: "Robert Mondavi Winery Private Selection Heritage Rare Red Blend", category: "Red", tier: "Tier 2" },
  { id: "rw6", name: "Robert Mondavi Winery Private Selection Pinot Noir", category: "Red", tier: "Tier 2" },
  { id: "rw7", name: "Three Thieves Cabernet Sauvignon", category: "Red", tier: "Tier 1" },

  /* ── WHITE WINE ───────────────────────────────────────────────────────── */
  { id: "ww1", name: "Beviamo, Venezia Pinot Grigio", category: "White", tier: "Tier 1", vintage: "2023" },
  { id: "ww2", name: "Joel Gott, Pinot Grigio", category: "White", tier: "Tier 2", origin: "California" },
  { id: "ww3", name: "Michel Petit Chablis", category: "White", tier: "Tier 3" },
  { id: "ww4", name: "Nobilo Regional Collection Sauvignon Blanc", category: "White", tier: "Tier 2" },
  { id: "ww5", name: "Pebble Lane Chardonnay NV", category: "White", tier: "Tier 1" },
  { id: "ww6", name: "Rombauer Vineyards, Sauvignon Blanc", category: "White", tier: "Tier 3", origin: "Napa Valley", vintage: "2023" },
  { id: "ww7", name: "Santo Moscato d'Asti", category: "White", tier: "Tier 1" },
  { id: "ww8", name: "Simonsig, Chenin Blanc", category: "White", tier: "Tier 2", origin: "Stellenbosch", vintage: "2023" },
  { id: "ww9", name: "Sycamore Lane Cellars Pinot Grigio", category: "White", tier: "Tier 1" },

  /* ── SPARKLING ─────────────────────────────────────────────────────────
     The first three are the priced champagne toast selections
     ($16 / $8 / $5 per guest). Dom Pérignon 2015 has no published toast
     rate — see the note in the client summary.                            */
  { id: "sp1", name: "Champagne Devaux Blanc de Noirs, Champagne Brut Grande Réserve", category: "Sparkling", tier: "Toast" },
  { id: "sp2", name: "Perelada, Cava Brut Nature Stars Reserva", category: "Sparkling", tier: "Toast", vintage: "2020" },
  { id: "sp3", name: "J. Roget Brut", category: "Sparkling", tier: "Toast" },
  { id: "sp4", name: "Dom Pérignon 2015", category: "Sparkling", tier: "Toast" },

  /* ── VODKA ────────────────────────────────────────────────────────────── */
  { id: "vk1", name: "Smirnoff Vodka", category: "Vodka", tier: "Well" },
  { id: "vk2", name: "Svedka", category: "Vodka", tier: "Well" },
  { id: "vk3", name: "Finlandia", category: "Vodka", tier: "Call" },
  { id: "vk4", name: "Tito's Handmade", category: "Vodka", tier: "Call" },
  { id: "vk5", name: "Ketel One", category: "Vodka", tier: "Top Shelf" },
  { id: "vk6", name: "Haku Vodka", category: "Vodka", tier: "Top Shelf" },
  { id: "vk7", name: "Broken Shed", category: "Vodka", tier: "Top Shelf" },
  { id: "vk8", name: "Grey Goose", category: "Vodka", tier: "Platinum" },
  { id: "vk9", name: "Belvedere", category: "Vodka", tier: "Platinum" },
  { id: "vk10", name: "Stoli Elite", category: "Vodka", tier: "Platinum" },

  /* ── GIN ──────────────────────────────────────────────────────────────── */
  { id: "gn1", name: "Gilbey's London Dry", category: "Gin", tier: "Well" },
  { id: "gn2", name: "Beefeater", category: "Gin", tier: "Call" },
  { id: "gn3", name: "Uncle Val's Botanical Gin", category: "Gin", tier: "Top Shelf" },
  { id: "gn4", name: "Roku Gin", category: "Gin", tier: "Top Shelf" },
  { id: "gn5", name: "Hendrick's", category: "Gin", tier: "Top Shelf" },
  { id: "gn6", name: "Empress 1908", category: "Gin", tier: "Top Shelf" },
  { id: "gn7", name: "Monkey 47", category: "Gin", tier: "Platinum" },

  /* ── RUM ──────────────────────────────────────────────────────────────── */
  { id: "rm1", name: "Bacardi Superior", category: "Rum", tier: "Well" },
  { id: "rm2", name: "Cruzan Estate White", category: "Rum", tier: "Well" },
  { id: "rm3", name: "Cruzan Estate Dark", category: "Rum", tier: "Well" },
  { id: "rm4", name: "Bacardi Spiced", category: "Rum", tier: "Call" },
  { id: "rm5", name: "Captain Morgan Spiced", category: "Rum", tier: "Call" },
  { id: "rm6", name: "Malibu Coconut", category: "Rum", tier: "Call" },
  { id: "rm7", name: "Plantation Grand Reserve 5Y", category: "Rum", tier: "Top Shelf" },
  { id: "rm8", name: "Bumbu Rum", category: "Rum", tier: "Top Shelf" },
  { id: "rm9", name: "Bumbu Crème", category: "Rum", tier: "Top Shelf" },
  { id: "rm10", name: "Bumbu XO", category: "Rum", tier: "Platinum" },

  /* ── TEQUILA & MEZCAL ─────────────────────────────────────────────────── */
  { id: "tq1", name: "Lunazul Blanco", category: "Tequila", tier: "Well" },
  { id: "tq2", name: "Lunazul Añejo", category: "Tequila", tier: "Well" },
  { id: "tq3", name: "Olmeca Altos Plata", category: "Tequila", tier: "Call" },
  { id: "tq4", name: "Jose Cuervo Tradicional Blanco", category: "Tequila", tier: "Call" },
  { id: "tq5", name: "Jose Cuervo Tradicional Reposado", category: "Tequila", tier: "Call" },
  { id: "tq6", name: "1800 Silver", category: "Tequila", tier: "Call" },
  { id: "tq7", name: "Tres Agaves Añejo", category: "Tequila", tier: "Top Shelf" },
  { id: "tq8", name: "1800 Añejo", category: "Tequila", tier: "Top Shelf" },
  { id: "tq9", name: "Patrón Silver", category: "Tequila", tier: "Top Shelf" },
  { id: "tq10", name: "Casamigos Blanco", category: "Tequila", tier: "Top Shelf" },
  { id: "tq11", name: "Tequila Ocho Plata", category: "Tequila", tier: "Top Shelf" },
  { id: "tq12", name: "400 Conejos Mezcal", category: "Tequila", tier: "Top Shelf" },
  { id: "tq13", name: "Jose Cuervo Devil's Reserve", category: "Tequila", tier: "Top Shelf" },
  { id: "tq14", name: "Casamigos Añejo", category: "Tequila", tier: "Platinum" },
  { id: "tq15", name: "Casamigos Mezcal Joven", category: "Tequila", tier: "Platinum" },
  { id: "tq16", name: "Don Julio Añejo", category: "Tequila", tier: "Platinum" },
  { id: "tq17", name: "Patrón Añejo", category: "Tequila", tier: "Platinum" },
  { id: "tq18", name: "Patrón Extra Añejo", category: "Tequila", tier: "Platinum" },
  { id: "tq19", name: "Don Julio 1942", category: "Tequila", tier: "Platinum" },

  /* ── WHISKEY, BOURBON & RYE ───────────────────────────────────────────── */
  { id: "wk1", name: "Early Times", category: "Whiskey", tier: "Well" },
  { id: "wk2", name: "Kentucky Gentleman", category: "Whiskey", tier: "Well" },
  { id: "wk3", name: "Seagram's 7", category: "Whiskey", tier: "Well" },
  { id: "wk4", name: "Canadian Club 80", category: "Whiskey", tier: "Well" },
  { id: "wk5", name: "Fireball Cinnamon", category: "Whiskey", tier: "Well" },
  { id: "wk6", name: "Jim Beam Rye", category: "Whiskey", tier: "Call" },
  { id: "wk7", name: "Jack Daniel's Black Label", category: "Whiskey", tier: "Call" },
  { id: "wk8", name: "Jameson", category: "Whiskey", tier: "Call" },
  { id: "wk9", name: "Maker's Mark", category: "Whiskey", tier: "Call" },
  { id: "wk10", name: "Old Forester", category: "Whiskey", tier: "Call" },
  { id: "wk11", name: "Crown Royal", category: "Whiskey", tier: "Call" },
  { id: "wk12", name: "Bulleit Bourbon", category: "Whiskey", tier: "Call" },
  { id: "wk13", name: "Wild Turkey 101", category: "Whiskey", tier: "Call" },
  { id: "wk14", name: "Redemption Rye", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk15", name: "Buffalo Trace Bourbon", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk16", name: "Woodford Reserve", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk17", name: "Elijah Craig Straight Rye", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk18", name: "Old Weller Antique", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk19", name: "Teeling Small Batch", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk20", name: "Olde Raleigh Whiskey Society Bourbon", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk21", name: "Wild Turkey Rare Breed", category: "Whiskey", tier: "Top Shelf" },
  { id: "wk22", name: "Eagle Rare Bourbon", category: "Whiskey", tier: "Platinum" },
  { id: "wk23", name: "Blanton's Single Barrel", category: "Whiskey", tier: "Platinum" },
  { id: "wk24", name: "Redbreast 12Y", category: "Whiskey", tier: "Platinum" },
  { id: "wk25", name: "Barrell Seagrass Rye", category: "Whiskey", tier: "Platinum" },
  { id: "wk26", name: "Whistlepig 10 Rye", category: "Whiskey", tier: "Platinum" },
  { id: "wk27", name: "WhistlePig FarmStock Rye", category: "Whiskey", tier: "Platinum" },

  /* ── SCOTCH ───────────────────────────────────────────────────────────── */
  { id: "sc1", name: "Clan Macgregor", category: "Scotch", tier: "Well" },
  { id: "sc2", name: "Johnnie Walker Red Label", category: "Scotch", tier: "Call" },
  { id: "sc3", name: "Chivas Regal 12Y", category: "Scotch", tier: "Top Shelf" },
  { id: "sc4", name: "Johnnie Walker 18Y", category: "Scotch", tier: "Platinum" },

  /* ── BRANDY & COGNAC ──────────────────────────────────────────────────── */
  { id: "bd1", name: "Christian Bros. VSOP", category: "Brandy", tier: "Well" },
  { id: "bd2", name: "E & J VSOP", category: "Brandy", tier: "Well" },
  { id: "bd3", name: "St Remy Napoleon", category: "Brandy", tier: "Call" },
  { id: "bd4", name: "Cîroc VS", category: "Brandy", tier: "Top Shelf" },
  { id: "bd5", name: "Hennessy VSOP", category: "Brandy", tier: "Platinum" },

  /* ── LIQUEURS & CORDIALS ──────────────────────────────────────────────
     Cocktail modifiers, poured across every program rather than gated by
     shelf tier.                                                          */
  { id: "lq1", name: "B & B Benedictine", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq2", name: "Arrow Cacao White", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq3", name: "Arrow Peppermint", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq4", name: "Dekuyper Triple Sec", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq5", name: "Dekuyper Buttershots", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq6", name: "Dekuyper Peach Tree", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq7", name: "Dekuyper Apple Pucker", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq8", name: "Dekuyper Cacao Dark", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq9", name: "Dekuyper Amaretto", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq10", name: "Midori Melon", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq11", name: "Hpnotiq", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq12", name: "Frangelico", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq13", name: "Goldschlager", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq14", name: "Rumplemintz", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq15", name: "Grande Absente", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq16", name: "Mohawk Triple Sec", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq17", name: "Gran Gala Triple Orange Liqueur", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq18", name: "Carolans Finest Irish Cream", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq19", name: "Chambord Royale", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq20", name: "Pallini Limoncello", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq21", name: "Kahlua", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq22", name: "Jagermeister", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq23", name: "Irish Mist Honey", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq24", name: "Mozart Chocolate Cream", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq25", name: "Drambuie", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq26", name: "Cointreau", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq27", name: "Campari", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq28", name: "Aperol", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq29", name: "Licor 43", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq30", name: "Leblon Cachaça", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq31", name: "Luxardo Maraschino", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq32", name: "Chartreuse Green", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq33", name: "Chartreuse Yellow", category: "Liqueurs & Cordials", tier: "Cordial" },
  { id: "lq34", name: "St. Germain", category: "Liqueurs & Cordials", tier: "Cordial" },
];

/** Category display order for the inventory page and filter chips. */
export const INVENTORY_CATEGORIES: InventoryCategory[] = [
  "Draft Beer",
  "Red",
  "White",
  "Sparkling",
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Whiskey",
  "Scotch",
  "Brandy",
  "Liqueurs & Cordials",
];

/** Human-readable grouping labels for the page headings. */
export const CATEGORY_GROUPS: { label: string; categories: InventoryCategory[] }[] = [
  { label: "Beer", categories: ["Draft Beer"] },
  { label: "Wine", categories: ["Red", "White", "Sparkling"] },
  {
    label: "Spirits",
    categories: ["Vodka", "Gin", "Rum", "Tequila", "Whiskey", "Scotch", "Brandy"],
  },
  { label: "Liqueurs", categories: ["Liqueurs & Cordials"] },
];
