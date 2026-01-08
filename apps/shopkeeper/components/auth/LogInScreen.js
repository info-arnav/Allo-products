import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/authContext";
import { requestOtpApi } from "../../services/fetch/otp";

export default function LogInScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { phone, setPhone } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(...requestOtpApi(phone));
      const res = await response.json();

      if (!response.ok || res.error) {
        throw new Error(res.message || "Failed to send OTP");
      }

      navigation.navigate("OTP");
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={24}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fdf6e6" }}
    >
      <View style={{ ...styles.container, paddingTop: insets.top + 10 }}>
        <Image
          style={styles.image}
          source={require("../../assets/login-banner.png")}
        ></Image>
        <Text style={styles.title}>Your Online Local Marketplace</Text>
        <Text style={styles.subTitle}>Login or Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "");
              setPhone(cleaned);
            }}
            value={phone}
            placeholder="Enter your number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            importantForAutofill="yes"
          />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={requestOtp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
        <View style={styles.partitionLine}></View>
        <Text style={styles.smallText}>
          By continuing, you agree to our{" "}
          <Text style={styles.underlineText}>Terms of Service</Text> and{" "}
          <Text style={styles.underlineText}>Privacy Policy</Text>.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6e6",
    alignItems: "center",
    padding: 20,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#727272ff",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#d4a574",
    borderRadius: 12,
    width: "100%",
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prefix: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
    color: "#333",
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    color: "#333",
  },
  button: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.7,
  },
  errorContainer: {
    width: "100%",
    backgroundColor: "#fee",
    borderWidth: 1,
    borderColor: "#fcc",
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
  },
  errorText: {
    color: "#c00",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  partitionLine: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(225, 225, 225, 1)",
    marginTop: 30,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});
