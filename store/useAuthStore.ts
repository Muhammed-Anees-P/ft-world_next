import { create } from "zustand";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (token) => {
    localStorage.setItem("access_token", token);

    set({
      accessToken: token,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");

    set({
      accessToken: null,
    });
  },
}));
