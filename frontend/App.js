import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/loading/Loading";
import { AuthProvider } from "./context/authContext";
import AppNav from "./navigators/AppNav";
import AuthNav from "./navigators/AuthNav";
import { useSession } from "./context/sessionContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { loggedIn, deviceId } = useSession();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
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
          <AppNav />
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
