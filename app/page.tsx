"use client";

import { AIAssistant } from "@/components/ai-assistant";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Sparkles, ShoppingBag, Heart, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  console.log("Home page rendered");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-sage-50 to-forest-50">
        <div className="absolute inset-0 bg-organic-pattern opacity-30"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="eco-badge text-sm">
                  <Leaf className="h-4 w-4 mr-2" />
                  AI-Powered Sustainability
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-forest-600 leading-tight">
                  Shop Sustainable with 
                  <span className="gradient-mesh bg-clip-text text-transparent block">
                    AI Guidance
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover eco-friendly products tailored to your needs. Our AI assistant helps you find sustainable alternatives that match your lifestyle.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/ai-assistant">
                  <Button size="lg" className="bg-forest-500 hover:bg-forest-600 text-white w-full sm:w-auto">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Try AI Assistant
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-600">1000+</div>
                  <div className="text-sm text-muted-foreground">Eco Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-600">4.8★</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-600">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>

            {/* AI Assistant Preview */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-forest-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-forest-600">EcoSage AI</div>
                      <div className="text-sm text-muted-foreground">Your sustainability guide</div>
                    </div>
                  </div>
                  
                  <div className="chat-bubble bg-gray-50 border-gray-200">
                    <p className="text-sm">Hi! I can help you find sustainable products. What are you looking for today?</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-forest-50">
                      Water bottle
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-forest-50">
                      Lunch box
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-forest-50">
                      Travel gear
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-forest-600">
              Meet Your AI Shopping Assistant
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simply describe what you need, and our AI will recommend the perfect sustainable products for you. 
              No more endless browsing - just smart, personalized recommendations.
            </p>
          </div>
          
          <AIAssistant />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-sage-50/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-forest-600">
                Featured Eco Products
              </h2>
              <p className="text-muted-foreground">
                Discover our most popular sustainable products
              </p>
            </div>
            
            <Link href="/shop">
              <Button variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
          
          <ProductGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-forest-600">
              Why Choose EcoSage?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to making sustainable shopping easy, intelligent, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-forest-100 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-forest-600" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Recommendations</h3>
              <p className="text-muted-foreground">
                Our intelligent assistant understands your needs and suggests the perfect eco-friendly products.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-sage-100 rounded-2xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold">Curated for Sustainability</h3>
              <p className="text-muted-foreground">
                Every product is carefully vetted for environmental impact and sustainability credentials.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-sandy-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-sandy-600" />
              </div>
              <h3 className="text-xl font-semibold">Track Your Impact</h3>
              <p className="text-muted-foreground">
                See how your purchases contribute to a more sustainable future with our impact dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
