"use client";

import { useRouter } from "next/navigation";
import { generateFingerPrint, getFingerPrint } from "../auth/getFingerprint";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { setCookie } from "../cookies/manageCookies";
import revoke from "./revoke";

export default function useFetch() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  return async function Fetch(link, body = {}, method = "POST") {
    const old_fingerprint = getFingerPrint();
    const base = process.env.NEXT_PUBLIC_PROXY_BASE;
    const headers = {
      "Content-Type": "application/json",
      "X-Device-Fingerprint": old_fingerprint,
      Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
    };

    try {
      let response = await fetch(`${base}${link}`, {
        method: method,
        headers,
        body: JSON.stringify(body),
      });

      let data = await response.json();

      if (!data.error) return data;

      if (data.error && data.message !== "Access Denied") return data;

      if (
        data.error &&
        (data.data?.error === true || data.data?.exists === false)
      ) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        router.push("/", { replace: true });
        window.location.reload();
        return data;
      }

      // Refresh token
      const [new_fingerprint, uuid] = generateFingerPrint();
      const refreshRes = await fetch(`${base}/v1/admin/auth/update-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Fingerprint": new_fingerprint,
          "X-Device-Fingerprint-Old": old_fingerprint,
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const newData = await refreshRes.json();

      if (newData.error) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        router.push("/", { replace: true });
        window.location.reload();
        return newData;
      }

      setCookie("UUID_V4", uuid);
      sessionStorage.setItem("tk", newData.data.access_token);
      delete newData.data.access_token;
      localStorage.setItem("uid", btoa(JSON.stringify(newData.data)));
      setUser(newData.data);
      revoke(old_fingerprint, newData.data.old_refresh_token);

      // Retry original request
      const retryRes = await fetch(`${base}${link}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-Device-Fingerprint": new_fingerprint,
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        },
        body: JSON.stringify(body),
      });

      return await retryRes.json();
    } catch (err) {
      return { error: true, message: "Network or parsing error" };
    }
  };
}
