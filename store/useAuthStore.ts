import { IUser } from "@/types/IUser";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  setAuth: (token: string, user: IUser) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (token, user) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      accessToken: token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    set({
      accessToken: null,
      user: null,
    });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        accessToken: token,
        user: JSON.parse(user),
      });
    }
  },
}));
