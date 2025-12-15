import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/loading/Loading";
import { AuthProvider } from "./context/authContext";
import AppNav from "./navigators/AppNav";
import AuthNav from "./navigators/AuthNav";
import { useSession } from "./context/sessionContext";
import RootNavigator from "./navigators/RootNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { loggedIn, deviceId } = useSession();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {}, [loggedIn]);

  if (!fontsLoaded || loggedIn === null) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {loggedIn && deviceId ? (
          <RootNavigator />
        ) : (
          <AuthProvider>
            <AuthNav />
          </AuthProvider>
        )}
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
