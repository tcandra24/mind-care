import { create } from "zustand";

interface Memo {
  $id: string;
  mood: string;
  note: string;
  tip_ai: string;
  source: string;
  user_id: string;
  $createdAt: string;
}

interface MemoState {
  loading: boolean;
  error: string | null;
  memos: Memo[];
  getData: (userId: string) => Promise<void>;
  store: (payload: { mood: string; note: string; user_id: string }) => Promise<void>;
}

export const useMemoStore = create<MemoState>((set) => ({
  loading: false,
  error: null,
  memos: [],
  getData: async (userId) => {
    set({ loading: true, error: null, memos: [] });
    try {
      const response = await fetch(`/api/tip?user_id=${userId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error("Throw Error");
      }

      set({ loading: false, memos: data.response });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  store: async ({ mood, note, user_id }) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/tip", {
        method: "POST",
        body: JSON.stringify({
          mood,
          note,
          user_id,
        }),
      });

      await response.json();

      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));
