"use client";

import { useState, useEffect, useCallback } from "react";
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
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  CartItem
} from "@/lib/cart";
import { toast } from "sonner";
import Script from "next/script";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const validPromoCodes = {
    "ECO10": 0.1,
    "SAVE15": 0.15,
    "GREEN20": 0.2
  };

  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * discount;
  const finalTotal = subtotal + shipping - discountAmount;

  const updateCartState = useCallback(() => {
    const updated = getCart();
    setCart(updated);
  }, []);

  useEffect(() => {
    updateCartState();
    window.addEventListener("cart-updated", updateCartState);
    return () => window.removeEventListener("cart-updated", updateCartState);
  }, [updateCartState]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updated = updateQuantity(productId, quantity);
    setCart(updated);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    toast.success(quantity === 0 ? "Item removed from cart" : "Quantity updated");
  };

  const handleRemoveItem = (productId: string, name: string) => {
    const updated = removeFromCart(productId);
    setCart(updated);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    toast.success(`${name} removed from cart`);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error("Enter a promo code first");
      return;
    }
    const code = promoCode.toUpperCase();
    if (validPromoCodes[code]) {
      setDiscount(validPromoCodes[code]);
      toast.success(`Promo code applied! ${validPromoCodes[code] * 100}% discount`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    const amountInPaise = Math.round(finalTotal * 100); // Razorpay requires amount in paise

    const options = {
      key: "rzp_test_st3aUplBX27wu6", // Replace with your Razorpay Key ID
      amount: amountInPaise, 
      currency: "INR",
      name: "EcoSage",
      description: "Purchase from EcoSage",
      image: "/logo.png",
      handler: function (response: any) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
        // Optionally: send response to backend to store order
      },
      prefill: {
        name: "Harsh",
        email: "harsh@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "EcoSage HQ",
      },
      theme: {
        color: "#5a9a68",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {/* Razorpay Script Loader */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {cart.items.length === 0 ? (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-6 max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-forest-600">Your Cart is Empty</h1>
              <p className="text-muted-foreground">
                Looks like you haven't added any sustainable products yet.
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
      ) : (
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

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item: CartItem) => (
                <Card key={item.productId}>
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
                        <span className="w-8 text-center">{item.quantity}</span>
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
                          className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.productId, item.name)}
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
                      placeholder="ECO10, SAVE15, GREEN20"
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

            {/* Summary */}
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
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4" onClick={handleCheckout}>
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
