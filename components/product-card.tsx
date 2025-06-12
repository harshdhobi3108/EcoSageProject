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
  if (!product?.id) {
    return (
      <Card className="p-4 text-sm text-red-500 border border-red-300">
        Product ID missing. Please check your API response or data mapping.
      </Card>
    );
  }

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
  const brandName = product.brand ?? "Unknown";

  const renderEcoScore = (score: number) => {
    return [...Array(5)].map((_, i) => (
      <Leaf
        key={i}
        className={`h-4 w-4 ${
          i < Math.round(score / 2)
            ? "fill-green-600 text-green-600"
            : "text-gray-300"
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name || "Product Image"}
            className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
              !product.inStock ? "opacity-50" : ""
            }`}
          />
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              {product.ecoScore !== undefined ? `${product.ecoScore}/10` : "N/A"}
            </Badge>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
              <span className="text-white text-sm font-semibold bg-red-600 px-3 py-1 rounded-full shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="flex flex-col justify-between p-4 space-y-3 flex-grow">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-base font-semibold leading-tight line-clamp-2 hover:text-green-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center space-x-1">
          {renderEcoScore(ecoScore)}
          <span className="text-xs text-gray-500 ml-1">Eco Score</span>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-lg font-bold text-green-700">{formattedPrice}</p>
            <p className="text-xs text-muted-foreground">by {brandName}</p>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-green-700 hover:bg-green-800 text-white"
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
