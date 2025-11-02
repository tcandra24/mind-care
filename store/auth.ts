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
  user: User;
  setUser: (session: { id: string; email: string; name: string; phone: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  register: (payload: { email: string; name: string; phone: string; password: string }) => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      loading: false,
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
        set({ loading: true });

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

          return {
            success: true,
            message: "Login Successfull",
          };
        } catch (error: any) {
          set({
            loading: false,
          });

          return {
            success: false,
            message: error.message,
          };
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
            loading: false,
          });
        }
      },
      register: async (payload) => {
        set({ loading: true });
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

          return {
            success: true,
            message: "Register Successfull",
          };
        } catch (error: any) {
          set({
            loading: false,
          });

          return {
            success: false,
            message: error.message,
          };
        }
      },
    }),
    {
      name: "mind_care_auth_session",
    }
  )
);
