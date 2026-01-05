export const getUserInfoApi = () => {
  return ["/v1/user/api/get-user-info"];
};

export const addAddressApi = (address) => {
  return ["/v1/user/api/save-address", { address }];
};
