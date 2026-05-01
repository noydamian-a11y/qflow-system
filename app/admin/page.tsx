"use client";

import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not logged in → send to login
      if (!user) {
        router.push("/login");
        return;
      }

      // Logged in but NOT admin → send away
      if (!isAdmin) {
        router.push("/display");
        return;
      }
    }
  }, [user, isAdmin, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Admin Panel</h1>
      <p>Welcome: {user?.email}</p>

      <div style={{ marginTop: 20 }}>
        <p>This is your admin control center.</p>
      </div>
    </div>
  );
}