"use client";
import { account } from "@/lib/appwrite";

const LogoutButton = () => {
  const logout = async () => {
    const result = await account.deleteSession("current");
    console.log(result);
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
