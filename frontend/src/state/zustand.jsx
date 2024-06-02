import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDashboard = create((set, get) => ({
  dashboard: false,
  setDashboard: () => {
    const db = get().dashboard;
    if (db) {
      set({ dashboard: false });
    } else {
      set({ dashboard: true });
    }
  },
}));
export const useToken = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      logout: () => set({ token: "" }),
    }),
    { name: "token" }
  )
);
