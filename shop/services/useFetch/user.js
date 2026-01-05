export const getUserInfoApi = () => {
  return ["/v1/shop/api/get-user-info"];
};

export const addAddressApi = (address) => {
  return ["/v1/shop/api/save-address", { address }];
};
