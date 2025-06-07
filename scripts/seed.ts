import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../lib/db";
import Product from "../models/Product";

async function seed() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Eco Bag",
        description: "Reusable and sustainable bag.",
        price: 199,
        category: "Bags",
        inStock: true,
        image: "/images/ecobag.jpg",
      },
      // more products here...
    ]);

    console.log("✅ Seed completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
