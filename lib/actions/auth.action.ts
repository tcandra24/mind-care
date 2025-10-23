"use server";

import { createAppwriteClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const registerUser = async (formData: CreateUser) => {
  const { email, name, password } = formData;

  const { account } = createAppwriteClient();
  const user = await account.create({
    userId: ID.unique(),
    email,
    name,
    password,
  });

  console.log("Register : ", user);

  return user;
};

export const loginUser = async (formData: LoginUser) => {
  const { email, password } = formData;

  const { account } = createAppwriteClient();
  const session = await account.createEmailPasswordSession({
    email,
    password,
  });
  console.log("Login : ", session);

  const cookieStore = await cookies();
  cookieStore.set("appwrite-mind-care-session", session.secret, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  return true;
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

  const { account } = createAppwriteClient(session);
  await account.deleteSession("current");

  cookieStore.set("appwrite-mind-care-session", "", {
    maxAge: 0,
    path: "/",
  });
};

export const getUser = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

  if (!session) {
    console.log("No session cookie found");
    return null;
  }

  const { account } = createAppwriteClient(session);
  const user = await account.get();

  return user;
};
