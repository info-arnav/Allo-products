import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import AddressScreen from "../components/address/AddressScreen";
const Stack = createNativeStackNavigator();

export default function AddressStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AddAddressScreen"
        component={AddressScreen}
        options={{
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
