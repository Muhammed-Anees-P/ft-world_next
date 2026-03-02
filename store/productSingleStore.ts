import { IProduct } from "@/types/IProducts;";
import { create } from "zustand";

interface ProductSingleState {
  product: IProduct | null;
  setProduct: (product: IProduct) => void;
  clearProduct: () => void;
}

export const useProductSingleStore = create<ProductSingleState>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
  clearProduct: () => set({ product: null }),
}));
