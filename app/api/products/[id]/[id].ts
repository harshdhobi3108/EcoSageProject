// /pages/api/products/[id].ts

import { NextApiRequest, NextApiResponse } from "next";

const products = [
  {
    id: "1",
    brand: "EcoBrand",
    ecoScore: 8,
    name: "Reusable Bottle",
    price: 499,
    description: "Eco-friendly reusable water bottle.",
    tags: ["bottle", "eco", "reusable"],
    inStock: true,
  },
  // Add more products as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = products.find((p) => p.id === id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}
