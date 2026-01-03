import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Svg, { Path } from "react-native-svg";

export default function MapComponent({
  mapRef,
  region,
  isFormExpanded,
  onRegionChangeComplete,
}) {
  return (
    <View
      style={styles.mapContainer}
      pointerEvents={isFormExpanded ? "none" : "auto"}
    >
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
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
          <Path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#fff" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
