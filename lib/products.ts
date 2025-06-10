// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  brand?: string;
  ecoScore?: number;
  category?: string;
  tags?: string[];
}


// Mock categories used across your app
export const categories: { id: string; name: string }[] = [
  { id: "all", name: "All Categories" },
  { id: "fruits", name: "Fruits" }, 
  { id: "vegetables", name: "Vegetables" },
  { id: "beverages", name: "Beverages" },
  // Add more if needed
];

// Sample product data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apple",
    description: "Fresh organic apples.",
    price: 120,
    category: "fruits",
    ecoScore: 8,
    image: "/images/apple.jpg",
    inStock: true,
    brand: "Nature's Best",
    tags: ["organic", "fresh", "fruit"],
  },
  {
    id: "2",
    name: "Reusable Water Bottle",
    description: "Eco-friendly stainless steel bottle.",
    price: 299,
    category: "beverages",
    ecoScore: 9,
    image: "/images/bottle.jpg",
    inStock: true,
    brand: "GreenSip",
    tags: ["drinkware", "bottle", "hydration"],
  },
  {
    id: "3",
    name: "Fresh Carrots",
    description: "Organic farm-fresh carrots.",
    price: 60,
    category: "vegetables",
    ecoScore: 7,
    image: "/images/carrots.jpg",
    inStock: true,
    brand: "Farm Fresh",
    tags: ["vegetable", "organic", "healthy"],
  }
  // Add more products as needed
];

// Filter by category
export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
  return categoryId === "all"
    ? products
    : products.filter((p) => p.category === categoryId);
}

// Smart search by name, description or tags
export function searchProducts(query: string, products: Product[]): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter((p) =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
}
