import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <AuthContext.Provider value={{ phone, setPhone, otp, setOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
