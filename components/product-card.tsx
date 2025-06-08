"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(product.price);

  const handleAddToCart = () => {
    addToCart(product.id, product.name, product.price, product.image);
    window.dispatchEvent(new CustomEvent("cart-updated"));

    toast.success(`${product.name} added to cart!`, {
      description: `${formattedPrice} - 1 item`,
    });
  };

  const ecoScore = product.ecoScore ?? 0;

  const renderEcoScore = (score: number) => {
    return [...Array(5)].map((_, i) => (
      <Leaf
        key={i}
        className={`h-3 w-3 ${
          i < Math.round(score / 2)
            ? "fill-forest-500 text-forest-500"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const brandName = product.brand ?? "Unknown";

  return (
    <Card className="group relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow border rounded-2xl">
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer">
          <img
            src={product.image}
            alt={`Image of ${product.name}`}
            className="product-image"
          />

          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="text-xs">
              <Leaf className="h-3 w-3 mr-1" />
              {product.ecoScore !== undefined ? `${product.ecoScore}/10` : "N/A"}
            </Badge>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 hover:text-forest-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          {renderEcoScore(ecoScore)}
          <span className="text-xs text-muted-foreground ml-1">Eco Score</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-lg font-bold text-forest-600">{formattedPrice}</p>
            <p className="text-xs text-muted-foreground">by {brandName}</p>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-forest-500 hover:bg-forest-600 text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
