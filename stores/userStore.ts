import { create } from "zustand";

export interface IUser {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface IUserState {
  user: IUser | null;
  clearUser: () => void;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clearUser: () => set({ user: null }),
}));
