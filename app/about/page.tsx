"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf, 
  Heart, 
  Users, 
  Target, 
  Award, 
  Globe,
  Recycle,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export default function AboutPage() {
  console.log("About page rendered");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-forest-50 via-sage-50 to-sandy-50">
        <div className="absolute inset-0 bg-organic-pattern opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="eco-badge mb-6">
            <Leaf className="h-4 w-4 mr-2" />
            Our Mission
          </Badge>
          <h1 className="text-5xl font-bold text-forest-600 mb-6">
            Sustainable Shopping,
            <span className="gradient-mesh bg-clip-text text-transparent block">
              Smarter Choices
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            EcoSage combines artificial intelligence with sustainable commerce to help you make environmentally conscious decisions. 
            Every product in our marketplace is carefully curated for its positive environmental impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-forest-500 hover:bg-forest-600">
              Explore Products
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-forest-600" />
              </div>
              <div className="text-3xl font-bold text-forest-600 mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-sage-600" />
              </div>
              <div className="text-3xl font-bold text-forest-600 mb-2">1M+</div>
              <div className="text-muted-foreground">Plastic Items Avoided</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sandy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-sandy-600" />
              </div>
              <div className="text-3xl font-bold text-forest-600 mb-2">25</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-forest-600" />
              </div>
              <div className="text-3xl font-bold text-forest-600 mb-2">4.9★</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-sage-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-600 mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to sustainability, innovation, and making eco-friendly choices accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-forest-600">Sustainability First</h3>
                <p className="text-muted-foreground">
                  We prioritize environmental impact in every decision, from product selection to packaging and shipping methods.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-forest-600">AI-Powered Intelligence</h3>
                <p className="text-muted-foreground">
                  Our AI assistant learns your preferences to recommend the most suitable sustainable alternatives for your lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sandy-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8 text-sandy-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-forest-600">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every product undergoes rigorous vetting for sustainability credentials, quality, and ethical manufacturing practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-forest-600">Our Story</h2>
              <p className="text-muted-foreground">
                EcoSage was born from a simple idea: what if finding sustainable products was as easy as asking a friend for advice? 
                Our founders, environmental scientists and tech innovators, combined their expertise to create an AI-powered platform 
                that makes sustainable living accessible to everyone.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to serve thousands of eco-conscious consumers worldwide, helping them make informed choices 
                that benefit both their lives and our planet. Every purchase through EcoSage contributes to a more sustainable future.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-forest-500 flex items-center justify-center text-white text-sm font-medium">S</div>
                  <div className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center text-white text-sm font-medium">A</div>
                  <div className="w-10 h-10 rounded-full bg-sandy-500 flex items-center justify-center text-white text-sm font-medium">M</div>
                </div>
                <div>
                  <div className="font-medium text-forest-600">Founded by environmental experts</div>
                  <div className="text-sm text-muted-foreground">Sarah, Alex & Morgan</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-forest-100 to-sage-100 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Users className="h-6 w-6 text-forest-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-forest-600">Community Driven</div>
                      <div className="text-sm text-muted-foreground">Building a community of conscious consumers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Heart className="h-6 w-6 text-sage-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-forest-600">Impact Focused</div>
                      <div className="text-sm text-muted-foreground">Every product contributes to positive change</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Globe className="h-6 w-6 text-sandy-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-forest-600">Global Reach</div>
                      <div className="text-sm text-muted-foreground">Making sustainability accessible worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-forest-500 to-sage-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Sustainable Revolution</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Be part of a community that's making a real difference. Start your sustainable journey with EcoSage today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-forest-600">
              Try AI Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}