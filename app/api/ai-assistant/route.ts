import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const cleanedMessage = message?.trim().toLowerCase();

    // Handle greetings with no product suggestions
    const greetingMessages = ["hi", "hello", "hey", "good morning", "good evening"];
    if (greetingMessages.includes(cleanedMessage)) {
      return NextResponse.json({
        content: "Hello! How can I assist you with sustainable products today?",
        products: [],
        suggestions: ["I need an eco-friendly lunchbox", "Show me reusable straws"],
        confidence: 1.0,
      });
    }

    // Handle vague messages like "suggest me some product"
    const vagueMessages = [
      "suggest me some product",
      "suggest something",
      "recommend a product",
      "give me something",
      "show me products",
    ];
    if (vagueMessages.some((phrase) => cleanedMessage.includes(phrase))) {
      return NextResponse.json({
        content: "Sure! Could you tell me a bit more — like who it's for or what kind of product you're interested in?",
        products: [],
        suggestions: [
          "I need a gift for a friend who likes gardening",
          "Show me a reusable item for daily office use",
        ],
        confidence: 0.9,
      });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_GENAI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

// Remove Markdown-style JSON code block markers if any
let cleanedText = rawText.trim();
if (cleanedText.startsWith("```")) {
  cleanedText = cleanedText.replace(/^```(json)?\n?/, "");
  cleanedText = cleanedText.replace(/```$/, "");
}

// Clean up markdown formatting like *, **, and bullets
cleanedText = cleanedText
  .replace(/\*\*(.*?)\*\*/g, "$1") // Remove **bold**
  .replace(/^\s*[-*]\s+/gm, "")    // Remove bullets at start of lines
  .replace(/\*/g, "")              // Remove remaining asterisks
  .replace(/\n{2,}/g, "\n\n");     // Prevent excessive newlines


    try {
  const parsed = JSON.parse(cleanedText);

  // If already structured (e.g., from fine-tuned model), just return it
  return NextResponse.json({
    content: parsed.content || "",
    products: parsed.products || [],
    suggestions: parsed.suggestions || [],
    confidence: parsed.confidence ?? 0.95,
  });
} catch {
  // Manually parse response into intro + bullet points
  const introMatch = cleanedText.split(/\n\s*\n/)[0]; // Take the paragraph before the first line break
  const bulletMatches = [...cleanedText.matchAll(/^[*-]\s+(.*)/gm)].map((m) => m[1]);

  return NextResponse.json({
    content: introMatch || cleanedText, // Main explanation
    suggestions: bulletMatches,         // Bullet points as plain text
    products: [],
    confidence: 0.5,
  });
}


  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({
      content: "An error occurred while processing your request.",
      products: [],
      suggestions: [],
      confidence: 0.0,
    });
  }
}
