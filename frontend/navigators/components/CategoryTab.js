import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryTab({ cat, isActive, onPress }) {
  const iconName = isActive ? cat.icon.replace("-outline", "") : cat.icon;

  return (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={iconName} size={24} color={isActive ? "#fff" : "#999"} />
      <Text
        style={[styles.categoryText, isActive && styles.categoryTextActive]}
      >
        {cat.name}
      </Text>
      {isActive && <View style={styles.activeUnderline} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingBottom: 8,
    position: "relative",
  },
  categoryText: {
    color: "#999",
    fontSize: 11,
    fontWeight: "800",
  },
  categoryTextActive: {
    color: "white",
  },
  activeUnderline: {
    position: "absolute",
    bottom: 0,
    left: -4,
    right: -4,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
