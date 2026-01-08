import { createContext, useContext, useState } from "react";

const DeliveryContext = createContext(null);

export const DeliveryProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  return (
    <DeliveryContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext);
