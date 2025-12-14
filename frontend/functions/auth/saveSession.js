import * as SecureStore from "expo-secure-store";

export async function saveSession(accessToken, refreshToken) {
  if (!accessToken || !refreshToken) {
    throw new Error("Invalid tokens");
  }

  await SecureStore.setItemAsync("access_token", accessToken);

  await SecureStore.setItemAsync("refresh_token", refreshToken, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}
