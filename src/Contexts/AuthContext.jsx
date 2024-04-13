import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
  user: "",
  SetUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Retrieve login state from session storage (if available)
    const storedLoggedIn = sessionStorage.getItem("loggedIn");
    return storedLoggedIn === "true";
  });
  const [user, SetUser] = useState(sessionStorage.getItem("user"));
  let token = sessionStorage.getItem("_tk");
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    token = sessionStorage.getItem("_tk");
    sessionStorage.setItem("loggedIn", isLoggedIn);
    sessionStorage.setItem("user", user);
    if (decodedToken) {
      setLoggedIn(true);
    }
    if (isExpired) {
      setLoggedIn(false);
    }
  }, [token,isLoggedIn]);

  // useEffect(() => {
  //   sessionStorage.setItem("loggedIn", isLoggedIn);
  //   sessionStorage.setItem("user", user);
  // }, [isLoggedIn]);

  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,
    user,
    SetUser,
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
