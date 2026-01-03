import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import useFetch from "../../functions/auth/useFetch";
import { addAddressApi } from "../../services/useFetch/user";
import { useDelivery } from "../../context/deliveryContext";
import MapComponent from "./components/MapComponent";
import SearchBar from "./components/SearchBar";
import AddressForm from "./components/AddressForm";
import AddressDisplay from "./components/AddressDisplay";

export default function AddressScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const Fetch = useFetch();
  const { setAddress: setDeliveryAddress } = useDelivery();

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
  const [showValidationError, setShowValidationError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const houseNumberLabelAnim = useRef(new Animated.Value(0)).current;
  const floorLabelAnim = useRef(new Animated.Value(0)).current;
  const landmarkLabelAnim = useRef(new Animated.Value(0)).current;
  const houseNumberInputRef = useRef(null);

  const onSave = async () => {
    if (!houseNumber.trim()) {
      setShowValidationError(true);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const newAddress = {
        name: `${houseNumber}${floor ? ", Floor " + floor : ""}`,
        street: `${houseNumber}${floor ? ", Floor " + floor : ""}${
          landmark ? ", " + landmark : ""
        }${address.street ? ", " + address.street : ""}`,
        city: address.city || "",
        pincode: address.postalCode || "",
        latitude: region.latitude,
        longitude: region.longitude,
      };

      const response = await Fetch(...addAddressApi(newAddress));

      if (response && !response.error) {
        // Set the newly saved address as the active address
        setDeliveryAddress(newAddress);
        navigation.goBack();
      } else {
        setSaveError(
          response?.message || "Failed to save address. Please try again."
        );
      }
    } catch (error) {
      setSaveError("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const goToCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
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

  const handleRegionChange = (r) => {
    setRegion(r);
    if (geocodeTimeout.current) clearTimeout(geocodeTimeout.current);
    geocodeTimeout.current = setTimeout(() => {
      fetchAddressFromCoord(r.latitude, r.longitude);
    }, 700);
  };

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

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          showResults={showResults}
          searchResults={searchResults}
          onSelectResult={selectSearchResult}
          onFocus={() => setShowResults(true)}
          topOffset={insets.top + 75}
        />

        <View style={styles.innerContainer}>
          <MapComponent
            mapRef={mapRef}
            region={region}
            isFormExpanded={isFormExpanded}
            onRegionChangeComplete={handleRegionChange}
          />
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
            {!isFormExpanded ? (
              <AddressDisplay
                address={address}
                isFetchingAddress={isFetchingAddress}
                onAddDetails={() => setIsFormExpanded(true)}
                onGoToCurrentLocation={goToCurrentLocation}
                insets={insets}
              />
            ) : (
              <AddressForm
                address={address}
                houseNumber={houseNumber}
                setHouseNumber={(value) => {
                  setHouseNumber(value);
                  if (showValidationError && value.trim()) {
                    setShowValidationError(false);
                  }
                }}
                floor={floor}
                setFloor={setFloor}
                landmark={landmark}
                setLandmark={setLandmark}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                houseNumberLabelAnim={houseNumberLabelAnim}
                floorLabelAnim={floorLabelAnim}
                landmarkLabelAnim={landmarkLabelAnim}
                houseNumberInputRef={houseNumberInputRef}
                showValidationError={showValidationError}
                isSaving={isSaving}
                saveError={saveError}
                onSave={onSave}
                onChangeAddress={() => setIsFormExpanded(false)}
              />
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
});
