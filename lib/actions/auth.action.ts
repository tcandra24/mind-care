"use server";

import { createAppwriteClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

interface CreateUser {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const registerUser = async (formData: CreateUser) => {
  try {
    const { email, name, password } = formData;

    const { account } = createAppwriteClient();
    const user = await account.create({
      userId: ID.unique(),
      email,
      name,
      password,
    });

    return user;
  } catch (error: any) {
    return error.message;
  }
};

export const loginUser = async (formData: LoginUser) => {
  try {
    const { email, password } = formData;

    const { account } = createAppwriteClient();
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("appwrite-mind-care-session", session.secret, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });

    return session;
  } catch (error: any) {
    return error.message;
  }
};

export const logoutUser = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

    const { account } = createAppwriteClient(session);
    await account.deleteSession("current");

    cookieStore.set("appwrite-mind-care-session", "", {
      maxAge: 0,
      path: "/",
    });
  } catch (error: any) {
    return error.message;
  }
};

export const getUser = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

    if (!session) {
      console.log("No session cookie found");
      return null;
    }

    const { account } = createAppwriteClient(session);
    const user = await account.get();

    return user;
  } catch (error: any) {
    return error.message;
  }
};
