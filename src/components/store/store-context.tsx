"use client";

import { createContext, useContext } from "react";

export type CartOptions = { size?: string; colour?: string };
export type CartLine = CartOptions & {
  id: string;
  slug: string;
  quantity: number;
};
export type StoreContextValue = {
  cart: CartLine[];
  count: number;
  wishlist: string[];
  wishlistCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickView: string | null;
  setQuickView: (slug: string | null) => void;
  add: (slug: string, quantity?: number, options?: CartOptions) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  compare: string[];
  compareLimit: number;
  compareNotice: string | null;
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  dismissCompareNotice: () => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
