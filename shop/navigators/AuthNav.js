import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../components/auth/LogInScreen";
import OtpScreen from "../components/auth/OtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingBottom: 0,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LogInScreen}
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}
