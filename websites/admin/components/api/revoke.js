"use client";

import { revokeTokenApi } from "@/services/fetch/client/auth";

export default async function revoke(fingeprint, refresh_token) {
  try {
    let response = await fetch(...revokeTokenApi(fingeprint, refresh_token));

    let data = await response.json();

    return data;
  } catch (err) {
    return { error: true, message: "Network or parsing error" };
  }
}
