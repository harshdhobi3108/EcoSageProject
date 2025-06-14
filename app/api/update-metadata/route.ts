// 📁 app/api/update-metadata/route.ts

import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location, coords, userId } = body;

    // ✅ Validate inputs
    if (
      !userId ||
      typeof location !== "string" ||
      !Array.isArray(coords) ||
      coords.length !== 2 ||
      typeof coords[0] !== "number" ||
      typeof coords[1] !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid userId, location, or coords" },
        { status: 400 }
      );
    }

    console.log("✅ Saving to Clerk publicMetadata:", { userId, location, coords });

    // ✅ Save location and coords to Clerk
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        location,
        coords,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Metadata update failed:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
