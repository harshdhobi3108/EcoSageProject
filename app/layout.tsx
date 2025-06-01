import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen bg-background`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
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
  );
}