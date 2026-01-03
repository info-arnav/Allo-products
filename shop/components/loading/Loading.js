import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

export default function Loading() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 320],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.image}
      ></Image>
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loader,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6e6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    maxWidth: 200,
    height: "100%",
    resizeMode: "contain",
  },
  loaderContainer: {
    width: "100%",
    maxWidth: 200,
    height: 4,
    backgroundColor: "#e0d4b8",
    borderRadius: 2,
    overflow: "hidden",
  },
  loader: {
    width: 80,
    height: 4,
    backgroundColor: "#d4a574",
    borderRadius: 2,
  },
});
