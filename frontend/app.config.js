export default {
  expo: {
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_MAP_API,
        },
      },
    },
    ios: {
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAP_API,
      },
    },
  },
};
