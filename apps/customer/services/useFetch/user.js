export const getUserInfoApi = () => {
  return ["/v1/user/api/user/get-user-info"];
};

export const addAddressApi = (address) => {
  return ["/v1/user/api/user/save-address", { address }];
};
