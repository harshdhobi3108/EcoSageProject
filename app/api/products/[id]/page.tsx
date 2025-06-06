import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { Types } from "mongoose"; // to validate ObjectId

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Check if id is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Product API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
