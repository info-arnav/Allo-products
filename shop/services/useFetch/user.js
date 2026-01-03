export const getUserInfoApi = () => {
  return ["/v1/api/get-user-info"];
};

export const addAddressApi = (address) => {
  return ["/v1/api/save-address", { address }];
};
