import * as Location from "expo-location";

export async function getCurrentLocation() {
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  try {
    const [geocode] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const streetParts = [];
    if (geocode.name) streetParts.push(geocode.name);
    if (geocode.street) streetParts.push(geocode.street);
    if (geocode.subregion) streetParts.push(geocode.subregion);
    if (geocode.district && geocode.district !== geocode.subregion) {
      streetParts.push(geocode.district);
    }

    return {
      latitude,
      longitude,
      street: streetParts.join(", ") || "Address unavailable",
      city: geocode.city || geocode.region || "",
      pincode: geocode.postalCode || "",
    };
  } catch (error) {
    return {
      latitude,
      longitude,
      street: "Address unavailable",
      city: "",
      pincode: "",
    };
  }
}
