import { searchProducts, Product, mockProducts } from "./products";

export interface AIResponse {
  message: string;
  products: Product[];
  confidence: number;
}

// Advanced keyword mapping for better AI responses
const keywordCategories = {
  drinkware: {
    keywords: ["water", "drink", "beverage", "bottle", "cup", "mug", "hydration", "thirsty", "coffee", "tea"],
    response: "I found some excellent eco-friendly drinkware options for you! These products will help you stay hydrated while reducing single-use plastic waste."
  },
  "food-storage": {
    keywords: ["food", "lunch", "meal", "storage", "container", "wrap", "preserve", "kitchen", "eating", "snack"],
    response: "Here are some fantastic sustainable food storage solutions that will help you reduce waste and keep your food fresh!"
  },
  bags: {
    keywords: ["bag", "carry", "shopping", "tote", "backpack", "travel", "transport", "grocery", "portable"],
    response: "I found these amazing eco-friendly bags that are perfect for reducing plastic waste while staying stylish and functional!"
  },
  electronics: {
    keywords: ["phone", "electronic", "charger", "solar", "power", "battery", "device", "tech", "gadget", "wireless"],
    response: "Check out these sustainable electronics that combine cutting-edge technology with environmental responsibility!"
  },
  "personal-care": {
    keywords: ["personal", "care", "hygiene", "toothbrush", "beauty", "health", "wellness", "clean", "yoga", "fitness"],
    response: "I've found some wonderful eco-friendly personal care products that are gentle on both you and the environment!"
  },
  home: {
    keywords: ["home", "house", "garden", "decor", "light", "sheet", "bed", "room", "indoor", "outdoor", "kombucha"],
    response: "Here are some excellent sustainable home products that will make your living space more eco-friendly and beautiful!"
  }
};

const intentPatterns = {
  travel: {
    keywords: ["travel", "trip", "vacation", "portable", "compact", "lightweight", "hiking", "camping", "outdoor"],
    filter: (products: Product[]) => products.filter(p => 
      p.tags.includes("travel-friendly") || 
      p.tags.includes("portable") || 
      p.tags.includes("hiking") ||
      p.category === "bags"
    ),
    response: "Perfect for your travels! I found these portable, eco-friendly products that are ideal for sustainable adventures."
  },
  budget: {
    keywords: ["cheap", "affordable", "budget", "inexpensive", "low cost", "under", "less than"],
    filter: (products: Product[]) => products.filter(p => p.price < 30).sort((a, b) => a.price - b.price),
    response: "Here are some budget-friendly eco products that won't break the bank while still making a positive impact!"
  },
  premium: {
    keywords: ["best", "premium", "high quality", "luxury", "top", "expensive", "high-end"],
    filter: (products: Product[]) => products.filter(p => p.ecoScore >= 8 && p.price > 40).sort((a, b) => b.ecoScore - a.ecoScore),
    response: "I've selected our premium eco-friendly products with the highest sustainability scores and exceptional quality!"
  },
  beginner: {
    keywords: ["beginner", "start", "first time", "new", "easy", "simple", "basic"],
    filter: (products: Product[]) => products.filter(p => p.ecoScore >= 7).sort((a, b) => a.price - b.price),
    response: "Great for getting started with sustainable living! These products are easy to use and make a real difference."
  },
  gift: {
    keywords: ["gift", "present", "someone", "friend", "family", "surprise"],
    filter: (products: Product[]) => products.filter(p => p.ecoScore >= 8).sort((a, b) => b.ecoScore - a.ecoScore),
    response: "These make wonderful eco-friendly gifts! Your recipient will love these sustainable products that show you care about the planet."
  }
};

export function processAIQuery(query: string): AIResponse {
  console.log("Processing AI query:", query);
  
  const lowerQuery = query.toLowerCase();
  let products: Product[] = [];
  let response = "";
  let confidence = 0.7; // Base confidence

  // First, check for specific intents
  let intentMatched = false;
  for (const [intent, config] of Object.entries(intentPatterns)) {
    if (config.keywords.some(keyword => lowerQuery.includes(keyword))) {
      console.log("Intent matched:", intent);
      products = config.filter(mockProducts);
      response = config.response;
      confidence = 0.9;
      intentMatched = true;
      break;
    }
  }

  // If no intent matched, check category keywords
  if (!intentMatched) {
    for (const [category, config] of Object.entries(keywordCategories)) {
      if (config.keywords.some(keyword => lowerQuery.includes(keyword))) {
        console.log("Category matched:", category);
        products = mockProducts.filter(p => p.category === category);
        response = config.response;
        confidence = 0.8;
        break;
      }
    }
  }

  // Fallback to general search
  if (products.length === 0) {
    console.log("Using fallback search");
    products = searchProducts(query);
    
    if (products.length > 0) {
      response = `I found ${products.length} sustainable product${products.length === 1 ? '' : 's'} that match your search. These eco-friendly options will help you make a positive environmental impact!`;
      confidence = 0.6;
    } else {
      // Show popular products as ultimate fallback
      products = mockProducts.filter(p => p.ecoScore >= 8).slice(0, 4);
      response = "I couldn't find specific matches for your request, but here are some of our most popular eco-friendly products that customers love!";
      confidence = 0.4;
    }
  }

  // Enhance response with specific product context
  if (products.length > 0) {
    const avgEcoScore = products.reduce((sum, p) => sum + p.ecoScore, 0) / products.length;
    const priceRange = {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    };

    if (avgEcoScore >= 8.5) {
      response += " These products have exceptional sustainability scores!";
    }
    
    if (priceRange.min === priceRange.max) {
      response += ` All priced at $${priceRange.min.toFixed(2)}.`;
    } else {
      response += ` Prices range from $${priceRange.min.toFixed(2)} to $${priceRange.max.toFixed(2)}.`;
    }
  }

  // Sort products by eco score for best recommendations
  products = products.sort((a, b) => b.ecoScore - a.ecoScore).slice(0, 4);

  console.log("AI response generated:", { 
    response, 
    productCount: products.length, 
    confidence,
    avgEcoScore: products.length > 0 ? products.reduce((sum, p) => sum + p.ecoScore, 0) / products.length : 0
  });

  return {
    message: response,
    products,
    confidence
  };
}

// Additional helper for conversation context
export function generateFollowUpSuggestions(lastQuery: string, products: Product[]): string[] {
  const suggestions: string[] = [];
  
  if (products.length > 0) {
    const category = products[0].category;
    suggestions.push(`Show me more ${category} products`);
    
    if (products.some(p => p.price < 25)) {
      suggestions.push("What are your most affordable options?");
    }
    
    if (products.some(p => p.ecoScore >= 9)) {
      suggestions.push("Which products have the highest eco scores?");
    }
  }
  
  suggestions.push("What's trending in sustainable products?");
  suggestions.push("I need gift ideas for someone eco-conscious");
  suggestions.push("Show me products for zero-waste living");
  
  return suggestions.slice(0, 3);
}