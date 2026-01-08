import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNav from "./AppNav";
import ProfileStack from "./ProfileStack";
import AddressStack from "./AddressStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppNav} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="AddressStack" component={AddressStack} />
    </Stack.Navigator>
  );
}
