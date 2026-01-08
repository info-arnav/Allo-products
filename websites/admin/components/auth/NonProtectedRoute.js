"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function NonProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user?.user_id) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (user?.user_id) return null;

  return children;
}
