import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

export default function GlassTabBar({ state, descriptors, navigation }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabCount = state.routes.length;
  const tabWidth = containerWidth / tabCount;

  useEffect(() => {
    if (!containerWidth) return;

    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      damping: 18,
      stiffness: 160,
      mass: 0.6,
    }).start();
  }, [state.index, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <BlurView intensity={55} tint="dark" style={styles.blur} />

      {containerWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activePill,
            {
              width: tabWidth - 12,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        let icon = "home-outline";
        if (route.name === "OrdersTab") icon = "receipt-outline";
        if (route.name === "CartTab") icon = "cart-outline";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.tab, { width: tabWidth }]}
          >
            <Ionicons
              name={icon}
              size={22}
              color={isFocused ? "#FFD166" : "rgba(255,255,255,0.6)"}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? "#FFD166" : "rgba(255,255,255,0.6)" },
              ]}
            >
              {descriptors[route.key].options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 20, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    zIndex: 10,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  activePill: {
    position: "absolute",
    top: 4,
    bottom: 4,
    marginHorizontal: 4,
    borderRadius: 24,
    backgroundColor: "rgba(255, 215, 102, 0.22)",
  },
  tab: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    zIndex: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
});
