import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  inStock: Boolean,
  ecoScore: Number,
  brand: String,
  tags: [String],
});

// ✅ Fixed typo: applied index to correct schema variable
productSchema.index({
  name: "text",
  description: "text",
  tags: "text",
  category: "text",
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
