import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  setAccessToken: (token) => {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");

    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));
