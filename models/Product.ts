
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    price: Number,
    category: String,
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
