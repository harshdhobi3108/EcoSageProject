"use client";

import { AIAssistant } from "@/components/ai-assistant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  MessageCircle, 
  Zap, 
  ShoppingBag,
  Search,
  Heart
} from "lucide-react";

export default function AIAssistantPage() {
  console.log("AI Assistant page rendered");

  const sampleQueries = [
    {
      icon: ShoppingBag,
      query: "I need eco-friendly products for my kitchen",
      description: "Get recommendations for sustainable kitchen essentials"
    },
    {
      icon: Search,
      query: "Show me reusable alternatives to plastic bags",
      description: "Find plastic-free bag options for shopping and storage"
    },
    {
      icon: Heart,
      query: "What's the most sustainable water bottle for hiking?",
      description: "Discover durable, eco-friendly drinkware for outdoor activities"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-forest-50 via-sage-50 to-sandy-50">
        <div className="absolute inset-0 bg-organic-pattern opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center space-y-6 mb-12">
            <Badge className="eco-badge">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Shopping
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-forest-600">
              Your Personal
              <span className="gradient-mesh bg-clip-text text-transparent block">
                Sustainability Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simply describe what you need, and our AI will recommend the perfect sustainable products. 
              No more endless browsing – just smart, personalized recommendations tailored to your eco-conscious lifestyle.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-forest-600" />
                </div>
                <h3 className="font-semibold mb-2 text-forest-600">Natural Conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Chat naturally about your needs and preferences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-sage-600" />
                </div>
                <h3 className="font-semibold mb-2 text-forest-600">Instant Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get curated product suggestions in seconds
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sandy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-sandy-600" />
                </div>
                <h3 className="font-semibold mb-2 text-forest-600">Personalized Results</h3>
                <p className="text-sm text-muted-foreground">
                  Recommendations match your lifestyle and values
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Interface */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <AIAssistant />
        </div>
      </section>

      {/* Sample Queries Section */}
      <section className="py-16 bg-sage-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-600 mb-4">
              Try These Sample Queries
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure where to start? Here are some example questions to help you discover amazing eco-friendly products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sampleQueries.map((sample, index) => {
              const IconComponent = sample.icon;
              return (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-forest-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest-600 mb-2">
                          "{sample.query}"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {sample.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Have a specific question? Just ask naturally and our AI will understand!
            </p>
            <Button variant="outline">
              Start Chatting with AI
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-600 mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant makes sustainable shopping simple and intuitive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-forest-600">Describe Your Needs</h3>
              <p className="text-muted-foreground">
                Tell our AI what you're looking for in natural language. Be as specific or general as you like.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-forest-600">Get Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your request and suggests the most suitable eco-friendly products from our curated collection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sandy-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-forest-600">Shop with Confidence</h3>
              <p className="text-muted-foreground">
                Review detailed product information, eco-scores, and add items directly to your cart for a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}