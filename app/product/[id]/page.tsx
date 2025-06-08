"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Share2, Award, Truck, Shield, Recycle } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand?: string;
  image: string;
  inStock: boolean;
  tags?: string[];
  ecoScore?: number;
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

function Spinner() {
  return (
    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setError("Invalid product link. Product ID is missing.");
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data: Product = await res.json();
        setProduct(data);
      } catch {
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const savedFavs = localStorage.getItem("favorites") || "[]";
    const favs: string[] = JSON.parse(savedFavs);
    setIsFavorite(favs.includes(productId));
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    const quantity = Number(selectedQuantity);
    addToCart(product.id, product.name, product.price, product.image, quantity);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    toast.success(`${product.name} added to cart!`, {
      description: `${currencyFormatter.format(product.price)} - ${quantity} item${quantity > 1 ? "s" : ""}`,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite((fav) => {
      const newFav = !fav;
      const savedFavs = localStorage.getItem("favorites") || "[]";
      let favs: string[] = JSON.parse(savedFavs);

      if (newFav) {
        favs.push(productId);
        toast.success("Added to favorites");
      } else {
        favs = favs.filter((id) => id !== productId);
        toast.success("Removed from favorites");
      }
      localStorage.setItem("favorites", JSON.stringify(favs));
      return newFav;
    });
  };

  const handleShare = async () => {
    if (!product) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
        toast.success("Product shared!");
      } catch {
        toast.error("Sharing cancelled or failed");
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  const renderEcoScore = (score: number = 0) => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Leaf
          key={i}
          className={`h-4 w-4 ${i <= score / 2 ? "fill-green-600 text-green-600" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!product) return <div className="text-center text-muted-foreground">Product not found.</div>;

  const canAddToCart = product.inStock && selectedQuantity > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4 relative">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name || "Product image"}
              className={`w-full h-96 object-cover rounded-2xl transition-opacity duration-300 ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImgLoading(false)}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
                setImgLoading(false);
              }}
            />
            {imgLoading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <Spinner />
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.brand && <Badge variant="outline" className="text-xs">{product.brand}</Badge>}
                {product.ecoScore !== undefined && (
                  <Badge className="bg-green-100 text-green-700 text-xs flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco Score: {product.ecoScore}/10
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center space-x-2 mb-4">
                {renderEcoScore(product.ecoScore)}
                <span className="text-sm text-muted-foreground ml-2">Sustainability Rating</span>
              </div>

              <p className="text-4xl font-bold">{currencyFormatter.format(product.price)}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity-select" className="sr-only">Quantity</label>
                <select
                  id="quantity-select"
                  value={String(selectedQuantity)}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="border px-3 py-1 rounded"
                  disabled={!product.inStock}
                  aria-label="Select quantity"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  aria-label="Add product to cart"
                >
                  <Leaf className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button variant="outline" onClick={handleToggleFavorite} aria-label="Toggle favorite">
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>

                <Button variant="outline" aria-label="Share product" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Why Choose This Product
                </h3>
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Free shipping on orders over ₹3,750</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">30-day satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Recycle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Made from sustainable materials</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
