import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HomeStack from "./HomeStack";
import GlassTabBar from "./components/GlassTabBar";
import { DeliveryProvider } from "../context/deliveryContext";

const Tab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <View style={styles.root}>
      <DeliveryProvider>
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.12)", "rgba(0,0,0,0.3)"]}
          locations={[0, 0.6, 1]}
          style={styles.bottomGradient}
        />
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <GlassTabBar {...props} />}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ tabBarLabel: "Home" }}
          />
          <Tab.Screen
            name="CartTab"
            component={HomeStack}
            options={{ tabBarLabel: "Your Cart" }}
          />
          <Tab.Screen
            name="OrdersTab"
            component={HomeStack}
            options={{ tabBarLabel: "Order Again" }}
          />
        </Tab.Navigator>
      </DeliveryProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 260,
    zIndex: 1,
  },
});
