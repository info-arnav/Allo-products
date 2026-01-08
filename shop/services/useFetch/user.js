export const getUserInfoApi = () => {
  return ["/v1/shop/api/user/get-user-info"];
};

export const addAddressApi = (address) => {
  return ["/v1/shop/api/user/save-address", { address }];
};
