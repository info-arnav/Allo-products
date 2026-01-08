import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import AddressModal from "./AddressModal";
import { useDelivery } from "../../context/deliveryContext";
import { isLocationGranted } from "../../permissions/isLocationGranted";
import { getCurrentLocation } from "../../permissions/getCurrentLocation";
import { calculateDistance } from "../../functions/calculateDistance";
import useFetch from "../../functions/auth/useFetch";
import { getUserInfoApi } from "../../services/useFetch/user";

export default function Header() {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const Fetch = useFetch();

  const [loadingAddress, setLoadingAddress] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(null);

  const [userAddresses, setUserAddresses] = useState([]);

  const { address, setAddress } = useDelivery();

  const saveCurrentLocation = async () => {
    try {
      const hasPermission = await isLocationGranted();
      if (!hasPermission) {
        setCurrentAddress(false);
        return false;
      }
      const locationData = await getCurrentLocation();
      setCurrentAddress(locationData);
      return locationData;
    } catch (error) {
      return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAddresses = async () => {
        try {
          const response = await Fetch(...getUserInfoApi());

          if (response.data && response.data.addresses) {
            setUserAddresses(response.data.addresses);
          }
        } catch (error) {}
      };

      fetchAddresses();
    }, [])
  );

  useEffect(() => {
    const checkAndSetLocation = async () => {
      if (address && address.name) {
        setLoadingAddress(false);
        return;
      }

      try {
        const hasPermission = await isLocationGranted();

        if (!hasPermission) {
          setCurrentAddress(false);
        }

        if (hasPermission) {
          const locationData = currentAddress || (await saveCurrentLocation());

          let closestAddress = null;
          let minDistance = 1;

          const response = await Fetch(...getUserInfoApi());
          let tempUserAddresses = [];

          if (response.data && response.data.addresses) {
            tempUserAddresses = response.data.addresses;
          }

          if (!tempUserAddresses || tempUserAddresses.length === 0) {
            setAddress({
              id: 0,
              name: "Current Location",
              ...locationData,
            });
            setLoadingAddress(false);
            return;
          }

          tempUserAddresses.forEach((addr) => {
            if (addr.latitude && addr.longitude) {
              const distance = calculateDistance(
                locationData.latitude,
                locationData.longitude,
                addr.latitude,
                addr.longitude
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestAddress = addr;
              }
            }
          });

          if (closestAddress) {
            setAddress(closestAddress);
            setLoadingAddress(false);
            return;
          }

          setAddress({
            id: 0,
            name: "Current Location",
            ...locationData,
          });
        } else {
          setAddress({
            id: -1,
            name: "Saket",
            street: "Select Colony, Near Metro Station",
            city: "Delhi",
            pincode: "110017",
          });
        }
      } catch (error) {
        setAddress({
          id: -1,
          name: "Saket",
          street: "Select Colony, Near Metro Station",
          city: "Delhi",
          pincode: "110017",
        });
      }
      setLoadingAddress(false);
    };

    checkAndSetLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.addressButton}
            onPress={() => {
              if (!loadingAddress) {
                setShowDropdown(true);
              }
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="location" size={16} color="#fff" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressName} numberOfLines={1}>
                {loadingAddress
                  ? "Loading..."
                  : address?.name || "Select Address"}
              </Text>
              <Text style={styles.addressStreet} numberOfLines={1}>
                {loadingAddress
                  ? "Loading..."
                  : [address?.street, address?.city, address?.pincode]
                      .filter(Boolean)
                      .join(", ") || "Tap to choose location"}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#999" />
          </TouchableOpacity>
          <View style={styles.user}>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate("ProfileStack")}
              activeOpacity={0.7}
            >
              <Ionicons name="person-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AddressModal
        visible={showDropdown}
        onClose={() => setShowDropdown(false)}
        address={address}
        onSelectAddress={setAddress}
        navigation={navigation}
        currentAddress={currentAddress}
        saveCurrentLocation={saveCurrentLocation}
        userAddresses={userAddresses}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#201f26",
    zIndex: 10,
    elevation: 5,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
    gap: 50,
  },
  addressButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    flex: 1,
  },
  addressInfo: {
    flex: 1,
  },
  addressNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  typeIcon: {
    marginRight: 2,
  },
  addressName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  addressStreet: {
    color: "#999",
    fontSize: 12,
  },
  user: {
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  content: {
    width: "100%",
    gap: 12,
  },
});
