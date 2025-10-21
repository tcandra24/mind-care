"use client";

import { account } from "@/lib/appwrite";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const user = await account.createEmailPasswordSession({
        email,
        password,
      });

      console.log(user);
      setId(user.$id);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const result = await account.deleteSession("current");
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Login;
