import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Get search query from URL
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    // Fetch and filter products
    const products = await Product.find();

    // Filter only matching products by name, description, brand, or tags
    const filteredProducts = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const desc = product.description?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const tags = (product.tags || []).map((t) => t.toLowerCase()).join(" ");

      return (
        name.includes(q) ||
        desc.includes(q) ||
        brand.includes(q) ||
        tags.includes(q)
      );
    });

    // Convert for frontend
    const formattedProducts = filteredProducts.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      ecoScore: product.ecoScore ?? 0,
      image: product.image,
      inStock: product.inStock,
      brand: product.brand ?? "Unknown",
      tags: product.tags ?? [],
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
