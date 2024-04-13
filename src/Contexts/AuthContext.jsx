import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [tk, setTk] = useState({});
  const token = sessionStorage.getItem("_tk");
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    if (decodedToken) {
      setLoggedIn(true);
      setTk(decodedToken);
    }
    if (isExpired) {
      setLoggedIn(false);
      setTk({});
    }
  }, [token]);

  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,
    tk,
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
