"use client";

import { useRouter } from "next/navigation";
import { getFingerPrint } from "./getFingerprint";
import { logoutApi } from "@/services/fetch/client/auth";
import { AddEvent } from "../analytics/google";

export default function useLogout() {
  const old_fingerprint = getFingerPrint();
  const router = useRouter();

  return async function Logout() {
    AddEvent("user_logout", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
    try {
      let response = await fetch(...logoutApi(old_fingerprint));
      let data = await response.json();
      if (!data.error) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        router.push("/login", { replace: true });
        window.location.reload();
      } else {
        console.log("Error logging out");
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        router.push("/login", { replace: true });
        window.location.reload();
      }
      return data;
    } catch (err) {
      return { error: true, message: "Network or parsing error" };
    }
  };
}
