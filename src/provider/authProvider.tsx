import { ReactNode } from "react";
import axios from "axios";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<{
  token?: string | null;
  setToken: (newToken: string | null) => void;
}>({
  token: null,
  setToken: () => {},
});

const AuthProvider = (props: { children: ReactNode }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo<{
    token?: string | null;
    setToken: (newToken: string | null) => void;
  }>(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
