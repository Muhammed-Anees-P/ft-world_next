import { create } from "zustand";

interface CartItem {
  product: any;
  variantSku?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
}));
