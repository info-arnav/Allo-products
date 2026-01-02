import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function AddressScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef(null);
  const [address, setAddress] = useState(null);
  const geocodeTimeout = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [landmark, setLandmark] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  const houseNumberLabelAnim = useRef(new Animated.Value(0)).current;
  const floorLabelAnim = useRef(new Animated.Value(0)).current;
  const landmarkLabelAnim = useRef(new Animated.Value(0)).current;
  const houseNumberInputRef = useRef(null);

  const fetchAddressFromCoord = async (latitude, longitude) => {
    try {
      setIsFetchingAddress(true);
      const results = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (results && results.length > 0) {
        setAddress(results[0]);
      }
    } catch (e) {
      setAddress(null);
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }
    try {
      const apiKey = process.env.EXPO_PUBLIC_MAP_API;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.predictions) {
        setSearchResults(data.predictions.slice(0, 5));
        setShowResults(true);
      }
    } catch (e) {
      setSearchResults([]);
    }
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      searchLocation(text);
    }, 500);
  };

  const selectSearchResult = async (result) => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_MAP_API;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.result && data.result.geometry) {
        const { lat, lng } = data.result.geometry.location;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        };
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
        fetchAddressFromCoord(lat, lng);
      }
    } catch (e) {}
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        const loc = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000,
        });
        const r = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        };
        setRegion(r);
        if (mapRef.current) {
          mapRef.current.animateToRegion(r, 1000);
        }
        fetchAddressFromCoord(r.latitude, r.longitude);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    Animated.timing(houseNumberLabelAnim, {
      toValue: focusedInput === "houseNumber" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusedInput]);

  useEffect(() => {
    Animated.timing(floorLabelAnim, {
      toValue: focusedInput === "floor" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusedInput]);

  useEffect(() => {
    Animated.timing(landmarkLabelAnim, {
      toValue: focusedInput === "landmark" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusedInput]);

  useEffect(() => {
    if (isFormExpanded && houseNumberInputRef.current) {
      setTimeout(() => {
        houseNumberInputRef.current?.focus();
      }, 100);
    }
  }, [isFormExpanded]);

  return (
    <View style={{ flex: 1, backgroundColor: "#17171d" }}>
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
            <Text style={styles.title}>Select Delivery Location</Text>
          </View>
        </View>
        <View style={{ ...styles.searchContainer, top: insets.top + 75 }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
            onFocus={() => setShowResults(true)}
          />
          {showResults && searchResults.length > 0 && (
            <View style={styles.searchResults}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => selectSearchResult(result)}
                >
                  <Text style={styles.searchResultText}>
                    {result.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.innerContainer}>
          <View
            style={styles.mapContainer}
            pointerEvents={isFormExpanded ? "none" : "auto"}
          >
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={region}
              onRegionChangeComplete={(r) => {
                if (geocodeTimeout.current)
                  clearTimeout(geocodeTimeout.current);
                geocodeTimeout.current = setTimeout(() => {
                  fetchAddressFromCoord(r.latitude, r.longitude);
                }, 700);
              }}
              showsUserLocation={true}
              showsMyLocationButton={false}
              zoomEnabled={!isFormExpanded}
              zoomControlEnabled={!isFormExpanded}
              showsIndoorLevelPicker={false}
              scrollEnabled={!isFormExpanded}
            />
            <View pointerEvents="none" style={styles.markContainer}>
              <Svg width={44} height={44} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="#ff5252"
                />
                <Path
                  d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  fill="#fff"
                />
              </Svg>
            </View>
          </View>
        </View>

        {address && (
          <View
            style={{
              ...styles.bottomCard,
              ...(isFormExpanded
                ? {
                    top: insets.top + 75,
                    bottom: 0,
                    zIndex: 2000,
                    paddingBottom: 24,
                  }
                : { bottom: 0, paddingBottom: insets.bottom + 24 }),
            }}
          >
            {!isFormExpanded && (
              <View style={styles.locationButtonContainer}>
                <TouchableOpacity
                  style={styles.currentLocationButton}
                  onPress={async () => {
                    try {
                      const { status } =
                        await Location.requestForegroundPermissionsAsync();
                      if (status !== "granted") return;
                      const loc = await Location.getCurrentPositionAsync({
                        enableHighAccuracy: true,
                        maximumAge: 10000,
                        timeout: 10000,
                      });
                      const r = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.0015,
                        longitudeDelta: 0.0015,
                      };
                      setRegion(r);
                      if (mapRef.current) {
                        mapRef.current.animateToRegion(r, 1000);
                      }
                      fetchAddressFromCoord(r.latitude, r.longitude);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  <Text style={styles.currentLocationButtonText}>
                    Go to my current location
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {!isFormExpanded ? (
              <>
                <Text style={styles.addressTitle}>
                  Delivering your order to
                </Text>
                <Text style={styles.addressName}>
                  {address.name || address.street || ""}
                </Text>
                <Text style={styles.addressDetails}>
                  {address.street ? address.street + ", " : ""}
                  {address.city ? address.city + ", " : ""}
                  {address.region ? address.region + ", " : ""}
                  {address.postalCode ? address.postalCode : ""}
                </Text>
              </>
            ) : (
              <View style={styles.expandedHeader}>
                <Text style={styles.expandedTitle}>
                  Add more address details
                </Text>
              </View>
            )}

            {!isFormExpanded ? (
              <TouchableOpacity
                style={[
                  styles.addDetailsButton,
                  isFetchingAddress && styles.addDetailsButtonDisabled,
                ]}
                onPress={() => setIsFormExpanded(true)}
                disabled={isFetchingAddress}
              >
                <Text style={styles.addDetailsButtonText}>
                  {isFetchingAddress
                    ? "Fetching address..."
                    : "Add address details"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.formContainer}>
                <ScrollView
                  style={styles.formScrollView}
                  contentContainerStyle={styles.formContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  automaticallyAdjustKeyboardInsets={true}
                >
                  <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                      <Animated.Text
                        style={[
                          styles.inputLabel,
                          {
                            opacity: houseNumberLabelAnim,
                            transform: [
                              {
                                translateY: houseNumberLabelAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [10, 0],
                                }),
                              },
                            ],
                          },
                        ]}
                      >
                        Flat / House no / Building name *
                      </Animated.Text>
                      <TextInput
                        ref={houseNumberInputRef}
                        style={styles.inputLarge}
                        placeholder="Flat / House no / Building name *"
                        placeholderTextColor="#666"
                        value={houseNumber}
                        onChangeText={setHouseNumber}
                        onFocus={() => setFocusedInput("houseNumber")}
                        onBlur={() => setFocusedInput(null)}
                        multiline
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                      <Animated.Text
                        style={[
                          styles.inputLabel,
                          {
                            opacity: floorLabelAnim,
                            transform: [
                              {
                                translateY: floorLabelAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [10, 0],
                                }),
                              },
                            ],
                          },
                        ]}
                      >
                        Floor (optional)
                      </Animated.Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Floor (optional)"
                        placeholderTextColor="#666"
                        value={floor}
                        onChangeText={setFloor}
                        onFocus={() => setFocusedInput("floor")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                      <View style={styles.addressBoxContainer}>
                        <View style={styles.addressBox}>
                          <Text style={styles.addressBoxText}>
                            {address.street ? address.street + ", " : ""}
                            {address.city ? address.city + ", " : ""}
                            {address.region ? address.region + ", " : ""}
                            {address.postalCode ? address.postalCode : ""}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setIsFormExpanded(false)}
                          >
                            <Text style={styles.changeButton}>Change</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                      <Animated.Text
                        style={[
                          styles.inputLabel,
                          {
                            opacity: landmarkLabelAnim,
                            transform: [
                              {
                                translateY: landmarkLabelAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [10, 0],
                                }),
                              },
                            ],
                          },
                        ]}
                      >
                        Nearby landmark (optional)
                      </Animated.Text>
                      <TextInput
                        style={styles.inputLarge}
                        placeholder="Nearby landmark (optional)"
                        placeholderTextColor="#666"
                        value={landmark}
                        onChangeText={setLandmark}
                        onFocus={() => setFocusedInput("landmark")}
                        onBlur={() => setFocusedInput(null)}
                        multiline
                      />
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.saveButtonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => setIsFormExpanded(false)}
                  >
                    <Text style={styles.saveButtonText}>Save Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17171d",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 10,
    height: 44,
    width: 44,
    marginLeft: -22,
    marginTop: -44,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    backgroundColor: "#202023b7",
    width: "100%",
    borderBottomColor: "#46464e",
    borderBottomWidth: 1,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  searchContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: "#202023b7",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchResults: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchResultText: {
    color: "#333",
    fontSize: 14,
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
  bottomCard: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#202023",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopWidth: 1,
    borderColor: "#46464e",
    zIndex: 50,
  },
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
  expandedHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: 24,
  },
  expandedTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
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
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  formScrollView: {
    flex: 1,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#46464e",
  },
  formTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  formContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#202023",
    paddingHorizontal: 6,
    color: "#fff",
    fontSize: 12,
    zIndex: 1,
  },
  inputLabelStatic: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#202023",
    paddingHorizontal: 6,
    color: "#fff",
    fontSize: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    minHeight: 50,
  },
  inputLarge: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  addressBoxContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  addressBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    minHeight: 50,
  },
  addressBoxText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  changeButton: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#46464e",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
