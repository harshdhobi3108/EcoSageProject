"use client";

import React from "react";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* SignedOut: Show sign-in screen centered */}
      <SignedOut>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignIn redirectUrl="/profile" />
        </div>
      </SignedOut>

      {/* SignedIn: Show Clerk user icon in top-left */}
      <SignedIn>
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
          }}
        >
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "200px",
                  height: "200px",
                  borderRadius: "24px",
                  border: "6px solid #5a189a", // Your theme color
                },
              },
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
}
