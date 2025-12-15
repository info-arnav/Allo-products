import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useFetch from "../../functions/auth/useFetch";
import useLogout from "../../functions/auth/useLogout";
import { getUserInfoApi } from "../../services/useFetch/user";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNavBar from "../../navigators/components/TopNavBar";
import Header from "../../navigators/components/Header";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const Fetch = useFetch();
  const logout = useLogout();
  const [userData, setUserData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getInfo = async () => {
      const response = await Fetch(...getUserInfoApi());
      setUserData(response);
    };
    getInfo();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#201f26",
        paddingTop: insets.top,
      }}
    >
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        extraScrollHeight={24}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#17171d",
        }}
        stickyHeaderIndices={[1]}
      >
        <Header></Header>
        <TopNavBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
        />
        {searchQuery && (
          <View>
            <Text style={styles.userData}>
              {userData ? JSON.stringify(userData, null, 2) : "Loading..."}
            </Text>
          </View>
        )}
        {!searchQuery && (
          <View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
              <Text style={styles.userData}>
                {userData ? JSON.stringify(userData, null, 2) : "Loading..."}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17171d",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  userData: {
    color: "white",
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#328616",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
