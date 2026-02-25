import { create } from "zustand";

interface BannerUIState {
  isOpen: boolean;
  editingId: string | null;
  openModal: (id?: string | null) => void;
  closeModal: () => void;
}

export const useBannerUIStore = create<BannerUIState>((set) => ({
  isOpen: false,
  editingId: null,

  openModal: (id = null) =>
    set({
      isOpen: true,
      editingId: id,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      editingId: null,
    }),
}));
