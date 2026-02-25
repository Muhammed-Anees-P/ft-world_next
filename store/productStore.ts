import { create } from "zustand";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
  images: string[];
  isActive: boolean;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
