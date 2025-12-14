import { useSession } from "../../context/sessionContext";
import { deleteSession } from "./deleteSession";

export default function useLogout() {
  const {
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setNumber,
    deviceId,
    refreshToken,
  } = useSession();

  return async function logout() {
    try {
      await fetch(`${base}/auth/revoke-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Id": deviceId,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });
    } catch (e) {}

    await deleteSession();

    setLoggedIn(false);
    setAccessToken("");
    setRefreshToken("");
    setNumber("");
  };
}
