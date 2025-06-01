"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Truck,
  Leaf,
  Gift
} from "lucide-react";
import { getCart, updateQuantity, removeFromCart, clearCart, CartItem } from "@/lib/cart";
import { toast } from "sonner";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  console.log("Cart page rendered with", cart.items.length, "items");

  useEffect(() => {
    const updateCart = () => {
      const updatedCart = getCart();
      setCart(updatedCart);
      console.log("Cart updated:", updatedCart);
    };

    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const updatedCart = updateQuantity(productId, newQuantity);
    setCart(updatedCart);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    
    if (newQuantity === 0) {
      toast.success("Item removed from cart");
    } else {
      toast.success("Quantity updated");
    }
  };

  const handleRemoveItem = (productId: string, itemName: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    toast.success(`${itemName} removed from cart`);
  };

  const handleApplyPromo = () => {
    const validCodes = {
      "ECO10": 0.1,
      "SAVE15": 0.15,
      "GREEN20": 0.2
    };

    const discountAmount = validCodes[promoCode as keyof typeof validCodes];
    if (discountAmount) {
      setDiscount(discountAmount);
      toast.success(`Promo code applied! ${(discountAmount * 100).toFixed(0)}% discount`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    // Simulate checkout process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful checkout
      clearCart();
      setCart({ items: [], total: 0, itemCount: 0 });
      window.dispatchEvent(new CustomEvent("cart-updated"));
      
      toast.success("Order placed successfully! 🎉", {
        description: "You'll receive a confirmation email shortly."
      });
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * discount;
  const finalTotal = subtotal + shipping - discountAmount;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-forest-600">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any sustainable products yet. Start shopping to make a positive impact!
            </p>
            <div className="space-y-3">
              <Button size="lg" className="w-full bg-forest-500 hover:bg-forest-600">
                Start Shopping
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Try AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-forest-50 to-sage-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-8 w-8 text-forest-600" />
            <div>
              <h1 className="text-3xl font-bold text-forest-600">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cart.itemCount} item{cart.itemCount !== 1 ? "s" : ""} in your cart
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: CartItem) => (
              <Card key={item.productId} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-2xl font-bold text-forest-600 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveItem(item.productId, item.name)}
                        className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-sandy-600" />
                  <span className="font-medium">Have a promo code?</span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Input
                    placeholder="Enter code (try ECO10, SAVE15, GREEN20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>Shipping</span>
                  </span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <div className="bg-forest-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-forest-700">
                    <Leaf className="h-4 w-4" />
                    <span>🌱 Your order saves plastic and supports sustainability!</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-forest-500 hover:bg-forest-600"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Secure Checkout
                    </>
                  )}
                </Button>

                <div className="text-xs text-center text-muted-foreground">
                  Secure SSL encryption • 30-day returns • Eco-friendly packaging
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}