export const requestOtpApi = (number) => {
  return [
    `${process.env.EXPO_PUBLIC_API_URL}/v1/user/auth/request-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        number,
      }),
    },
  ];
};

export const verifyOtpApi = (number, otp, deviceId) => {
  return [
    `${process.env.EXPO_PUBLIC_API_URL}/v1/user/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceId,
      },
      credentials: "include",
      body: JSON.stringify({
        number,
        otp,
      }),
    },
  ];
};
