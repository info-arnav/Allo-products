import * as SecureStore from "expo-secure-store";

export async function deleteSession() {
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync("refresh_token");
}
