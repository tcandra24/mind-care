import { update, changePassword } from "@/lib/actions/profile.action";
import { create } from "zustand";

import { useAuthStore } from "@/store/auth";

interface SettingState {
  loading: boolean;
  error: string | null;
  saveProfile: (payload: { name: string }) => Promise<void>;
  changePassword: (payload: { oldPassword: string; newPassword: string }) => Promise<void>;
}

export const useSettingStore = create<SettingState>((set) => ({
  loading: false,
  error: null,
  saveProfile: async ({ name }) => {
    set({ loading: true, error: null });
    try {
      const response = await update({ name });

      if (response) {
        useAuthStore.getState().setUser({
          id: response?.$id ?? "",
          email: response?.email ?? "",
          name: response?.name ?? "",
          phone: response?.phone ?? "",
        });
      }

      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  changePassword: async ({ oldPassword, newPassword }) => {
    set({ loading: true, error: null });
    try {
      const response = await changePassword({ oldPassword, newPassword });

      console.log(response);

      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));
