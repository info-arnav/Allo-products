export const getUserInfoApi = () => {
  return ["/api/get-user-info"];
};

export const getUserDpApi = () => {
  return ["/api/get-user-dp"];
};

export const updateUserInfoApi = (firstName, lastName, imageId) => {
  return [
    "/api/update-user-info",
    {
      first_name: firstName,
      last_name: lastName,
      image: imageId,
    },
  ];
};

export const sendUserVerificationApi = () => {
  return ["/auth/send-verification"];
};
