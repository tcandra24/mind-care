"use server";

import { createAppwriteClient } from "@/lib/appwrite";

interface UpdateProfile {
  name: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const update = async (formData: UpdateProfile) => {
  const { name } = formData;
  const { account } = createAppwriteClient();

  const result = await account.updateName(name);

  return result;
};

export const changePassword = async (formData: ChangePassword) => {
  const { oldPassword, newPassword } = formData;
  const { account } = createAppwriteClient();
  const result = await account.updatePassword(
    newPassword, // password
    oldPassword // oldPassword (optional)
  );

  return result;
};
