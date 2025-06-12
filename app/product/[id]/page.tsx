"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center text-gray-600">Loading product...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between space-y-6">
        {/* Title and Brand Info */}
        <div className="mt-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {product.name}
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            <span className="font-bold">Brand:</span> {product.brand || "EcoSage"}
          </p>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm">
            <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium capitalize w-fit">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700 text-[15px] leading-relaxed tracking-wide">
            {product.description}
          </p>
        </div>

        {/* Price & Cart Section (unchanged) */}
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-semibold text-green-700">₹{product.price}</div>

          <div className="flex items-center gap-3">
            <label htmlFor="quantity" className="text-sm text-gray-600">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-green-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm rounded-lg shadow-md flex items-center gap-2 w-fit"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
