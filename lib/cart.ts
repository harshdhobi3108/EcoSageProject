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
  totalQuantity: number;
}

export function getCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0, totalQuantity: 0 };
  }

  try {
    const cartData = localStorage.getItem("ecosage-cart");
    if (cartData) {
      const cart = JSON.parse(cartData);

      // ✅ Validate items structure
      if (!Array.isArray(cart.items)) throw new Error("Invalid cart data");

      const itemCount = cart.items.length;
      const totalQuantity = cart.items.reduce(
        (sum: number, item: CartItem) => sum + item.quantity,
        0
      );

      return {
        ...cart,
        itemCount,
        totalQuantity,
      };
    }
  } catch (error) {
    console.error("Error reading cart:", error);
  }

  return { items: [], total: 0, itemCount: 0, totalQuantity: 0 };
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;

  try {
    const validCart = {
      items: Array.isArray(cart.items) ? cart.items : [],
      total: cart.total || 0,
      itemCount: cart.itemCount || 0,
      totalQuantity: cart.totalQuantity || 0,
    };
    localStorage.setItem("ecosage-cart", JSON.stringify(validCart));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
}

export function addToCart(productId: string, name: string, price: number, image: string): Cart {
  const cart = getCart();
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, name, price, image, quantity: 1 });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.itemCount = cart.items.length;
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.productId !== productId);

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.itemCount = cart.items.length;
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number): Cart {
  const cart = getCart();
  const item = cart.items.find(i => i.productId === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    } else {
      item.quantity = quantity;
    }
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.itemCount = cart.items.length;
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  saveCart(cart);
  return cart;
}

export function clearCart(): Cart {
  const emptyCart = { items: [], total: 0, itemCount: 0, totalQuantity: 0 };
  saveCart(emptyCart);
  return emptyCart;
}
