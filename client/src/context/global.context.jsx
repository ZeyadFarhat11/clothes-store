/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/utils";
import jwtDecode from "jwt-decode";

const Context = createContext();

export function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(localStorage.accessToken);
  const [refreshToken, setRefreshToken] = useState(localStorage.refreshToken);
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : null);
  const [cartIsActive, setCartIsActive] = useState(false);

  // console.log({
  //   accessDecode: jwtDecode(accessToken),
  //   refreshDecode: jwtDecode(refreshToken),
  // });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const updateTokens = async () => {
    try {
      const response = await api.post("/refresh", { refresh: refreshToken });
      const { access, refresh } = response.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (err) {
      alert("Update tokens fails");
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      if (refreshToken && Date.now() > Date.now()) {
        updateTokens();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const contextData = {
    loading,
    setLoading,
    user,
    setUser,
    logout,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    cartIsActive,
    setCartIsActive,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
}

export default function useGlobalContext() {
  return useContext(Context);
}
