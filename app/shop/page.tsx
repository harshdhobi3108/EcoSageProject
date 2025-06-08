"use client";

import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { ProductGrid } from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp } from "lucide-react";

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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-forest-50 to-sage-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Badge className="eco-badge">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Sustainable Shopping
            </Badge>
            <h1 className="text-4xl font-bold text-forest-600">
              <Typewriter
                options={{ loop: true, delay: 50, deleteSpeed: 30, cursor: "" }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Shop Eco-Friendly Products")
                    .pauseFor(1500)
                    .deleteAll()
                    .start();
                }}
              />
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of sustainable products. Every purchase makes a positive impact on our planet.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <TrendingUp className="h-8 w-8 text-forest-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-forest-600">{products.length}+</div>
              <div className="text-sm text-muted-foreground">Eco Products</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-forest-600">9.0+</div>
              <div className="text-sm text-muted-foreground">Avg Eco Score</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-forest-600">100%</div>
              <div className="text-sm text-muted-foreground">Sustainable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading products...</div>
          ) : (
            <ProductGrid products={products} loading={loading} />
          )}
        </div>
      </section>
    </div>
  );
}
