// product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  ecoScore: number; // 1-10 sustainability rating
  inStock: boolean;
  brand: string;
  materials: string[];
  certifications: string[];
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "EcoFlow Stainless Steel Water Bottle",
    description: "Double-walled vacuum insulated bottle made from recycled stainless steel. Keeps drinks cold for 24h, hot for 12h.",
    price: 100,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "drinkware",
    tags: ["reusable", "travel-friendly", "BPA-free", "insulated"],
    ecoScore: 9,
    inStock: true,
    brand: "EcoFlow",
    materials: ["recycled stainless steel", "silicone"],
    certifications: ["Cradle to Cradle", "BPA-Free"]
  },
  {
    id: "2",
    name: "Bamboo Fiber Lunch Box Set",
    description: "Complete lunch set made from sustainable bamboo fiber. Includes container, utensils, and carrying bag.",
    price: 150,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&h=400&q=80",
    category: "food-storage",
    tags: ["biodegradable", "zero-waste", "portable", "microwave-safe"],
    ecoScore: 8,
    inStock: true,
    brand: "GreenEats",
    materials: ["bamboo fiber", "corn starch"],
    certifications: ["FDA Approved", "Biodegradable"]
  },
  {
    id: "3",
    name: "Organic Cotton Canvas Tote Bag",
    description: "Durable tote bag made from 100% organic cotton. Perfect for groceries, books, or daily essentials.",
    price: 50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "bags",
    tags: ["organic", "reusable", "plastic-free", "durable"],
    ecoScore: 7,
    inStock: true,
    brand: "EarthCarry",
    materials: ["100% organic cotton"],
    certifications: ["GOTS Certified", "Fair Trade"]
  },
  {
    id: "4",
    name: "Solar Power Bank 20,000mAh",
    description: "High-capacity portable charger with solar panels. Emergency power source for outdoor adventures.",
    price: 1000,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "electronics",
    tags: ["solar-powered", "portable", "wireless-charging", "weatherproof"],
    ecoScore: 8,
    inStock: true,
    brand: "SolarTech",
    materials: ["recycled aluminum", "monocrystalline solar cells"],
    certifications: ["Energy Star", "RoHS Compliant"]
  },
  {
    id: "5",
    name: "Beeswax Food Wraps Set",
    description: "Natural alternative to plastic wrap. Set of 3 wraps in different sizes made with organic beeswax.",
    price: 100,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    category: "food-storage",
    tags: ["plastic-free", "reusable", "compostable", "natural"],
    ecoScore: 9,
    inStock: true,
    brand: "BeePure",
    materials: ["organic cotton", "beeswax", "jojoba oil"],
    certifications: ["Organic Certified", "Compostable"]
  },
  {
    id: "6",
    name: "Recycled Ocean Plastic Smartphone Case",
    description: "Protective phone case made from 100% recycled ocean plastic. Available for multiple phone models.",
    price: 200,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "electronics",
    tags: ["recycled", "ocean-cleanup", "protective", "wireless-compatible"],
    ecoScore: 8,
    inStock: true,
    brand: "OceanGuard",
    materials: ["100% recycled ocean plastic"],
    certifications: ["Ocean Positive", "Carbon Neutral"]
  },
  {
    id: "7",
    name: "Hemp Backpack 30L",
    description: "Durable hiking backpack made from 100% organic hemp. Water-resistant and perfect for outdoor adventures.",
    price: 120,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "bags",
    tags: ["organic", "durable", "water-resistant", "hiking"],
    ecoScore: 8,
    inStock: true,
    brand: "EarthCarry",
    materials: ["100% organic hemp", "recycled zippers"],
    certifications: ["GOTS Certified", "Vegan"]
  },
  {
    id: "8",
    name: "Biodegradable Phone Case",
    description: "Plant-based phone case that naturally biodegrades when composted. Available for all major phone models.",
    price: 250,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "electronics",
    tags: ["biodegradable", "plant-based", "compostable", "protective"],
    ecoScore: 9,
    inStock: true,
    brand: "PlantCase",
    materials: ["plant-based bioplastic", "natural fibers"],
    certifications: ["Compostable", "Plastic-Free"]
  },
  {
    id: "9",
    name: "Organic Bamboo Toothbrush Set",
    description: "Set of 4 biodegradable toothbrushes with soft bristles. Plastic-free dental care solution.",
    price: 50,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
    category: "personal-care",
    tags: ["biodegradable", "plastic-free", "organic", "dental-care"],
    ecoScore: 9,
    inStock: true,
    brand: "BambooBrush",
    materials: ["organic bamboo", "natural bristles"],
    certifications: ["Organic", "Vegan", "Compostable"]
  },
  {
    id: "10",
    name: "Reusable Silicone Food Storage Bags",
    description: "Set of 6 leak-proof silicone bags in various sizes. Dishwasher safe and freezer friendly.",
    price: 100,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    category: "food-storage",
    tags: ["reusable", "leak-proof", "dishwasher-safe", "plastic-free"],
    ecoScore: 8,
    inStock: true,
    brand: "SiliSafe",
    materials: ["food-grade silicone"],
    certifications: ["FDA Approved", "BPA-Free"]
  },
  {
    id: "11",
    name: "Solar Garden String Lights",
    description: "20ft waterproof LED string lights powered by solar energy. Perfect for outdoor entertaining.",
    price: 300,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=400&q=80",
    category: "home",
    tags: ["solar-powered", "waterproof", "decorative", "energy-efficient"],
    ecoScore: 8,
    inStock: true,
    brand: "SolarGlow",
    materials: ["recycled copper wire", "solar panel"],
    certifications: ["IP65 Waterproof", "Energy Star"]
  },
  {
    id: "12",
    name: "Organic Cotton Mesh Produce Bags",
    description: "Set of 9 reusable produce bags in 3 sizes. Tare weight labels included for easy checkout.",
    price: 70,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "bags",
    tags: ["organic", "reusable", "zero-waste", "grocery"],
    ecoScore: 9,
    inStock: true,
    brand: "ZeroWaste",
    materials: ["100% organic cotton"],
    certifications: ["GOTS Certified", "Fair Trade"]
  },
  {
    id: "13",
    name: "Rechargeable LED Lantern",
    description: "Portable solar/USB rechargeable lantern with 3 brightness levels. Emergency power bank included.",
    price: 100,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "electronics",
    tags: ["solar-powered", "rechargeable", "portable", "emergency"],
    ecoScore: 8,
    inStock: true,
    brand: "BrightLife",
    materials: ["recycled aluminum", "solar panel"],
    certifications: ["IP54 Rated", "Energy Efficient"]
  },
  {
    id: "14",
    name: "Kombucha Brewing Kit",
    description: "Complete starter kit for brewing your own kombucha at home. Includes SCOBY, tea, and instructions.",
    price: 250,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    category: "home",
    tags: ["DIY", "fermentation", "healthy", "sustainable"],
    ecoScore: 7,
    inStock: true,
    brand: "BrewLife",
    materials: ["glass jar", "organic tea", "live SCOBY"],
    certifications: ["Organic", "Non-GMO"]
  },
  {
    id: "15",
    name: "Eco-Friendly Yoga Mat",
    description: "Non-slip yoga mat made from natural cork and rubber. Biodegradable and antimicrobial.",
    price: 150,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "personal-care",
    tags: ["natural", "non-slip", "antimicrobial", "biodegradable"],
    ecoScore: 8,
    inStock: true,
    brand: "YogaNature",
    materials: ["natural cork", "natural rubber"],
    certifications: ["Eco-Friendly", "Non-Toxic"]
  },
  {
    id: "16",
    name: "Stainless Steel Lunch Containers",
    description: "Set of 3 stackable lunch containers with leak-proof lids. Perfect for meal prep and storage.",
    price: 700,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=400&q=80",
    category: "food-storage",
    tags: ["stackable", "leak-proof", "meal-prep", "durable"],
    ecoScore: 8,
    inStock: true,
    brand: "SteelWare",
    materials: ["18/8 stainless steel", "silicone seals"],
    certifications: ["BPA-Free", "Dishwasher Safe"]
  },
  {
    id: "17",
    name: "Wooden Wireless Charging Pad",
    description: "Handcrafted wireless charging pad made from sustainable bamboo. Compatible with all Qi devices.",
    price: 500,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "electronics",
    tags: ["wireless-charging", "handcrafted", "sustainable", "bamboo"],
    ecoScore: 7,
    inStock: true,
    brand: "WoodTech",
    materials: ["sustainable bamboo", "Qi charging coil"],
    certifications: ["FSC Certified", "Qi Compatible"]
  },
  {
    id: "18",
    name: "Organic Cotton Bed Sheets Set",
    description: "Luxuriously soft 100% organic cotton sheet set. Breathable, hypoallergenic, and ethically made.",
    price: 100,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    category: "home",
    tags: ["organic", "hypoallergenic", "breathable", "ethical"],
    ecoScore: 8,
    inStock: true,
    brand: "SleepGreen",
    materials: ["100% organic cotton"],
    certifications: ["GOTS Certified", "OEKO-TEX", "Fair Trade"]
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "drinkware", name: "Drinkware" },
  { id: "food-storage", name: "Food Storage" },
  { id: "bags", name: "Bags & Carriers" },
  { id: "electronics", name: "Electronics" },
  { id: "personal-care", name: "Personal Care" },
  { id: "home", name: "Home & Garden" }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

export function searchProducts(query: string, products: Product[] = mockProducts): Product[] {
  if (!query.trim()) return products;

  const searchTerms = query.toLowerCase().split(" ");

  return products.filter(product => {
    const searchableText = `
      ${product.name}
      ${product.description}
      ${product.category}
      ${product.brand}
      ${product.tags.join(" ")}
      ${product.materials.join(" ")}
      ${product.certifications.join(" ")}
    `.toLowerCase();

    return searchTerms.some(term => searchableText.includes(term));
  });
}

export function getProductsByCategory(categoryId: string, products: Product[] = mockProducts): Product[] {
  if (categoryId === "all") return products;
  return products.filter(product => product.category === categoryId);
}

export function filterProducts(products: Product[], options: { inStock?: boolean; minEcoScore?: number } = {}): Product[] {
  return products.filter(product => {
    if (options.inStock !== undefined && product.inStock !== options.inStock) return false;
    if (options.minEcoScore !== undefined && product.ecoScore < options.minEcoScore) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: "price-asc" | "price-desc" | "ecoScore-desc" = "price-asc"): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "ecoScore-desc": return b.ecoScore - a.ecoScore;
      default: return 0;
    }
  });
}

export function filterAndSortProducts({
  query = "",
  categoryId = "all",
  inStock,
  minEcoScore,
  sortBy = "price-asc"
}: {
  query?: string;
  categoryId?: string;
  inStock?: boolean;
  minEcoScore?: number;
  sortBy?: "price-asc" | "price-desc" | "ecoScore-desc";
}): Product[] {
  let results = searchProducts(query);
  results = getProductsByCategory(categoryId, results);
  results = filterProducts(results, { inStock, minEcoScore });
  return sortProducts(results, sortBy);
}