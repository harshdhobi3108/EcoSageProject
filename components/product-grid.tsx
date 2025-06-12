"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  SlidersHorizontal,
  Coffee,
  Package,
  ShoppingBag,
  Smartphone,
  Heart,
  Home,
  Shirt,
  Dumbbell,
  Utensils,
  Gem,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  ecoScore: number;
  image: string;
  inStock: boolean;
  brand: string;
  tags?: string[];
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    if (!products || !Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let result: Product[] = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "eco-score":
          return b.ecoScore - a.ecoScore;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading products...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-12">No products available.</div>;
  }

  const categories = [
    { id: "all", name: "All", icon: null },
    { id: "drinkware", name: "Drinkware", icon: Coffee },
    { id: "food-storage", name: "Food Storage", icon: Package },
    { id: "bags", name: "Bags", icon: ShoppingBag },
    { id: "electronics", name: "Electronics", icon: Smartphone },
    { id: "personal-care", name: "Personal Care", icon: Heart },
    { id: "home", name: "Home", icon: Home },
    { id: "clothing", name: "Clothing", icon: Shirt },
    { id: "fitness", name: "Fitness", icon: Dumbbell },
    { id: "kitchen", name: "Kitchen", icon: Utensils },
    { id: "accessories", name: "Accessories", icon: Gem },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex w-full md:max-w-sm items-center space-x-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2">
          <Select onValueChange={setSelectedCategory} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2">
                    {cat.icon && <cat.icon className="h-4 w-4" />}
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSortBy} defaultValue="name">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="eco-score">Eco Score</SelectItem>
            </SelectContent>
          </Select>

          <SlidersHorizontal className="text-muted-foreground" />
        </div>
      </div>

      {/* Product list */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("name");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
