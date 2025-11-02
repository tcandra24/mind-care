import { create } from "zustand";

interface Graph {
  date: Date;
  happy: Number;
  sad: Number;
  neutral: Number;
  angry: Number;
  anxious: Number;
  excited: Number;
}

interface DashboardState {
  loading: boolean;
  error: string | null;
  graph: Graph[];
  getData: (userId: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  loading: false,
  error: null,
  graph: [],
  getData: async (userId) => {
    set({ loading: true, graph: [] });
    try {
      const response = await fetch(`/api/dashboard?user_id=${userId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error("Throw Error");
      }

      set({ loading: false, graph: data.response });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));
