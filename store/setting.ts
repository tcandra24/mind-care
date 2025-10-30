import { create } from "zustand";
import { getUser } from "@/lib/actions/auth.action";

interface SettingState {
  loading: boolean;
  saveProfile: (payload: { name: string }) => Promise<void>;
  changePassword: (payload: { oldPassword: string; newPassword: string }) => Promise<void>;
}

export const useMemoStore = create<SettingState>((set) => ({
  loading: false,
  saveProfile: async ({ name }) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/profile/change-profile`, {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error("Throw Error");
      }

      // MAsuk Store

      set({ loading: false });
    } catch (error: any) {
      return error.message;
    }
  },

  changePassword: async (payload) => {
    set({ loading: true });
  },
}));
