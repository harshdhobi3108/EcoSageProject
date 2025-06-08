"use client";

import { useEffect, useState } from "react";
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
import { Search, SlidersHorizontal } from "lucide-react";

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

    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort products
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "fruits", name: "Fruits" },
    { id: "vegetables", name: "Vegetables" },
    { id: "beverages", name: "Beverages" },
  ];

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Loading products...</div>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div className="text-center py-12">No products available.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex w-full md:max-w-sm items-center space-x-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={handleCategoryChange} defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSortChange} defaultValue="name">
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

      {/* Product List */}
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
