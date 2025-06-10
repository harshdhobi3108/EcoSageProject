import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all products from MongoDB
    const products = await Product.find();

    // Convert each product’s _id to id for frontend compatibility
    const formattedProducts = products.map((product) => ({
      id: product._id.toString(), // Important for routing and display
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

    // Return the formatted product list
    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
