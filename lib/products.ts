interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  ecoScore?: number;
  image: string;
  inStock: boolean;
  brand?: string;
  tags?: string[];
}


export const categories = [
  { id: "all", name: "All Categories" }, // optional if handled in component
  { id: "fruits", name: "Fruits" },
  { id: "vegetables", name: "Vegetables" },
  { id: "beverages", name: "Beverages" },
  // add more categories
];

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
    tags: ["organic", "fresh"],
  },
  // more products here
];

// Filter products by category
export function getProductsByCategory(categoryId: string, products: Product[]): Product[] {
  if (categoryId === "all") return products;
  return products.filter((p) => p.category === categoryId);
}

// Filter products by search query in name or description
export function searchProducts(query: string, products: Product[]): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}
