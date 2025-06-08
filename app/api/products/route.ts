import { connectToDatabase } from "@/lib/db"; // ✅ must match file path
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase(); // ✅ Should not show red if path is correct

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
