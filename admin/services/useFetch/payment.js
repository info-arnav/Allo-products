export const createPaymentIntentApi = (amount) => {
  return ["/payments/create-intent", { amount }];
};

export const startPaymentApi = (paymentIntent) => {
  return ["/payments/start-payment", { paymentIntent }];
};

export const findTransactionApi = (paymentIntent = null) => {
  return ["/payments/find-transactions", { paymentIntent }];
};

export const completePaymentApi = (paymentIntent) => {
  return ["/payments/complete-payment", { paymentIntent }];
};
