import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFB800" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17171d",
    alignItems: "center",
    justifyContent: "center",
  },
});
