import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "EcoSage - AI-Powered Sustainable E-Commerce",
  description: "Discover eco-friendly products with AI-powered recommendations. Shop sustainable, live responsibly.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "EcoSage - AI-Powered Sustainable E-Commerce",
    description: "Discover eco-friendly products with AI-powered recommendations. Shop sustainable, live responsibly.",
    url: "http://localhost:3000/",
    siteName: "EcoSage",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "EcoSage Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en" className={inter.variable}>
          <body
            className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
          >
            <div className="flex flex-col min-h-screen">
              {/* Optional Auth Header (can remove if unused) */}
              <header className="flex justify-end items-center gap-4 border-b px-4 py-2 text-sm text-muted-foreground">
                {/* Add auth-related buttons/links here if needed */}
              </header>

              {/* App Main Header */}
              <Header />

              {/* Main Page Content */}
              <main className="flex-1">{children}</main>
            </div>

            {/* Toast Notifications */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                },
              }}
            />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
