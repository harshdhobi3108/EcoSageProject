// /app/api/product/[id]/route.ts
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
