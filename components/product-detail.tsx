"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

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

export default function ProductDetailPage() {
  const params = useSearchParams();
  const productId = params.get("id"); // Assuming you pass id as query param or get from route
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    // TODO: Replace with your actual product fetching logic
    // For testing, you can mock data here
    const fetchProduct = async () => {
      setLoading(true);

      // Example mock data, replace with fetch call or data source
      const mockProduct: Product = {
        id: productId,
        name: "Test Product",
        description: "This is a test product description",
        price: 1999,
        category: "fruits",
        ecoScore: 8,
        image: "/test-product.jpg",
        inStock: true,
        brand: "Test Brand",
        tags: ["fresh", "organic"],
      };

      setProduct(mockProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id, product.name, product.price, product.image);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-green-700 mb-2">
            ₹{(product.price / 100).toFixed(2)}
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Brand: {product.brand ?? "Unknown"}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded text-white ${
              product.inStock ? "bg-green-700 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="inline-block mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
