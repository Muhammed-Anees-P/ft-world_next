import { create } from "zustand";

export interface Banner {
  _id: string;
  imageUrl: string;
  isActive?: boolean;
}

interface BannerStore {
  banners: Banner[];
  setBanners: (banners: Banner[]) => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
  banners: [],
  setBanners: (banners) => set({ banners }),
}));