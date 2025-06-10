import { searchProducts, Product, mockProducts } from "./products";

export interface AIResponse {
  message: string;
  products: Product[];
  confidence: number;
  suggestions?: string[];
}

// Keyword-to-category mapping
const keywordCategories = {
  drinkware: {
    keywords: ["water", "drink", "bottle", "cup", "mug", "hydration"],
    response: "I found some excellent eco-friendly drinkware options for you!"
  },
  "food-storage": {
    keywords: ["food", "lunch", "meal", "storage", "container", "kitchen"],
    response: "Here are some fantastic sustainable food storage solutions!"
  },
  bags: {
    keywords: ["bag", "tote", "shopping", "carry", "backpack"],
    response: "I found some stylish and sustainable bags for your needs!"
  }
  // Add more categories if needed
};

export async function processAIQuery(query: string): Promise<AIResponse> {
  console.log("Processing AI query:", query);

  const lowerQuery = query.toLowerCase().trim();

  const greetingMessages = ["hi", "hello", "hey"];
  if (greetingMessages.includes(lowerQuery)) {
    return {
      message: "Hello! How can I assist you with sustainable products today?",
      products: [],
      confidence: 1.0,
      suggestions: ["Show me a water bottle", "Do you have bamboo lunchboxes?"],
    };
  }

  let products: Product[] = [];
  let response = "";
  let confidence = 0.7;

  // Category matching
  for (const [category, config] of Object.entries(keywordCategories)) {
    if (config.keywords.some(keyword => lowerQuery.includes(keyword))) {
      products = mockProducts.filter(p => p.category === category);
      response = config.response;
      confidence = 0.85;
      break;
    }
  }

  // Fallback to search
  if (products.length === 0) {
    products = searchProducts(query);

    if (products.length > 0) {
      response = `I found ${products.length} sustainable product(s) that match your search.`;
      confidence = 0.6;
    } else {
      products = mockProducts.slice(0, 3);
      response = "I couldn’t find exact matches, but here are popular eco-friendly options.";
      confidence = 0.4;
    }
  }

  products = products.slice(0, 4);

  return {
    message: response,
    products,
    confidence
  };
}
