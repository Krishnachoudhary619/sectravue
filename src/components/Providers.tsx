"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
