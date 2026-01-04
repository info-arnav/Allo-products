"use client";

import { updateTokenApi } from "@/services/fetch/client/auth";
import { generateFingerPrint, getFingerPrint } from "../auth/getFingerprint";
import { setCookie } from "../cookies/manageCookies";
import revoke from "./revoke";

export default function useUpdate() {
  return async function Update() {
    const old_fingerprint = getFingerPrint();
    const [new_fingerprint, uuid] = generateFingerPrint();

    try {
      let response = await fetch(
        ...updateTokenApi(old_fingerprint, new_fingerprint)
      );

      let data = await response.json();

      if (data.error) {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("tk");
        window.location.reload();
      } else {
        setCookie("UUID_V4", uuid);
        revoke(old_fingerprint, data.data.old_refresh_token);
      }

      return data;
    } catch (err) {
      return { error: true, message: "Network or parsing error" };
    }
  };
}
