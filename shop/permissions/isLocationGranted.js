import * as Location from "expo-location";

export async function isLocationGranted() {
  const { status } = await Location.getForegroundPermissionsAsync();

  if (status === "granted") {
    return true;
  }

  const { status: newStatus } =
    await Location.requestForegroundPermissionsAsync();

  return newStatus === "granted";
}
