"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { toast } from "sonner";

import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  CartItem
} from "@/lib/cart";

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
  Gift
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const validPromoCodes: { [code: string]: number } = {
    ECO10: 0.1,
    SAVE15: 0.15,
    GREEN20: 0.2
  };

  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * discount;
  const finalTotal = subtotal + shipping - discountAmount;

  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const rupeeFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  const updateCartState = useCallback(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    const onCartUpdated = () => setCart(getCart());
    setCart(getCart());
    window.addEventListener("cart-updated", onCartUpdated);
    return () => window.removeEventListener("cart-updated", onCartUpdated);
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
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      toast.error("Enter a promo code first");
      return;
    }

    if (validPromoCodes[code]) {
      setDiscount(validPromoCodes[code]);
      toast.success(`Promo code applied! ${validPromoCodes[code] * 100}% discount`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    if (totalQuantity === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const amountInPaise = Math.round(finalTotal * 100);

    const options = {
      key: "rzp_test_st3aUplBX27wu6",
      amount: amountInPaise,
      currency: "INR",
      name: "EcoSage",
      description: "Purchase from EcoSage",
      image: "/logo.png",
      handler: function (response: any) {
        toast.success("Payment successful! ID: " + response.razorpay_payment_id);
        clearCart();
        setCart(getCart());
        window.dispatchEvent(new CustomEvent("cart-updated"));
        // Remove redirect to thank-you page, stay on cart page
        // router.push("/thank-you");
      },
      prefill: {
        name: "Harsh",
        email: "harsh@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "EcoSage HQ"
      },
      theme: {
        color: "#5a9a68"
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {cart.items.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Add eco-friendly products to your cart and start saving the planet!
            </p>
            <Button onClick={() => router.push("/shop")} className="w-full bg-forest-500 hover:bg-forest-600">
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background">
          <section className="bg-gradient-to-r from-forest-50 to-sage-50 py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-8 w-8 text-forest-600" />
                <div>
                  <h1 className="text-3xl font-bold text-forest-600">Shopping Cart</h1>
                  <p className="text-muted-foreground">
                    {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} in your cart
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item: CartItem) => (
                <Card key={item.productId}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-forest-600 font-bold text-xl mt-1">
                          {rupeeFormatter.format(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => handleRemoveItem(item.productId, item.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Promo Code */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Have a promo code?</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="ECO10, SAVE15, GREEN20"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
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
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalQuantity} items)</span>
                    <span>{rupeeFormatter.format(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-{rupeeFormatter.format(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      Shipping
                    </span>
                    <span>{shipping === 0 ? "FREE" : rupeeFormatter.format(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{rupeeFormatter.format(finalTotal)}</span>
                  </div>
                  <Button className="w-full mt-2" onClick={handleCheckout}>
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
