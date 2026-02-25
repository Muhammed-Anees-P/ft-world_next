import { create } from "zustand";

interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
