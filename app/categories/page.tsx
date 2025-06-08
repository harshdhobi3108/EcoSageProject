"use client";

import Typewriter from "typewriter-effect";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

import {
  Package,
  Coffee,
  ShoppingBag,
  Smartphone,
  Heart,
  Home,
  Leaf,
  Shirt,
  Dumbbell,
  Utensils,
  Gem,
} from "lucide-react";

// Updated list of categories
const categories = [
  { id: "all", name: "All Products" },
  { id: "drinkware", name: "Drinkware" },
  { id: "food-storage", name: "Food Storage" },
  { id: "bags", name: "Bags" },
  { id: "electronics", name: "Electronics" },
  { id: "personal-care", name: "Personal Care" },
  { id: "home", name: "Home" },
  { id: "clothing", name: "Clothing" },
  { id: "fitness", name: "Fitness" },
  { id: "kitchen", name: "Kitchen" },
  { id: "accessories", name: "Accessories" },
];

const categoryIcons: Record<string, any> = {
  drinkware: Coffee,
  "food-storage": Package,
  bags: ShoppingBag,
  electronics: Smartphone,
  "personal-care": Heart,
  home: Home,
  clothing: Shirt,
  fitness: Dumbbell,
  kitchen: Utensils,
  accessories: Gem,
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  ecoScore?: number;
  brand?: string;
  tags?: string[];
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const categoryProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      if (cat.id === "all") {
        counts[cat.id] = products.length;
      } else {
        counts[cat.id] = products.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-sage-50 to-forest-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="eco-badge mb-4">
            <Leaf className="h-4 w-4 mr-2" />
            Product Categories
          </Badge>
          <h1 className="text-4xl font-bold text-forest-600">
            <Typewriter
              options={{ loop: true, delay: 50, deleteSpeed: 30, cursor: "" }}
              onInit={(typewriter) => {
                return typewriter
                  .typeString("Browse by Category")
                  .pauseFor(1500)
                  .deleteAll()
                  .pauseFor(1500)
                  .start();
              }}
            />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect sustainable products organized by category. Every item
            is carefully selected for its environmental impact.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <h2 className="font-semibold text-lg text-forest-600 mb-4">
                Categories
              </h2>
              {categories.map((category) => {
                const IconComponent =
                  category.id === "all"
                    ? Leaf
                    : categoryIcons[category.id as keyof typeof categoryIcons];
                const productCount = categoryProductCounts[category.id] || 0;

                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCategory === category.id
                        ? "ring-2 ring-forest-500 bg-forest-50"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedCategory === category.id
                                ? "bg-forest-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {IconComponent && <IconComponent className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {productCount} product
                              {productCount !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-forest-600">
                  {categories.find((c) => c.id === selectedCategory)?.name ||
                    "All Products"}
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  We're working on adding more products to this category.
                </p>
                <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
