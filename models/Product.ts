import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    inStock: Boolean,
    ecoScore: Number,
    brand: String,
    tags: [String],
  },
  {
    collection: "products", // 👈 use exact collection name
    versionKey: false,
  }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
