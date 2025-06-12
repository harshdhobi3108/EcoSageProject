"use client";

import React, { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-grid";

interface Product {
  id: string; // must match backend's `id`
  name: string;
  description: string;
  price: number;
  category: string;
  ecoScore: number;
  image: string;
  inStock: boolean;
  brand: string;
  tags?: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API returned data is not an array", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">All Eco Products</h1>
      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
