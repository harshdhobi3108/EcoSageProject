// 📁 app/api/reverse-geocode/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const geoapifyApiKey = process.env.GEOAPIFY_API_KEY;
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${geoapifyApiKey}`
    );

    if (!res.ok) {
      throw new Error(`Geoapify request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("🌍 Geoapify Reverse Geocode Response:", data);

    const feature = data.features?.[0];
    const address = feature?.properties;

    if (!address) {
      return NextResponse.json({ location: "Unknown" });
    }

    // 🎯 Improved fallback chain for location name
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.suburb ||
      address.state_district ||
      address.state ||
      "Unknown";

    const country = address.country || "Unknown";

    // ✨ Remove false unknowns (e.g., if city = country)
    const cleanedCity = city !== "Unknown" ? city : "";
    const cleanedCountry = country !== "Unknown" ? country : "";

    const location = [cleanedCity, cleanedCountry].filter(Boolean).join(", ") || "Unknown";

    return NextResponse.json({ location });
  } catch (err: any) {
    console.error("❌ Reverse geocoding failed:", err.message || err);
    return NextResponse.json(
      { error: "Reverse geocoding failed" },
      { status: 500 }
    );
  }
}
