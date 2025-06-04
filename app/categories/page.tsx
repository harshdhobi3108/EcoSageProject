"use client";

import { useState, useMemo } from "react";
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
  Leaf
} from "lucide-react";
import { categories, mockProducts, getProductsByCategory } from "@/lib/products";

const categoryIcons = {
  "drinkware": Coffee,
  "food-storage": Package,
  "bags": ShoppingBag,
  "electronics": Smartphone,
  "personal-care": Heart,
  "home": Home
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all" ? mockProducts : getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const categoryProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat.id] = cat.id === "all" ? mockProducts.length : getProductsByCategory(cat.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-sage-50 to-forest-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="eco-badge mb-4">
            <Leaf className="h-4 w-4 mr-2" />
            Product Categories
          </Badge>
          <h1 className="text-4xl font-bold text-forest-600 mb-4">
            Browse by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect sustainable products organized by category. Every item is carefully selected for its environmental impact.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <h2 className="font-semibold text-lg text-forest-600 mb-4">Categories</h2>
              {categories.map((category) => {
                const IconComponent = category.id === "all" ? Leaf : categoryIcons[category.id as keyof typeof categoryIcons];
                const productCount = categoryProductCounts[category.id] || 0;
                return (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCategory === category.id ? "ring-2 ring-forest-500 bg-forest-50" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedCategory === category.id 
                              ? "bg-forest-500 text-white" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {IconComponent && <IconComponent className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {productCount} product{productCount !== 1 ? "s" : ""}
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

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-forest-600">
                  {categories.find(c => c.id === selectedCategory)?.name || "All Products"}
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
