import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginUser, registerUser, getUser, logoutUser } from "@/lib/actions/auth.action";

interface User {
  email: string;
  name: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: User;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: { email: string; name: string; phone: string; password: string }) => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      loading: false,
      error: null,
      user: {
        email: "",
        name: "",
        phone: "",
      },
      login: async (payload) => {
        set({ loading: true, error: null });

        try {
          const response = await loginUser({
            email: payload.email,
            password: payload.password,
          });

          if (response) {
            const session = await getUser();

            set({
              user: {
                email: session?.email ?? "",
                name: session?.name ?? "",
                phone: session?.phone ?? "",
              },
              loading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },
      logout: async () => {
        try {
          await logoutUser();

          set({
            user: {
              email: "",
              name: "",
              phone: "",
            },
          });
        } catch (error: any) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },
      register: async (payload) => {
        set({ loading: true, error: null });

        try {
          await registerUser({
            email: payload.email,
            name: payload.name,
            phone: payload.phone,
            password: payload.password,
          });

          set({
            loading: false,
          });
        } catch (error: any) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },
    }),
    {
      name: "mind_map_auth_session",
    }
  )
);
