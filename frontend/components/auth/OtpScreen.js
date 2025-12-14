import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useAuth } from "../../context/authContext";
import { requestOtpApi, verifyOtpApi } from "../../services/fetch/otp";
import { useSession } from "../../context/sessionContext";
import { saveSession } from "../../functions/auth/saveSession";

export default function OtpScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { phone, otp, setOtp } = useAuth();
  const { deviceId, setNumber, setAccessToken, setRefreshToken, setLoggedIn } =
    useSession();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

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

  const verifyOtp = async (otpToVerify) => {
    try {
      setVerifying(true);
      setError(null);

      const response = await fetch(
        ...verifyOtpApi(phone, otpToVerify, deviceId)
      );
      const res = await response.json();

      if (!response.ok || res.error) {
        throw new Error(res.message || "Could not verify OTP");
      }

      saveSession(res.data.access_token, res.data.refresh_token);
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
      setNumber(phone);
      setLoggedIn(true);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setVerifying(false);
    }
  };

  const inputRef = useRef(null);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={24}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#17171d" }}
    >
      <View style={{ ...styles.container, paddingTop: insets.top + 10 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              setOtp("");
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
        </View>
        <View style={styles.paddedScreen}>
          <Text style={styles.text}>We have sent a code to:</Text>
          <Text style={styles.phoneNumber}>+91 {phone}</Text>
          <Pressable
            onPress={() => inputRef.current?.focus()}
            style={styles.otpInputContainer}
          >
            <View style={styles.otpBoxes}>
              {Array.from({ length: 4 }).map((_, i) => (
                <View key={i} style={styles.otpBox}>
                  <Text style={styles.otpBoxText}>{otp[i] || ""}</Text>
                </View>
              ))}
            </View>
            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 4);
                setOtp(cleaned);
                if (cleaned.length === 4) {
                  verifyOtp(cleaned);
                }
              }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoFocus
              style={styles.hiddenInput}
            />
          </Pressable>
        </View>{" "}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <Pressable
          onPress={() => {
            requestOtp();
          }}
          disabled={loading || verifying}
        >
          {loading ? (
            <Text style={styles.resendOtp}>Sending...</Text>
          ) : verifying ? (
            <Text style={styles.resendOtp}>verifying...</Text>
          ) : (
            <Text style={styles.resendOtp}>Resend OTP</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17171d",
    alignItems: "center",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    height: 60,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  back: {
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor: "#313139",
  },
  otpBoxes: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    maxWidth: 250,
  },
  otpBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    aspectRatio: 1,
    width: "25%",
  },
  otpBoxText: {
    color: "white",
    fontSize: 24,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  otpInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 0,
  },
  paddedScreen: {
    width: "100%",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    maxWidth: 250,
  },
  phoneNumber: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  resendOtp: {
    color: "#328616",
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#328616",
    paddingBottom: 2,
  },
  errorContainer: {
    width: "100%",
    backgroundColor: "#fee",
    borderWidth: 1,
    borderColor: "#fcc",
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  errorText: {
    color: "#c00",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
