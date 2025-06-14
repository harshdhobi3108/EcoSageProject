"use client";

import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";

// Dynamically loaded components
const DynamicMapWrapper = dynamic(() => import("@/components/MapWrapper"), {
  ssr: false,
});
const GreenCalendar = dynamic(() => import("@/components/EcoCalendar"), {
  ssr: false,
});

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // 🎉 Step 1: Define eco events
  const ecoEvents = [
    {
      title: "🌱 World Environment Day",
      date: "2025-06-05",
    },
    {
      title: "🌍 Earth Day",
      date: "2025-04-22",
    },
    {
      title: "♻️ International Recycling Day",
      date: "2025-05-17",
    },
  ];

  // 📧 Step 2: Trigger email if today matches any eco event
  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  const matchedDay = ecoEvents.find((e) => e.date === today);

  const sendEmail = async () => {
    try {
      const alreadySent = localStorage.getItem("ecoEmailSent");
      if (alreadySent === today) return;

      const res = await fetch("/api/send-eco-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
          ecoDay: matchedDay,
        }),
      });

      const result = await res.json();
      console.log("📧 Email sent status:", result);

      if (result.success) {
        localStorage.setItem("ecoEmailSent", today); // 🟢 Prevent resending
      }
    } catch (error) {
      console.error("❌ Email send failed:", error);
    }
  };

  if (user && matchedDay) {
    sendEmail();
  }
}, [user]);


  // 📍 Step 3: Detect user location & save metadata
  useEffect(() => {
    if (typeof window !== "undefined" && user && isLoaded) {
      const savedLocation = user.publicMetadata?.location;

      if (!savedLocation || savedLocation === "Unknown") {
        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setCoords([latitude, longitude]);

            try {
              const response = await fetch(
                `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();

              const fullLocation =
                typeof data.location === "string" && data.location.trim() !== ""
                  ? data.location
                  : "Unknown";

              setLocation(fullLocation);

              await fetch("/api/update-metadata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  location: fullLocation,
                  coords: [latitude, longitude],
                  userId: user.id,
                }),
              });
            } catch (err) {
              console.error("❌ Reverse geocoding failed:", err);
              setLocation("Unable to determine");
            }

            setLoadingLocation(false);
          },
          (error) => {
            console.error("❌ Geolocation error:", error);
            setLocation("Permission denied or unavailable");
            setCoords(null);
            setLoadingLocation(false);
          }
        );
      } else {
        setLocation(savedLocation as string);

        if (user.publicMetadata.coords) {
          setCoords(user.publicMetadata.coords as [number, number]);
        }
      }
    }

    return () => {
      setLocation("");
      setCoords(null);
    };
  }, [user, isLoaded]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        padding: "2rem",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <SignedOut>
        <SignIn redirectUrl="/profile" />
      </SignedOut>

      <SignedIn>
        {user && (
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              borderRadius: "1.5rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              zIndex: 0,
              position: "relative",
            }}
          >
            {/* 📅 Top-right Calendar Icon */}
            <button
              onClick={() => setShowCalendar(true)}
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Open Eco Calendar"
            >
              <CalendarDays size={24} color="#5a189a" />
            </button>

            {/* 👤 Profile Info */}
            <div style={{ display: "flex", gap: "2rem" }}>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "160px",
                      height: "160px",
                      borderRadius: "1rem",
                      border: "5px solid #5a189a",
                    },
                  },
                }}
              />
              <div style={{ flex: 1, marginTop: "0.8rem" }}>
                <h1
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: "700",
                    color: "#240046",
                  }}
                >
                  {user.fullName || "EcoSage User"}
                </h1>
                <p style={{ fontSize: "1rem", color: "#555" }}>
                  📧 {user.emailAddresses[0]?.emailAddress}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#777",
                    marginTop: "0.5rem",
                  }}
                >
                  🗓️ Joined:{" "}
                  <strong>
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    marginTop: "0.5rem",
                  }}
                >
                  📍 Location:{" "}
                  <strong>
                    {loadingLocation ? "Detecting..." : location || "Unknown"}
                  </strong>
                </p>
                <p
                  style={{
                    color: "#777",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                  }}
                >
                  🧭 Coordinates:{" "}
                  {coords
                    ? `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`
                    : "Not available"}
                </p>
              </div>
            </div>

            {/* 🗺️ Map Section */}
            {coords && !loadingLocation && (
              <div style={{ position: "relative", zIndex: 10 }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  📌 Map:
                </h3>
                <DynamicMapWrapper
                  position={{ lat: coords[0], lng: coords[1] }}
                />
              </div>
            )}

            {/* 📅 Eco Calendar Modal */}
            {showCalendar && (
              <GreenCalendar onClose={() => setShowCalendar(false)} />
            )}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
