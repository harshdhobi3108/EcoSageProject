"use client";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export function getCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0 };
  }
  
  try {
    const cartData = localStorage.getItem("ecosage-cart");
    if (cartData) {
      const cart = JSON.parse(cartData);
      console.log("Retrieved cart from localStorage:", cart);
      return cart;
    }
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
  }
  
  return { items: [], total: 0, itemCount: 0 };
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("ecosage-cart", JSON.stringify(cart));
    console.log("Saved cart to localStorage:", cart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

export function addToCart(productId: string, name: string, price: number, image: string): Cart {
  console.log("Adding to cart:", { productId, name, price });
  
  const cart = getCart();
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
    console.log("Updated existing item quantity:", existingItem);
  } else {
    cart.items.push({ productId, name, price, image, quantity: 1 });
    console.log("Added new item to cart");
  }
  
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string): Cart {
  console.log("Removing from cart:", productId);
  
  const cart = getCart();
  cart.items = cart.items.filter(item => item.productId !== productId);
  
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number): Cart {
  console.log("Updating quantity:", { productId, quantity });
  
  const cart = getCart();
  const item = cart.items.find(item => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    } else {
      item.quantity = quantity;
      cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      saveCart(cart);
    }
  }
  
  return cart;
}

export function clearCart(): Cart {
  console.log("Clearing cart");
  
  const emptyCart = { items: [], total: 0, itemCount: 0 };
  saveCart(emptyCart);
  return emptyCart;
}