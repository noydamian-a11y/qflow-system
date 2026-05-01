"use client";

import { useState } from "react";
import { logIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await logIn(email, password);
      router.push("/display");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
      router.push("/display");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center">QFlow Login</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}