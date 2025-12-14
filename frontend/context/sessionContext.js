import { createContext, useContext, useEffect, useState } from "react";
import getDeviceId from "../functions/auth/getDeviceId";
import getSession from "../functions/auth/getSession";

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [number, setNumber] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    getDeviceId().then((id) => {
      setDeviceId(id);
    });
  }, []);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          setAccessToken(session.access_token);
          setRefreshToken(session.refresh_token);
        }
        setLoggedIn(!!session);
      })
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <SessionContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        number,
        setNumber,
        deviceId,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
