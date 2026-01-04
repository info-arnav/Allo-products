export const getUsageInfoApi = (period = null) => {
  return ["/api/get-usage-info", { period }];
};
