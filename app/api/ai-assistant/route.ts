import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

const greetings = ["hi", "hello", "hey"];
const farewells = ["bye", "goodbye", "see you"];
const gratitudePhrases = ["thank you", "thanks", "thank u", "thx", "appreciate", "grateful", "cheers"];

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message: string };
    if (!message || message.trim() === "") {
      return NextResponse.json({
        content: "Please enter a message.",
        products: [],
        suggestions: [],
        confidence: 0,
      });
    }

    const msgLower = message.trim().toLowerCase();

    if (gratitudePhrases.some((phrase) => msgLower.includes(phrase))) {
      return NextResponse.json({
        content: "You’re very welcome! 😊 If you need help finding more eco-friendly products, just ask.",
        products: [],
        suggestions: ["Show me reusable bottles", "Recommend sustainable bags"],
        confidence: 1.0,
      });
    }

    if (greetings.includes(msgLower)) {
      return NextResponse.json({
        content: "Hello! How can I help you find eco-friendly products today?",
        products: [],
        suggestions: ["Show me reusable bottles", "Recommend sustainable bags"],
        confidence: 1.0,
      });
    }

    if (farewells.includes(msgLower)) {
      return NextResponse.json({
        content: "Goodbye! Feel free to ask anytime about eco-friendly products.",
        products: [],
        suggestions: [],
        confidence: 1.0,
      });
    }

    await connectToDatabase();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const classificationPrompt = `
You are a smart assistant. Classify the user's intent into one of two categories:
- If the user asks for product recommendations or shopping, respond with "PRODUCT".
- If the user asks for information, explanation, or help, respond with "INFO".

User message: "${message}"
    `;

    const classificationResult = await model.generateContent(classificationPrompt);
    const classification = classificationResult.response.text().trim();

    if (classification === "INFO") {
      const infoResponse = await model.generateContent(message);
      return NextResponse.json({
        content: infoResponse.response.text().trim(),
        products: [],
        suggestions: [],
        confidence: 1.0,
      });
    }

    const trivialWords = ["want", "need", "show", "find", "give", "eco"];
    let extractedKeywords = msgLower
      .split(/\s+/)
      .filter((word) => word.length > 2 && !trivialWords.includes(word));

    const hasEcoKeyword = msgLower.includes("eco");

    let searchQuery: any = {
      $text: { $search: extractedKeywords.join(" ") || msgLower },
    };

    if (hasEcoKeyword) {
      searchQuery = {
        $and: [
          searchQuery,
          {
            $or: [
              { ecoScore: { $gte: 7 } },
              { tags: { $in: ["eco", "eco-friendly", "sustainable"] } },
              { category: { $regex: /eco/i } },
            ],
          },
        ],
      };
    }

    let matchedProducts = await Product.find(searchQuery, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    if (matchedProducts.length === 0) {
      const regexTerms = extractedKeywords.map((k) => new RegExp(k, "i"));

      let fallbackQuery: any = {
        $or: [
          { name: { $in: regexTerms } },
          { description: { $in: regexTerms } },
          { tags: { $in: regexTerms } },
          { category: { $in: regexTerms } },
        ],
      };

      if (hasEcoKeyword) {
        fallbackQuery = {
          $and: [
            fallbackQuery,
            {
              $or: [
                { ecoScore: { $gte: 7 } },
                { tags: { $in: ["eco", "eco-friendly", "sustainable"] } },
                { category: { $regex: /eco/i } },
              ],
            },
          ],
        };
      }

      matchedProducts = await Product.find(fallbackQuery).limit(10);
    }

    if (matchedProducts.length === 0) {
      return NextResponse.json({
        content: `Oops! 🌿 We couldn’t find any eco-friendly products for "${message}". But don’t worry — our catalog is growing every day! 💚`,
        products: [],
        suggestions: [
          "Try 'eco bag', 'reusable bottle', or 'bamboo toothbrush'.",
          "Explore our categories: reusable bags, eco bottles, organic soaps.",
        ],
        confidence: 0.5,
      });
    }

    // ✅ Fix: Add `id` explicitly and avoid sending `_id`
    const safeProducts = matchedProducts.map((p) => ({
  id: p._id.toString(),
  name: p.name,
  description: p.description,
  image: p.image,
  price: p.price,
  category: p.category,
  ecoScore: p.ecoScore,
  tags: p.tags,
  brand: p.brand || "",
  inStock: p.inStock ?? true,
}));


    return NextResponse.json({
      content: "Here are some eco-friendly products based on your query:",
      products: safeProducts,
      suggestions: [],
      confidence: 0.95,
    });
  } catch (error: any) {
    console.error("❌ Full Error:", error);
    return NextResponse.json(
      {
        content: "Something went wrong while processing your request.",
        products: [],
        suggestions: [],
        confidence: 0.0,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
