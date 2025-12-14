import { useNavigation } from "@react-navigation/native";
import { useSession } from "../../context/sessionContext";
import useLogout from "./useLogout";
import { saveSession } from "./saveSession";

export default function useFetch() {
  const navigation = useNavigation();
  const {
    deviceId,
    setAccessToken,
    setRefreshToken,
    setLoggedIn,
    accessToken,
    refreshToken,
  } = useSession();
  const logout = useLogout();

  return async function Fetch(link, body = {}, method = "POST") {
    const base = process.env.EXPO_PUBLIC_API_URL;
    const headers = {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      Authorization: `Bearer ${accessToken}`,
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
        logout();
        navigation.navigate("Login");
        return data;
      }

      const refreshRes = await fetch(`${base}/auth/update-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Id": deviceId,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
        credentials: "include",
      });

      const newData = await refreshRes.json();

      if (newData.error) {
        logout();
        navigation.navigate("Login");
        return newData;
      }

      saveSession(newData.data.access_token, newData.data.refresh_token);
      setAccessToken(newData.data.access_token);
      setRefreshToken(newData.data.refresh_token);

      setLoggedIn(true);

      // Retry original request
      const retryRes = await fetch(`${base}${link}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-Device-Id": deviceId,
          Authorization: `Bearer ${newData.data.access_token}`,
        },
        body: JSON.stringify(body),
      });

      return await retryRes.json();
    } catch (err) {
      return { error: true, message: "Network or parsing error" };
    }
  };
}
