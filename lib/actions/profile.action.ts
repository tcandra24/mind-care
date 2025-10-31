"use server";

import { createAppwriteClient } from "@/lib/appwrite";
import { cookies } from "next/headers";

interface UpdateProfile {
  name: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const update = async (formData: UpdateProfile) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

  const { name } = formData;
  const { account } = createAppwriteClient(session);

  const result = await account.updateName(name);

  return result;
};

export const changePassword = async (formData: ChangePassword) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-mind-care-session")?.value ?? "";

  const { oldPassword, newPassword } = formData;
  const { account } = createAppwriteClient(session);
  const result = await account.updatePassword(newPassword, oldPassword);

  return result;
};
