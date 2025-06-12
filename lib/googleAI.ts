// lib/googleAI.ts
export async function callGoogleAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    console.error("Missing Google GenAI API key.");
    return null;
  }

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: {
          text: prompt,
        },
        temperature: 0.7,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.95,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API error:", data);
      return null;
    }

    return data?.candidates?.[0]?.output || null;

  } catch (error) {
    console.error("Google AI fetch error:", error);
    return null;
  }
}
