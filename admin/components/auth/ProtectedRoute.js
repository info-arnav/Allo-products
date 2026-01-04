"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user || !user.user_id) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [user, router]);

  if (!checked) return null;

  return children;
}
