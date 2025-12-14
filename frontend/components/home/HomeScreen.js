import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useFetch from "../../functions/auth/useFetch";
import useLogout from "../../functions/auth/useLogout";
import { getUserInfoApi } from "../../services/useFetch/user";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const Fetch = useFetch();
  const logout = useLogout();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const response = await Fetch(...getUserInfoApi());
      setUserData(response);
    };
    getInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.userData}>
        {userData ? JSON.stringify(userData, null, 2) : "Loading..."}
      </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
