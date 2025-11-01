import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginUser, registerUser, getUser, logoutUser } from "@/lib/actions/auth.action";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: User;
  setUser: (session: { id: string; email: string; name: string; phone: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: { email: string; name: string; phone: string; password: string }) => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      loading: false,
      error: null,
      user: {
        id: "",
        email: "",
        name: "",
        phone: "",
      },
      setUser: async ({ id, email, name, phone }) => {
        set({
          user: {
            id: id ?? "",
            email: email ?? "",
            name: name ?? "",
            phone: phone ?? "",
          },
        });
      },
      login: async (payload) => {
        set({ loading: true, error: null });

        try {
          const { setUser } = get();
          const response = await loginUser({
            email: payload.email,
            password: payload.password,
          });

          if (!response.success) {
            throw new Error(response.message);
          }

          const session = await getUser();

          setUser({
            id: session?.$id ?? "",
            email: session?.email ?? "",
            name: session?.name ?? "",
            phone: session?.phone ?? "",
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
      logout: async () => {
        try {
          await logoutUser();

          set({
            user: {
              id: "",
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
          const response = await registerUser({
            email: payload.email,
            name: payload.name,
            phone: payload.phone,
            password: payload.password,
          });

          if (!response.success) {
            throw new Error(response.message);
          }

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
