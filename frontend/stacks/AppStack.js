import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingBottom: 0,
        },
      }}
    >
      <Stack.Screen name="Home" component={() => <Text>Hi</Text>} />
    </Stack.Navigator>
  );
}
