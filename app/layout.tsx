import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider} from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "EcoSage - AI-Powered Sustainable E-Commerce",
  description: "Discover eco-friendly products with AI-powered recommendations. Shop sustainable, live responsibly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased min-h-screen bg-background`}>
          
          {/* Authentication Header */}
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b">
          
          </header>

          {/* Main App Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Toaster Notifications */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
