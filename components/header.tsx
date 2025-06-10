"use client";

import { ShoppingBag, Leaf, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { getCart } from "@/lib/cart";
import Link from "next/link";
import clsx from "clsx";

export function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartItemCount(cart.itemCount);
    };
    updateCartCount();
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoadingSearch(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search fetch error:", error);
        setSearchResults([]);
      } finally {
        setIsLoadingSearch(false);
      }
    };

    const delayDebounce = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/10 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          ></div>

          <div className="relative z-50 w-full max-w-2xl">
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-lg flex items-center">
              <Search className="ml-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full p-3 pl-10 bg-transparent outline-none text-black dark:text-white"
                placeholder="Search for eco products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearch(false);
                }}
                className="mr-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {searchQuery && (
              <div className="bg-white dark:bg-gray-900 border mt-2 rounded-lg shadow p-4 max-h-96 overflow-y-auto">
                {isLoadingSearch ? (
                  <p className="text-sm text-gray-500">Searching...</p>
                ) : searchResults.length > 0 ? (
                  <>
                    <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Results for "{searchQuery}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => {
                            setShowSearch(false);
                            setSearchQuery("");
                          }}
                          className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
                        >
                          <div className="flex items-center">
                            <img
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name}
                              className="w-24 h-24 object-cover"
                            />
                            <div className="p-3">
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                {product.name}
                              </h3>
                              {product.price && (
                                <p className="text-sm text-forest-600 font-medium mt-1">
                                  ₹{product.price}
                                </p>
                              )}
                              {product.description && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No results found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <header
        className={clsx(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          showSearch && "z-30"
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-500 text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-forest-600">EcoSage</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/shop">
              <Button variant="ghost" className="text-foreground hover:text-forest-600">
                Shop
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="ghost" className="text-foreground hover:text-forest-600">
                Categories
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-foreground hover:text-forest-600">
                About
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="ghost" className="text-foreground hover:text-forest-600">
                AI Assistant
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 bg-sandy-500 hover:bg-sandy-600"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="container py-4 space-y-2">
              {["/shop", "/categories", "/about", "/ai-assistant"].map((path) => (
                <Link key={path} href={path} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {path.replace("/", "").replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
