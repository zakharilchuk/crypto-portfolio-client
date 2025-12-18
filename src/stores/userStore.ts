import { create } from 'zustand';

export interface User {
  userId: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
