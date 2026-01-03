import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import { calculateDistance } from "../../functions/calculateDistance";

export default function AddressModal({
  visible,
  onClose,
  address,
  onSelectAddress,
  navigation,
  currentAddress,
  saveCurrentLocation,
  userAddresses,
}) {
  const slideAnim = useRef(new Animated.Value(600)).current;

  const handleCurrentLocation = async () => {
    if (currentAddress) {
      onSelectAddress({
        id: 0,
        name: "Current Location",
        ...currentAddress,
      });
      onClose();
      return;
    }
    const locationData = await saveCurrentLocation();
    if (locationData) {
      onSelectAddress({
        id: 0,
        name: "Current Location",
        ...locationData,
      });
    }
    onClose();
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.dropdown,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.handleContainer}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <View style={styles.dropdownHandle} />
          </TouchableOpacity>

          <Text style={styles.title}>Select Delivery Location</Text>

          <View style={styles.searchContainer}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.searchIcon}
            >
              <Path
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for area, street name..."
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={handleCurrentLocation}
            disabled={currentAddress == null || currentAddress === false}
          >
            <View style={styles.currentLocationIcon}>
              <Ionicons name="locate" size={20} color="#328616" />
            </View>
            <View style={styles.currentLocationText}>
              <Text style={styles.currentLocationTitle}>
                Use your current location
              </Text>
              <Text style={styles.currentLocationSubtitle}>
                {currentAddress == null
                  ? "Detecting..."
                  : currentAddress === false
                  ? "Permission denied"
                  : currentAddress.street}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={() => {
              onClose();
              navigation.navigate("AddressStack");
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="#328616" />
            <Text style={styles.addAddressText}>Add new address</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <Text style={styles.savedAddressesTitle}>Your saved addresses</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {userAddresses.length === 0 && (
              <Text style={styles.noAddressesText}>
                No saved addresses found.
              </Text>
            )}
            {userAddresses.map((addr, index) => {
              let distance = null;
              if (
                currentAddress &&
                currentAddress.latitude &&
                currentAddress.longitude &&
                addr.latitude &&
                addr.longitude
              ) {
                distance = calculateDistance(
                  parseFloat(currentAddress.latitude),
                  parseFloat(currentAddress.longitude),
                  parseFloat(addr.latitude),
                  parseFloat(addr.longitude)
                );
              }

              return (
                <TouchableOpacity
                  key={addr.id || `${addr.latitude}-${addr.longitude}-${index}`}
                  style={styles.addressCard}
                  onPress={() => {
                    onSelectAddress(addr);
                    onClose();
                  }}
                >
                  <View style={styles.addressHeader}>
                    <Text style={styles.addressName} numberOfLines={1}>
                      {addr.name}
                    </Text>
                    {distance !== null && (
                      <Text style={styles.distanceText}>
                        {distance < 0.1
                          ? `${Math.round(distance * 1000)} m`
                          : `${distance.toFixed(1)} km`}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.addressDetails} numberOfLines={2}>
                    {addr.street}, {addr.city}, {addr.pincode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  backdrop: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },
  handleContainer: {
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  dropdownHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#444",
    borderRadius: 2,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    marginBottom: 12,
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(50, 134, 22, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  currentLocationText: {
    flex: 1,
  },
  currentLocationTitle: {
    color: "#328616",
    fontSize: 15,
    fontWeight: "600",
  },
  currentLocationSubtitle: {
    color: "#999",
    fontSize: 13,
    marginTop: 2,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    marginBottom: 20,
  },
  addAddressText: {
    color: "#328616",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  savedAddressesTitle: {
    color: "#999",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  addressName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    flex: 1,
  },
  distanceText: {
    color: "#999",
    fontSize: 12,
    fontWeight: "500",
  },
  addressDetails: {
    color: "#999",
    fontSize: 13,
    lineHeight: 18,
  },
  noAddressesText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
  },
});
