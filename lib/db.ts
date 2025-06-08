import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    const mongoURI = process.env.MONGODB_URI!;
    if (!mongoURI) throw new Error("MONGODB_URI is missing in environment variables");

    await mongoose.connect(mongoURI, {
      dbName: "test", // Optional
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
