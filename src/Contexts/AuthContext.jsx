import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {

  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve login state from local storage (if available)
    const storedLoggedIn = sessionStorage.getItem("loggedIn");
    return storedLoggedIn === "true"; // Convert to boolean
});
  const token = sessionStorage.getItem("_tk");
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    if (decodedToken) {
      setLoggedIn(true);
    }
    if (isExpired) {
      setLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem("loggedIn", isLoggedIn);
}, [isLoggedIn]);

  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
