"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Leaf, 
  Award, 
  Truck,
  Shield,
  Recycle,
  Star,
  Check
} from "lucide-react";
import { getProductById, Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Leaf className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Button>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      addToCart(product.id, product.name, product.price, product.image);
    }

    window.dispatchEvent(new CustomEvent("cart-updated"));

    toast.success(`${product.name} added to cart!`, {
      description: `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)} - ${selectedQuantity} item${selectedQuantity > 1 ? "s" : ""}`,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const renderEcoScore = (score: number) => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Leaf
          key={i}
          className={`h-4 w-4 ${
            i <= score / 2 ? "fill-forest-500 text-forest-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
                <Badge className="eco-badge">
                  <Leaf className="h-3 w-3 mr-1" />
                  Eco Score: {product.ecoScore}/10
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-forest-600 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-4">
                {renderEcoScore(product.ecoScore)}
                <span className="text-sm text-muted-foreground ml-2">
                  Sustainability Rating
                </span>
              </div>

              <p className="text-4xl font-bold text-forest-600 mb-6">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                }).format(product.price)}
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <select
                  value={selectedQuantity}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedQuantity(Number(e.target.value))
                  }
                  className="border rounded-md px-3 py-2"
                  disabled={!product.inStock}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-forest-500 hover:bg-forest-600"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={isFavorite ? "bg-red-50 border-red-200" : ""}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>

                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-forest-500" />
                  Why Choose This Product
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-4 w-4 text-sage-500" />
                    <span className="text-sm">Free shipping on orders over ₹3,750</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-sandy-500" />
                    <span className="text-sm">30-day satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Recycle className="h-4 w-4 text-forest-500" />
                    <span className="text-sm">Made from sustainable materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-4 w-4 text-sage-500" />
                    <span className="text-sm">Carbon-neutral shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}