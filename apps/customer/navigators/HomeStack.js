import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/home/HomeScreen";
import { StyleSheet, View } from "react-native";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
