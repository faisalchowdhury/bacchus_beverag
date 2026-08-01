import type { Package, InventoryItem, Testimonial } from "../types";

export const PACKAGES: Package[] = [
  {
    id: "Essential",
    name: "The Essential Pour",
    pricePerGuest: 25,
    description: "Perfect for casual receptions, cocktail hours, and intimate gatherings wanting a curated selection of staples.",
    inclusions: [
      "2 Standard Domestic Beers",
      "2 House Wines (1 Red, 1 White)",
      "Essential Soft Drinks & Sparkling Water",
      "Professional TIPS-Certified Bartender (1 per 75 guests)",
      "Standard Acrylic Barware & Napkins",
      "Ice, Coolers, and Professional Bar Tools",
      "4 Hours of Service",
    ],
  },
  {
    id: "Premium",
    name: "The Bacchus Premium",
    pricePerGuest: 45,
    description: "Our signature experience offering a refined range of mid-tier liquors, imported beers, and estate wines.",
    inclusions: [
      "Full Premium Bar Spirits (Vodka, Gin, Rum, Tequila, Bourbon, Scotch)",
      "2 Imported & 2 Domestic Beers",
      "3 Premium Estate Wines (Cabernet, Chardonnay, Rosé)",
      "1 Custom Selected Signature Cocktail",
      "Premium Soda, Tonic, Club Soda, juices & Garnishes",
      "TIPS-Certified Bartenders with Uniform Styling",
      "Premium Recyclable Barware & Linens",
      "5 Hours of Service",
    ],
  },
  {
    id: "Luxury",
    name: "The Sommelier & Top Shelf",
    pricePerGuest: 75,
    description: "Uncompromised extravagance featuring ultra-premium spirits, hand-selected sommelier wines, and custom mixology.",
    inclusions: [
      "Top-Shelf Curated Spirits (Macallan, Grey Goose, Hendrick's, Patron, Woodford Reserve)",
      "3 Craft & 2 Imported Beers, Apple Cider",
      "Premium Sommelier-Tier Wines & Champagne Toast",
      "2 Custom Craft Signature Cocktails with Custom Garnishes",
      "Hand-pressed Fresh Juices, House-made Syrups, Artisanal Tonics",
      "Elite Mixologists with Sophisticated attire",
      "Sophisticated Glassware Option (or Ultra-Premium Shatterproof)",
      "6 Hours of Service",
    ],
  },
];

export const INVENTORY: InventoryItem[] = [
  // WHISKEY / BOURBON
  {
    id: "w1",
    name: "Macallan 12 Year Double Cask",
    category: "Whiskey",
    tier: "Top Shelf",
    description: "A beautifully balanced single malt Scotch with notes of rich dried fruit, warm spices, and creamy butterscotch.",
    origin: "Speyside, Scotland",
  },
  {
    id: "w2",
    name: "Woodford Reserve Double Oaked",
    category: "Bourbon",
    tier: "Premium",
    description: "An innovative, twice-barreled bourbon that offers deep, rich flavors of dark caramel, hazelnut, and sweet cocoa.",
    origin: "Kentucky, USA",
  },
  {
    id: "w3",
    name: "Maker's Mark",
    category: "Bourbon",
    tier: "Call",
    description: "Smooth, approachable wheated bourbon with sweet vanilla, caramel, and fruit aromas.",
    origin: "Kentucky, USA",
  },
  {
    id: "w4",
    name: "Bulleit Rye",
    category: "Whiskey",
    tier: "Premium",
    description: "Award-winning straight rye whiskey with an unmatched character of rich oak, spice, and clean vanilla finish.",
    origin: "Indiana, USA",
  },
  {
    id: "w5",
    name: "Evan Williams Black Label",
    category: "Bourbon",
    tier: "Well",
    description: "Smooth, rich, and easy-to-enjoy Bourbon named after Kentucky's first commercial distiller.",
    origin: "Kentucky, USA",
  },

  // VODKA
  {
    id: "v1",
    name: "Grey Goose",
    category: "Vodka",
    tier: "Top Shelf",
    description: "An exceptional French vodka made from single-origin Picardie wheat, offering an exquisite, buttery smoothness.",
    origin: "Cognac, France",
  },
  {
    id: "v2",
    name: "Belvedere",
    category: "Vodka",
    tier: "Premium",
    description: "Super-premium Polish rye vodka characterized by its velvety texture, subtle almond sweetness, and crisp finish.",
    origin: "Żyrardów, Poland",
  },
  {
    id: "v3",
    name: "Tito's Handmade Vodka",
    category: "Vodka",
    tier: "Call",
    description: "America's original craft vodka, distilled 6 times from yellow corn in traditional copper pot stills.",
    origin: "Texas, USA",
  },
  {
    id: "v4",
    name: "Smirnoff No. 21",
    category: "Vodka",
    tier: "Well",
    description: "Classic robust vodka, triple distilled and ten times filtered for absolute clarity and neutral taste.",
    origin: "Illinois, USA",
  },

  // GIN
  {
    id: "g1",
    name: "Hendrick's",
    category: "Gin",
    tier: "Top Shelf",
    description: "An unexpectedly sublime gin infused with rose petals and cucumber essences, creating a refreshing floral bouquet.",
    origin: "Girvan, Scotland",
  },
  {
    id: "g2",
    name: "Tanqueray No. TEN",
    category: "Gin",
    tier: "Premium",
    description: "Crafted with whole fresh citrus fruits, presenting crisp grapefruit, lime, and orange notes with classic juniper.",
    origin: "London, England",
  },
  {
    id: "g3",
    name: "Bombay Sapphire",
    category: "Gin",
    tier: "Call",
    description: "Vapour-infused with 10 hand-selected exotic botanicals for a bright, complex, and highly versatile citrus profile.",
    origin: "Hampshire, England",
  },
  {
    id: "g4",
    name: "Gordon's London Dry",
    category: "Gin",
    tier: "Well",
    description: "A traditional juniper-forward London dry gin crafted using a secret recipe dating back to 1769.",
    origin: "London, England",
  },

  // TEQUILA
  {
    id: "t1",
    name: "Don Julio 1942 Añejo",
    category: "Tequila",
    tier: "Top Shelf",
    description: "An extraordinary tequila handcrafted in tribute to the year Don Julio began his journey. Aged for 2.5 years for notes of rich caramel and vanilla.",
    origin: "Jalisco, Mexico",
  },
  {
    id: "t2",
    name: "Patrón Silver",
    category: "Tequila",
    tier: "Premium",
    description: "A luxury white tequila distilled from 100% Weber Blue Agave, delivering smooth aromas of fresh citrus and pepper.",
    origin: "Jalisco, Mexico",
  },
  {
    id: "t3",
    name: "Casamigos Reposado",
    category: "Tequila",
    tier: "Premium",
    description: "Aged for 7 months, Casamigos is ultra-smooth with notes of dried fruit and warm oak sweetness.",
    origin: "Jalisco, Mexico",
  },
  {
    id: "t4",
    name: "Jose Cuervo Especial Gold",
    category: "Tequila",
    tier: "Well",
    description: "A golden-style tequila, double distilled and aged in oak barrels for a sweet, subtle agave character.",
    origin: "Jalisco, Mexico",
  },

  // RUM
  {
    id: "r1",
    name: "Ron Zacapa Centenario 23",
    category: "Rum",
    tier: "Top Shelf",
    description: "Ultra-premium rum aged using the Solera system at high altitude. Sweet butterscotch, spiced oak, and dried fruit flavors.",
    origin: "Guatemala",
  },
  {
    id: "r2",
    name: "Bacardí Ocho (8 Year)",
    category: "Rum",
    tier: "Premium",
    description: "Barrel-aged for a minimum of 8 years. Notes of prune, apricot, nutmeg, and rich vanilla.",
    origin: "Puerto Rico",
  },
  {
    id: "r3",
    name: "Captain Morgan Private Stock",
    category: "Rum",
    tier: "Call",
    description: "Fine Puerto Rican rum blended with island spices and warm vanilla notes for a velvety, premium spiced finish.",
    origin: "Puerto Rico",
  },

  // WINE / CHAMPAGNE
  {
    id: "wn1",
    name: "Veuve Clicquot Yellow Label",
    category: "Champagne",
    tier: "Top Shelf",
    description: "Iconic champagne displaying crisp apple, toasted brioche, and fine, creamy bubbles with an elegant structure.",
    origin: "Champagne, France",
  },
  {
    id: "wn2",
    name: "Meiomi Pinot Noir",
    category: "Wine",
    tier: "Premium",
    description: "A rich, deep red wine showing notes of dark berries, sweet mocha, toasted oak, and smooth, velvety tannins.",
    origin: "California, USA",
  },
  {
    id: "wn3",
    name: "Santa Margherita Pinot Grigio",
    category: "Wine",
    tier: "Premium",
    description: "Crisp, elegant dry white wine from the Adige River Valley with vibrant green apple and citrus aromas.",
    origin: "Trentino-Alto Adige, Italy",
  },
  {
    id: "wn4",
    name: "Moët & Chandon Imperial Brut",
    category: "Champagne",
    tier: "Top Shelf",
    description: "Bright fruitiness, seductive palate, and elegant maturity. The quintessential celebratory toast champagne.",
    origin: "Champagne, France",
  },

  // BEER
  {
    id: "b1",
    name: "Kona Big Wave Golden Ale",
    category: "Beer",
    tier: "Standard",
    description: "A lighter-bodied golden ale with a tropical hop aroma and clean, incredibly refreshing finish.",
    origin: "Hawaii, USA",
  },
  {
    id: "b2",
    name: "Lagunitas IPA",
    category: "Beer",
    tier: "Standard",
    description: "A well-rounded, highly drinkable craft IPA loaded with piney, citrusy, and resinous hop elements.",
    origin: "California, USA",
  },
  {
    id: "b3",
    name: "Stella Artois",
    category: "Beer",
    tier: "Standard",
    description: "A classic European pale lager, crisp, beautifully balanced, with a pleasantly bitter floral hop profile.",
    origin: "Leuven, Belgium",
  },

  // SIGNATURE COCKTAILS
  {
    id: "sc1",
    name: "The Bacchus Old Fashioned",
    category: "Signature Cocktails",
    tier: "Top Shelf",
    description: "Premium double-oaked bourbon, hand-pressed orange peel essence, house-steeped cherry bark bitters, and high-purity clear ice.",
  },
  {
    id: "sc2",
    name: "Spiced Lavender Margarita",
    category: "Signature Cocktails",
    tier: "Premium",
    description: "Distilled organic agave tequila, freshly squeezed lime juice, wild lavender-infused agave nectar, and a smoked-chili salt rim.",
  },
  {
    id: "sc3",
    name: "The Elderflower Champagne Spritz",
    category: "Signature Cocktails",
    tier: "Top Shelf",
    description: "French elderflower liqueur, hand-harvested mint leaves, artisanal club soda, topped with crisp Veuve Clicquot champagne.",
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
    a: "It starts with our Interactive Quote Wizard! Select your details and get an instant itemized pricing estimate. If you're pleased, submit the request, and our event coordinator will contact you to finalize the custom signature drink selection and lock in your date with a 25% deposit.",
  },
  {
    q: "Is alcohol included in your packages?",
    a: "Yes! Unlike dry-hire companies, we provide comprehensive services that can include full top-shelf alcohol sourcing, professional TIPS-certified staff, bar design rentals, mixers, house-made syrups, premium barware, and high-grade ice. We handle the entire logistics cycle.",
  },
  {
    q: "Can we customize our signature cocktails?",
    a: "Absolutely. Signature cocktails are our specialty. During our final consult, our mixologists will design 1-2 custom craft cocktails inspired by your preferences, incorporating fresh ingredients, botanical extractions, and bespoke presentation elements (e.g., dehydrated citrus, smoke, stenciling).",
  },
  {
    q: "What licenses and insurance do you carry?",
    a: "Bacchus Beverages is fully licensed and carries $2,000,000 in General and Liquor Liability Insurance. All of our bartenders are certified through TIPS (Training for Intervention Procedures) to ensure safe, responsible, and elegant hospitality.",
  },
  {
    q: "Do you service events with multiple bars or locations?",
    a: "Yes, we are fully equipped for complex venue layouts. Through our quote wizard, you can specify additional bar locations (such as separate cocktail hours, lounge setups, or VIP bars). We provide separate stylish, matching mobile bar rentals and staffing for each location.",
  },
];

export const GALLERY_IMAGES = [
  {
    id: "g1",
    title: "Signature Champagne Tower",
    category: "Weddings",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g2",
    title: "Artisanal Cocktail Crafting",
    category: "Private Events",
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g3",
    title: "Bespoke Outdoor Wedding Bar",
    category: "Weddings",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g4",
    title: "The Bacchus Old Fashioned",
    category: "Private Events",
    url: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g5",
    title: "Corporate Gala Toast",
    category: "Corporate",
    url: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g6",
    title: "Craft Beer & Tap Setup",
    category: "Corporate",
    url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g7",
    title: "Elegant Reception Pour",
    category: "Weddings",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g8",
    title: "Luxury Lounge Mobile Bar",
    category: "Private Events",
    url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
  },
];
