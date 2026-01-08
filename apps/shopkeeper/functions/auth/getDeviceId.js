import "react-native-get-random-values";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { v4 as uuidv4, validate as isUuid } from "uuid";

export default async function getDeviceId() {
  let id = await getItemAsync("device_id");
  if (!id || !isUuid(id)) {
    id = uuidv4();
    await setItemAsync("device_id", id);
  }
  return id;
}
