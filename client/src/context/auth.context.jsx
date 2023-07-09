/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/utils";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState();
  const [accessToken, setAccessToken] = useState(localStorage.accessToken);
  const [refreshToken, setRefreshToken] = useState(localStorage.refreshToken);
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : null);

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
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export default function useAuthContext() {
  return useContext(AuthContext);
}
