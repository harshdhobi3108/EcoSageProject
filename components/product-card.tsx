"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf } from "lucide-react";
import { Product } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Format price to Indian Rupees with commas and ₹ symbol
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(product.price);

  const handleAddToCart = () => {
    console.log("Adding product to cart:", product.name);
    addToCart(product.id, product.name, product.price, product.image);

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent("cart-updated"));

    toast.success(`${product.name} added to cart!`, {
      description: `${formattedPrice} - 1 item`,
    });
  };

  const renderEcoScore = (score: number) => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Leaf
          key={i}
          className={`h-3 w-3 ${
            i <= score / 2 ? "fill-forest-500 text-forest-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="product-card group">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="eco-badge">
              <Leaf className="h-3 w-3 mr-1" />
              {product.ecoScore}/10
            </Badge>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 cursor-pointer hover:text-forest-600 transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center space-x-1">
            {renderEcoScore(product.ecoScore)}
            <span className="text-xs text-muted-foreground ml-1">
              Eco Score
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <p className="text-lg font-bold text-forest-600">{formattedPrice}</p>
              <p className="text-xs text-muted-foreground">by {product.brand}</p>
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-forest-500 hover:bg-forest-600 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button> 
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
