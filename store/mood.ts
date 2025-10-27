import { create } from "zustand";

interface Mood {
  id: string;
  mood: string;
  note: string;
  tip: string;
}

interface MoodState {
  loading: boolean;
  moods: Mood[];
  getData: (userId: string) => Promise<void>;
  store: (payload: { mood: string; note: string; user_id: string }) => Promise<void>;
}

export const useMoodStore = create<MoodState>((set) => ({
  loading: false,
  moods: [],
  getData: async (userId) => {
    try {
      const response = await fetch("/api/tip", {
        method: "GET",
        body: JSON.stringify({
          user_id: userId,
        }),
      });
      const data = await response.json();

      return data;
    } catch (error: any) {
      return error.message;
    }
  },
  store: async ({ mood, note, user_id }) => {
    try {
      const response = await fetch("/api/tip", {
        method: "POST",
        body: JSON.stringify({
          mood,
          note,
          user_id,
        }),
      });
      const data = await response.json();

      return data;
    } catch (error: any) {
      return error.message;
    }
  },
}));
