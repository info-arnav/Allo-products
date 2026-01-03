import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddressDisplay({
  address,
  isFetchingAddress,
  onAddDetails,
  onGoToCurrentLocation,
  insets,
}) {
  return (
    <>
      <View style={styles.locationButtonContainer}>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={onGoToCurrentLocation}
        >
          <Text style={styles.currentLocationButtonText}>
            Go to my current location
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.addressTitle}>Delivering your order to</Text>
      <Text style={styles.addressName}>
        {address.name || address.street || ""}
      </Text>
      <Text style={styles.addressDetails}>
        {address.street ? address.street + ", " : ""}
        {address.city ? address.city + ", " : ""}
        {address.region ? address.region + ", " : ""}
        {address.postalCode ? address.postalCode : ""}
      </Text>

      <TouchableOpacity
        style={[
          styles.addDetailsButton,
          isFetchingAddress && styles.addDetailsButtonDisabled,
        ]}
        onPress={onAddDetails}
        disabled={isFetchingAddress}
      >
        <Text style={styles.addDetailsButtonText}>
          {isFetchingAddress ? "Fetching address..." : "Add address details"}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  locationButtonContainer: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: 44,
    zIndex: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginHorizontal: 20,
    display: "flex",
  },
  currentLocationButton: {
    backgroundColor: "#202023",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#46464e",
  },
  currentLocationButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  addressTitle: {
    color: "#999",
    fontSize: 14,
    marginBottom: 8,
  },
  addressName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  addressDetails: {
    color: "#999",
    fontSize: 14,
    marginBottom: 16,
  },
  addDetailsButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  addDetailsButtonDisabled: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  addDetailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
