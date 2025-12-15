import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "../../context/sessionContext";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function ProdileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { phone } = useSession();

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={24}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#17171d" }}
    >
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.top, paddingTop: insets.top + 5 }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "auto" }}
              >
                <Path
                  d="M15 18L9 12L15 6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>
        <View style={styles.innerContainer}>
          {/* <Text style={styles.subTitle}>Your Account</Text>
          <View style={styles.phoneContainer}>
            <Ionicons name="call" size={18} color="#999" />
            <Text style={styles.phone}>{phone}</Text>
          </View> */}
          <LoadingSpinner></LoadingSpinner>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17171d",
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  top: {
    backgroundColor: "#202023",
    width: "100%",
    borderBottomColor: "#46464e",
    borderBottomWidth: 1,
  },
  header: {
    width: "100%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  back: {
    borderRadius: 100,
    width: 40,
    height: 40,
    backgroundColor: "#313139",
    position: "absolute",
    left: 20,
    top: 0,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  innerContainer: {
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
  },
  subTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  phone: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
