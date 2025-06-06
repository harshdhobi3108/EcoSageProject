"use client";

import Typewriter from "typewriter-effect";
import { ProductGrid } from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp } from "lucide-react";

export default function ShopPage() {
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
    options={{
      loop: true,
      delay: 50,
      deleteSpeed: 30,
      cursor: "",
    }}
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
              <div className="text-2xl font-bold text-forest-600">18+</div>
              <div className="text-sm text-muted-foreground">Eco Products</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-forest-600">8.5+</div>
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
          <ProductGrid />
        </div>
      </section>
    </div>
  );
}
